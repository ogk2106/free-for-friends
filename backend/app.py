from flask import Flask, jsonify, request
from flask_cors import CORS
from crawlbase import CrawlingAPI
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)  

crawling_api = CrawlingAPI({'token': 'RlVrqqjNg4yFnypxiZ9J0Q'})

#this is the flask route to scrape the events to do from the nyc groupon page
@app.route('/api/scrape', methods=['GET'])
def scrape_groupon():
    base_url = request.args.get('url', 'https://www.groupon.com/local/new-york-city/things-to-do')
    options = {
        'ajax_wait': 'true',
        'scroll': 'true',
        'scroll_interval': '60'
    }
    
    response = crawling_api.get(base_url, options)
    if response['headers']['pc_status'] == '200':
        html_content = response['body'].decode('utf-8')
        soup = BeautifulSoup(html_content, 'html.parser')
        
        deal_cards = soup.find_all('div', {'data-item-type': 'card'})
        all_deals = []

        for card in deal_cards:
            title = card.find('h2', class_='text-dealCardTitle').text.strip() if card.find('h2', class_='text-dealCardTitle') else ''
            link = card.find('a')['href'] if card.find('a') else ''
            original_price = card.find('div', {'data-testid': 'strike-through-price'})
            original_price = original_price.text.strip() if original_price else ''
            discounted_price = card.find('div', {'data-testid': 'green-price'})
            discounted_price = discounted_price.text.strip() if discounted_price else ''
            location = card.find('span', class_='truncate').text.strip() if card.find('span', class_='truncate') else ''
            image_tag = card.find('img')
            image_url = image_tag['src'] if image_tag and 'src' in image_tag.attrs else ''
            unique_id = link.split('/')[-1]  
            
            all_deals.append({
                'title': title,
                'original_price': original_price,
                'discounted_price': discounted_price,
                'link': link,
                'location': location,
                'image_url': "https:" + image_url,
                'id': unique_id
            })

        return jsonify(all_deals)
    else:
        return jsonify({"error": "Failed to fetch data", "status_code": response['headers']['pc_status']}), 500


#this is the flask route to scrape the description for a certain event
@app.route('/api/description', methods=['GET'])
def get_description():
    """Fetch the description of a deal from its link."""
    deal_url = request.args.get('url')
    if not deal_url:
        return jsonify({"error": "Missing 'url' parameter"}), 400
    
    options = {
        'ajax_wait': 'true'
    }

    try:
        response = crawling_api.get(deal_url, options)
        if response['headers'].get('pc_status') == '200':
            html_content = response['body'].decode('utf-8')
            soup = BeautifulSoup(html_content, 'html.parser')

            paragraphs = soup.find_all('p')
            description = ' '.join([p.get_text(strip=True) for p in paragraphs]) if paragraphs else 'No description available.'
            return jsonify({"description": description})
        else:
            return jsonify({"error": "Failed to fetch deal page", "status_code": response['headers'].get('pc_status')}), 500
    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
