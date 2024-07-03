import json
from flask import Flask, jsonify, request
from Data.book import books 
from pymongo import MongoClient

app = Flask(__name__)


# Your Flask routes or application logic go here...


# Data structure to store users, books, and comments
users = [
    {'id': 1,'ClerkId':1234567 ,'name': 'Salem' , 'number' : 1233 , 'Admin': True, 'Writer': False, 'Rater': False,'URLImage': 'https://cdn.discordapp.com/attachments/1163689186176532502/1183410930265104514/skinmc-avatar.png?ex=65883c50&is=6575c750&hm=1fca8b822483927016880a62352e56c80f26d5e89975fd8263d8f235fe266038&'},
    {'id': 2, 'name': 'بسام', 'number' : 6789 , 'Writer': True,},
    
]


comments = [
    {'id': 1, 'user_id': 1, 'book_id': 1, 'text': 'Great book!'},
    {'id': 2, 'user_id': 2, 'book_id': 1, 'text': 'Not my favorite.'},
    {'id': 3, 'user_id': 1, 'book_id': 2, 'text': 'جميل جداً'},
    {'id': 4, 'user_id': 2, 'book_id': 3, 'text': 'هاااي'},
    {'id': 5, 'user_id': 2, 'book_id': 2, 'text': 'قصة جيد جداً'},
    # Add more comments as needed...
]

likes = [
    {'id': 1 , 'user_id':1 , 'comment_id':3},
    {'id': 2 , 'user_id':2 , 'comment_id':1 },
    {'id': 3 , 'user_id':2 , 'comment_id':1 },
    {'id': 4 , 'user_id':2 , 'comment_id':1 },
    {'id': 5 , 'user_id':1 , 'comment_id':3},
    {'id': 6 , 'user_id':1 , 'comment_id':2},
]

nextUserId = 3  # Update the starting ID for users
nextBookId = 2  # Update the starting ID for books
nextCommentId = 3  # Update the starting ID for comments


# Connect to MongoDB
db = client["Kutib_guidewould"] 
users_collection = db["users"]

@app.route('/users', methods=['GET'])
def get_users():
    # Fetch users from MongoDB
    users = list(users_collection.find())
    return jsonify(users)

@app.route('/users/<int:id>', methods=['GET'])
def get_user_by_id(id):
    # Fetch user by ID from MongoDB
    user = users_collection.find_one({'id': id})
    if user is None:
        return jsonify({'error': f'User with ID {id} does not exist.'}), 404
    return jsonify(user)

@app.route('/users', methods=['POST'])
def create_user():
    global nextUserId
    user_data = request.get_json()

    if not user_data:
        return jsonify({'error': 'Invalid JSON data.'}), 400
    
    try:
        new_user = {
            'id': nextUserId,
            'name': user_data['name'],
            'number': user_data['number'],
            'Admin': user_data.get('Admin', False),
            'Writer': user_data.get('Writer', False),
            'Rater': user_data.get('Rater', False),
            'ClerkId': user_data['ClerkId'],
            'URLImage': user_data.get('URLImage', None)
        }

        nextUserId += 1
        # Insert new user into MongoDB
        users_collection.insert_one(new_user)

        return '', 201, {'location': f'/users/{new_user["id"]}'}
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    global users, books, comments
    user = next((u for u in users if u['id'] == id), None)
    if user is None:
        return jsonify({ 'error': f'User with ID {id} does not exist.' }), 404

    # Delete associated books and comments
    books = [b for b in books if b.get('user_id') != id]
    comments = [c for c in comments if c['user_id'] != id]

    users = [u for u in users if u['id'] != id]
    return jsonify(user), 200

@app.route('/books', methods=['GET'])
def get_books():
    return jsonify(books)

@app.route('/books/<int:id>', methods=['GET'])
def get_book_by_id(id):
    book = next((b for b in books if b['id'] == id), None)
    if book is None:
        return jsonify({ 'error': f'Book with ID {id} does not exist.' }), 404
    return jsonify(book)

@app.route('/books', methods=['POST'])
def create_book():
    global nextBookId
    book_data = json.loads(request.data)
    new_book = {
        'id': nextBookId,
        'name': book_data['name'],
        'author': book_data['author'],
        'date': book_data['date'],
        'URLImage': book_data['URLImage'],
        'rate': book_data['rate'],
        'user_id': book_data['user_id']
    }
    nextBookId += 1
    books.append(new_book)
    return '', 201, { 'location': f'/books/{new_book["id"]}' }

@app.route('/books/<int:id>', methods=['DELETE'])
def delete_book(id):
    global books, comments
    book = next((b for b in books if b['id'] == id), None)
    if book is None:
        return jsonify({ 'error': f'Book with ID {id} does not exist.' }), 404

    # Delete associated comments
    comments = [c for c in comments if c['book_id'] != id]

    books = [b for b in books if b['id'] != id]
    return jsonify(book), 200

@app.route('/comments', methods=['GET'])
def get_comments():
    return jsonify(comments)

@app.route('/comments/<int:id>', methods=['GET'])
def get_comment_by_id(id):
    comment = next((c for c in comments if c['id'] == id), None)
    if comment is None:
        return jsonify({ 'error': f'Comment with ID {id} does not exist.' }), 404
    return jsonify(comment)

@app.route('/comments', methods=['POST'])
def create_comment():
    global nextCommentId
    comment_data = json.loads(request.data)
    new_comment = {
        'id': nextCommentId,
        'user_id': comment_data['user_id'],
        'book_id': comment_data['book_id'],
        'text': comment_data['text']
    }
    nextCommentId += 1
    comments.append(new_comment)
    return '', 201, { 'location': f'/comments/{new_comment["id"]}' }

@app.route('/books/<int:book_id>/comments', methods=['GET'])
def get_comments_by_book_id(book_id: int):
    # Filter comments based on the provided book_id
    book_comments = [comment for comment in comments if comment['book_id'] == book_id]
    
    # Check if the book has any comments
    if not book_comments:
        return jsonify({'error': f'No comments found for book with ID {book_id}.'}), 404

    return jsonify(book_comments)

@app.route('/comments/<int:id>', methods=['DELETE'])
def delete_comment(id):
    global comments
    comment = next((c for c in comments if c['id'] == id), None)
    if comment is None:
        return jsonify({ 'error': f'Comment with ID {id} does not exist.' }), 404

    comments = [c for c in comments if c['id'] != id]
    return jsonify(comment), 200


@app.route('/books/<int:book_id>/comments/<int:comment_id>/likes', methods=['GET'])
def get_likes_for_comment(book_id: int, comment_id: int):
    # Filter likes based on the provided book_id and comment_id
    comment_likes = [like for like in likes if like['comment_id'] == comment_id]

    # Check if the comment has any likes
    if not comment_likes:
        return jsonify({'error': f'No likes found for comment with ID {comment_id}.'}), 404

    # Return the count of likes for the comment
    likes_count = len(comment_likes)
    return jsonify({'comment_id': comment_id, 'likes_count': likes_count, 'likes': comment_likes})

# New route for searching books by tags
@app.route('/books/search', methods=['GET'])
def search_books_by_tags():
    tags_query = request.args.get('tags')
    if not tags_query:
        return jsonify({ 'error': 'Missing search query parameter "tags".' }), 400

    search_tags = tags_query.split(',')
    matching_books = [book for book in books if any(tag.lower() in map(str.lower, book['tags']) for tag in search_tags)]
    return jsonify(matching_books)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

