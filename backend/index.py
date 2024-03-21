import json

# Fetch tasks from local storage (assuming tasks are stored as JSON)
tasks = json.loads(localStorage.getItem('tasks')) or []

# Prepare tasks data as JSON
tasks_data = []
for task in tasks:
    tasks_data.append({
        'title': task['title'],
        'description': task['description']
    })

# Send JSON response
print('Content-Type: application/json')
print()
print(json.dumps({'tasks': tasks_data}))