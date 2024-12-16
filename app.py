from flask import Flask, jsonify, request
from flask_cors import CORS
from crawlbase import CrawlingAPI
from bs4 import BeautifulSoup
import json
import requests

app = Flask(__name__)
CORS(app)
#CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
crawling_api = CrawlingAPI({'token': 'wX-pAYbPYZjBGpM5EruUZQ'})
GROUPME_ACCESS_TOKEN = "BB4y1csdMGCpMouSuWThTmsYKHk9V2CNWhoMgN1U"


USER_DATA = {}
EVENT_RSVPS = {}
user = ''

@app.route('/api/signup', methods=['POST'])
def signup():
    try:
        """ if request.method == 'OPTIONS':
            response = jsonify({})
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
            response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
            response.headers['Access-Control-Allow-Headers'] = 'Content-Type, X-Custom-Header'
            return response """

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
    
# @app.route('/api/add_event', methods=['POST'])
# def add_event():
#     # Fetch the data sent by the frontend (event ID and username)
#     data = request.get_json()
#     event_id = data.get('event_id')
#     username = data.get('username')

#     if not event_id or not username:
#         return jsonify({'error': 'Event ID and username are required'}), 400

#     # Ensure the user exists in USER_DATA
#     user = USER_DATA.get(username)
#     if not user:
#         return jsonify({'error': 'User not found'}), 404

#     # Add the event ID to the user's event list if not already added
#     if event_id not in user['events']:
#         user['events'].append(event_id)
#         save_user_data()  # Save the updated user data
#         return jsonify({'message': 'Event added successfully'}), 200
#     else:
#         return jsonify({'error': 'Event already added'}), 400
    
# @app.route('/api/current_user', methods=['GET'])
# def get_current_user():
#     username = request.args.get('username')
#     if username and username in USER_DATA:
#         return jsonify({'username': username})
#     return jsonify({'error': 'No user logged in'}), 401

@app.route('/api/add_event', methods=['POST'])
def add_event():
    data = request.get_json()
    event_id = data.get('event_id')
    username = data.get('username')
    name = data.get('name')

    if not event_id or not username:
        return jsonify({'error': 'Event ID and username are required'}), 400

    # Ensure the user exists in USER_DATA
    user = USER_DATA.get(username)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Initialize event RSVP list if it doesn't exist
    if event_id not in EVENT_RSVPS:
        EVENT_RSVPS[event_id] = {
            'attendees': [],  # List of usernames
            'num_attendees': 0,  # Count of attendees
            'last_person': None  # Last person who RSVP'd
        }

    # Check if the user has already joined this event
    if username in EVENT_RSVPS[event_id]['attendees']:
        return jsonify({'error': 'Event already joined'}), 400

    # Add user to the event's RSVP list
    EVENT_RSVPS[event_id]['attendees'].append(username)
    EVENT_RSVPS[event_id]['num_attendees'] += 1
    EVENT_RSVPS[event_id]['last_person'] = name

    return jsonify({'message': 'Event added successfully', 'num_attendees': EVENT_RSVPS[event_id]['num_attendees'], 'last_person': EVENT_RSVPS[event_id]['last_person']}), 200

#names saving
# @app.route('/api/get_event_rsvp', methods=['GET'])
# def get_event_rsvp():
#     event_id = request.args.get('event_id')
#     if not event_id:
#         return jsonify({'error': 'Event ID is required'}), 400
    
#     # Get the RSVPs for this event
#     rsvps = EVENT_RSVPS.get(event_id, [])
#     if not rsvps:
#         return jsonify({'error': 'No RSVPs found for this event'}), 404

#     # Get the last person and the total number of RSVPs
#     last_person = rsvps[-1] if rsvps else None
#     num_attendees = len(rsvps)

#     return jsonify({
#         'last_person': last_person,
#         'num_attendees': num_attendees
#     })
@app.route('/api/get_event_rsvp', methods=['GET'])
def get_event_rsvp():
    event_id = request.args.get('event_id')
    if not event_id:
        return jsonify({'error': 'Event ID is required'}), 400
    
    # Get the RSVPs for this event
    rsvps = EVENT_RSVPS.get(event_id, [])
    if not rsvps:
        return jsonify({'error': 'No RSVPs found for this event'}), 404

    # Get the last person and the total number of RSVPs
    last_person = rsvps[-1] if rsvps else None  # Get last person who RSVP'd
    num_attendees = len(rsvps)  # Get number of attendees

    return jsonify({
        'last_person': last_person,
        'num_attendees': num_attendees
    })

@app.route('/api/groupchat', methods=['POST'])
def manage_groupchat():
    data = request.get_json()
    event_id = data.get('event_id')

    if not event_id:
        return jsonify({"error": "Event ID is required"}), 400

    # Check if event exists in EVENT_RSVPS
    if event_id not in EVENT_RSVPS:
        EVENT_RSVPS[event_id] = {
            'attendees': [],
            'num_attendees': 0,
            'last_person': None,
            'group_chat_link': None
        }

    # Check if group_chat_link already exists
    if EVENT_RSVPS[event_id].get('group_chat_link'):
        return jsonify({
            "group_chat_link": EVENT_RSVPS[event_id]['group_chat_link'],
            "message": "Group chat already exists"
        }), 200

    # Generate new GroupMe group chat link
    try:
        group_name = f"Event {event_id} Group Chat"
        group_chat_link = create_groupme_group(group_name, "Group for event attendees")
        EVENT_RSVPS[event_id]['group_chat_link'] = group_chat_link

        return jsonify({
            "group_chat_link": group_chat_link,
            "message": "Group chat created successfully"
        }), 201
    except Exception as e:
        return jsonify({"error": f"Failed to create group chat: {e}"}), 500


def create_groupme_group(group_name, description):
    """
    Creates a GroupMe group and returns the share link.
    """
    url = f"https://api.groupme.com/v3/groups?token={GROUPME_ACCESS_TOKEN}"
    headers = {"Content-Type": "application/json"}
    payload = {
        "name": group_name,
        "description": description,
        "share": True
    }

    response = requests.post(url, json=payload, headers=headers)
    print("GroupMe API Response Status Code:", response.status_code)
    print("GroupMe API Response Body:", response.text)  # Debug print
    if response.status_code == 201:
        response_data = response.json()
        share_url = response_data['response']['share_url']
        print("Extracted Share URL:", share_url)  # Debug print
        return share_url
    else:
        error_message = response.json().get('meta', {}).get('errors', "Unknown error")
        raise Exception(f"GroupMe API Error: {error_message}")




if __name__ == "__main__":
    app.run(debug=True)
