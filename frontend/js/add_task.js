document.addEventListener('DOMContentLoaded', function() {
    var taskList = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        var tasksHTML = '';
        taskList.forEach(function(task, index) {
            tasksHTML += `
                <div class="task">
                    <h3>${task.taskName}</h3>
                    <p>${task.taskDescription}</p>
                    <button class="deleteTaskBtn" data-index="${index}">Delete</button>
                </div>
            `;
        });
        document.getElementById('taskList').innerHTML = tasksHTML;
    }

    // Initial rendering of tasks
    renderTasks();

    // Form submission handling
    document.getElementById('taskForm').addEventListener('submit', function(event) {
        event.preventDefault();

        var taskName = document.getElementById('taskName').value.trim();
        var taskDescription = document.getElementById('taskDescription').value.trim();
        var taskPriority = document.getElementById('taskPriority').value;
        var dueDate = document.getElementById('dueDate').value;
        var taskStatus = document.getElementById('taskStatus').value;

        // Perform client-side validation
        // (You can add your validation logic here)

        // Create new task object
        var newTask = {
            taskName: taskName,
            taskDescription: taskDescription,
            taskPriority: taskPriority,
            dueDate: dueDate,
            taskStatus: taskStatus
        };

        // Add new task to taskList
        taskList.push(newTask);

        // Save updated taskList to local storage
        localStorage.setItem('tasks', JSON.stringify(taskList));

        // Render tasks again
        renderTasks();

        // Reset form
        document.getElementById('taskForm').reset();
    });

    // Task deletion handling
    document.getElementById('taskList').addEventListener('click', function(event) {
        if (event.target.classList.contains('deleteTaskBtn')) {
            var index = event.target.dataset.index;
            taskList.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(taskList));
            renderTasks();
        }
    });
});