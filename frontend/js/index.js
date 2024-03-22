document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch tasks from local storage and insert into task list
    function fetchTasks() {
        var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        console.log('Fetched tasks:', tasks); // Log fetched tasks
        // Clear existing task list
        document.getElementById('taskList').innerHTML = '';

        // Insert fetched tasks into task list
        tasks.forEach(task => {
            console.log('Processing task:', task); // Log each task being processed
            var taskElement = document.createElement('div');
            taskElement.classList.add('task');
            taskElement.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <!-- Include buttons for editing/deleting tasks if needed -->
            `;
            document.getElementById('taskList').appendChild(taskElement);
        });
    }

    // Fetch tasks on page load
    fetchTasks();
});