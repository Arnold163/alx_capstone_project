import json

# Load tasks from a JSON file
with open('tasks.json', 'r') as file:
    tasks_data = json.load(file)

# Send JSON response
print('Content-Type: application/json')
print()
print(json.dumps({'tasks': tasks_data}))