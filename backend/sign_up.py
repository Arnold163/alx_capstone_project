from flask import Flask, render_template, request, redirect, url_for
import mysql.connector

app = Flask(__name__)

# Establish a connection to the MySQL database
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="Pcane"
)

@app.route('/sign_up', methods=['POST'])
def signup():
    #retrieve form data
    data = request.form
    username = data.form.get('username')
    email = data.form.get('email')
    password = data.form.get('password')

    #check if the username already exist in the database
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s" , (username))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({"success": False, "message": "Username already exist"}), 409
    
    #insert the new user into the database
    cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", (username, email, password))
    db.commit()
    cursor.close()
    
    #Redirect to the login page after successful sign-up
    return redirect(url_for('login'))

@app.route('/login')
def login():
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)