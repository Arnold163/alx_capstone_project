import json
import mysql.connector

# Establish database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="Pcane"
)
cursor = db.cursor()

# Execute query to fetch tasks
cursor.execute("SELECT * FROM tasks")
tasks = cursor.fetchall()

# Prepare tasks data as JSON
tasks_data = []
for task in tasks:
    tasks_data.append({
        'id': task[0],
        'title': task[1],
        'description': task[2]
    })

# Send JSON response
print('Content-Type: application/json')
print()
print(json.dumps({'tasks': tasks_data}))