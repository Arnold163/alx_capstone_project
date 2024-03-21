from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Establish a connection to the MySQL database
db = mysql.connector.connect(
    host="localhost",
    user="root",  
    password="root",  
    database="Pcane"  
)

# check connection if succeful
if db.is_connected():
    print("Database Connected")

@app.route('/add_task', methods=['POST'])
def add_task():
    # retrieve task data from the request
    task_name = request.json.get('taskName')
    task_description = request.json.get('taskDescription')
    task_priority = request.json.get('taskPriority')
    due_date = request.json.get('dueDate')
    task_status = request.json.get('taskStatus')

    # cursor object for SQL queries
    cursor = db.cursor()

    # insert the task data into database
    sql = "INSERT INTO tasks (task_name, task_description, task_priority, due_date, task_status) VALUES (%s, %s, %s, %s, %s)"
    val = (task_name, task_description, task_priority, due_date, task_status)
    cursor.execute(sql, val)
    db.commit

    # close the cursor and db connection
    cursor.close

    # return success response 
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)