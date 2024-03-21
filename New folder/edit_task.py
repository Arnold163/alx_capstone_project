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

@app.route('/edit_task', methods=['POST'])
def edit_task():
    # Retrieve data from the request
    task_id = int(request.json.get('taskId'))
    task_name = request.json.get('taskName')
    task_description = request.json.get('taskDescription')
    task_due_date = request.json.get('taskDueDate')
    task_priority = request.json.get('taskPriority')
    task_status = request.json.get('taskStatus')
    task_assignee = request.json.get('taskAssignee')

    # cursor object for SQL queries
    cursor = db.cursor()
     #insert the task into the database
    sql = "INSERT INTO tasks (task_name, task_description, task_priority, task_status) VALUES (%s, %s, %s, %s)"
    val = (task_name, task_description, task_priority, task_status)
    cursor.execute(sql, val)
    db.commit()

    #close the cursor and db connection
    cursor.close()

    # return success response
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)