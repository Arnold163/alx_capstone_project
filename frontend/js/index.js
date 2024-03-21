document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch tasks from server and insert into task list
    function fetchTasks() {
        fetch('get_tasks.py') // Assuming get_tasks.py handles retrieving tasks from the database
        .then(response => response.json())
        .then(data => {
            // Clear existing task list
            document.getElementById('taskList').innerHTML = '';

            // Insert fetched tasks into task list
            data.tasks.forEach(task => {
                var taskElement = document.createElement('div');
                taskElement.classList.add('task');
                taskElement.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <!-- Include buttons for editing/deleting tasks if needed -->
                `;
                document.getElementById('taskList').appendChild(taskElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            // Display error message (if needed)
            alert('An error occurred while fetching tasks. Please try again later.');
        });
    }

    // Fetch tasks on page load
    fetchTasks();
});