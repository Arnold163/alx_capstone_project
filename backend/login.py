from flask import Flask, request, jsonify, session, redirect, url_for, render_template

app = Flask(__name__)
app.secret_key = 'secret_key'

# Dummy user data (replace this with your actual user database or use an ORM like SQLAlchemy)
users = {
    'john': 'password123',
    'emma': 'abcxyz',
    # Add more users as needed
}

@app.route('/')
def login_page():
    return render_template('login.html')

@app.route('/backend/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    # Check if username and password match a user in the dummy user data
    if username in users and users[username] == password:
        # Store username in session
        session['username'] = username
        return jsonify({"success": True, "message": "Login successful"}), 200
    else:
        return jsonify({"success": False, "message": "Invalid username or password"}), 401

@app.route('/backend/logout')
def logout():
    # Remove username from session to log out the user
    session.pop('username', None)
    return redirect(url_for('login_page'))

@app.route('/backend/check_login')
def check_login():
    # Check if user is logged in by checking if 'username' is in session
    if 'username' in session:
        return jsonify({"logged_in": True, "username": session['username']}), 200
    else:
        return jsonify({"logged_in": False}), 401

if __name__ == '__main__':
    app.run(debug=True)