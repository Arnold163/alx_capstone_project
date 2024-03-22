from flask import Flask, render_template, request, redirect, url_for, session, jsonify

app = Flask(__name__)
app.secret_key = 'secret_key'

@app.route('/sign_up', methods=['POST'])
def signup():
    # Retrieve form data
    data = request.form
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Check if the username already exists in the database
    if 'users' in session:
        if username in session['users']:
            return jsonify({"success": False, "message": "Username already exists"}), 409
    else:
        session['users'] = {}

    # Store user data in session
    session['users'][username] = {'email': email, 'password': password}

    # Redirect to the login page after successful sign-up
    return redirect(url_for('login'))

@app.route('/login')
def login():
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)