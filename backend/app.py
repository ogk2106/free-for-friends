from flask import Flask, jsonify, request
from flask_cors import CORS
from crawlbase import CrawlingAPI
from bs4 import BeautifulSoup
import json

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
crawling_api = CrawlingAPI({'token': 'RlVrqqjNg4yFnypxiZ9J0Q'})

USER_DATA = {}
user = ''

@app.route('/api/signup', methods=['OPTIONS', 'POST'])
def signup():
    try:
        if request.method == 'OPTIONS':
            response = jsonify({})
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
            response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type, X-Custom-Header'
            return response

        if request.method == 'POST':
            data = request.get_json()
            if data is None:
                return jsonify({'error': 'Invalid JSON format in request body'}), 400
            
            name = data.get('name')
            username = data.get('username')
            email = data.get('email')
            phone = data.get('phone')
            password = data.get('password')

            if not all([name, username, email, phone, password]):
                return jsonify({'error': 'All fields are required'}), 400

            if username in USER_DATA:
                return jsonify({'error': 'Username already exists'}), 400
            if phone in [u['phone'] for u in USER_DATA.values()]:
                return jsonify({'error': 'Phone number already exists'}), 400

            USER_DATA[username] = {'name': name, 'email': email, 'phone': phone, 'password': password, 'events': []}
            return jsonify({'message': 'User created successfully'}), 201

    except Exception as e:
        print(f"Error during signup: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500


def load_user_data():
    global USER_DATA
    try:
        with open('users.json', 'r') as file:
            USER_DATA = json.load(file)
    except FileNotFoundError:
        USER_DATA = {}

def save_user_data():
    with open('users.json', 'w') as file:
        json.dump(USER_DATA, file)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    user = USER_DATA.get(username)
    if not user or user['password'] != password:
        return jsonify({'error': 'Invalid username or password'}), 401

    return jsonify({'message': 'Login successful'}), 200

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
    app.run(debug=True, host="0.0.0.0", port=5000)
