from flask import Flask, request, jsonify
import _mysql_connector

app = Flask(__name__)

# MySql database connection
db = _mysql_connector.connect(
    host="localhost",
    user="root"
    password="root"
    database="Pcane"
)


@app.route('/backend/login.py', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE username = % AND password = %s",(username, password))
    user = cursor.fetchone

    if user:
        return jsonify({'success': True, 'message': 'Login succeful'})
    else:
        return jsonify({'success': False 'message': 'Invalid username or password'})

    
    if __name__ == '__main__':
        app.run(debug=True)
    
