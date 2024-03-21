from flask import Flask, render_template, request, redirect, url_for, jsonify, session

app = Flask(__name__)
app.secret_key = 'secret_key'

@app.route('/sign_up', methods=['POST'])
def signup():
    #retrieve form data
    data = request.form
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    #check if the username already exist in the database
    if'users' in session:
        if username in session['users']:
            return jsonify({"success": False, "message": "Username already exist"}), 409
    else:
        session['users'] = {}

    
     # Store user data in session (local storage)
    session['users'][username] = {'email': email, 'password': password}

    #Redirect to the login page after successful sign-up
    return redirect(url_for('login'))

@app.route('/login')
def login():
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)