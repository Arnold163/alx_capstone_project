document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch task details from local storage and populate form fields 
    function fetchTaskDetails(taskId) {
        var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        // Find the task with the given taskId
        var task = tasks.find(task => task.id === taskId);
        if (task) {
            // Populate form fields with task details
            document.getElementById('taskName').value = task.title;
            document.getElementById('taskDescription').value = task.description;
            document.getElementById('taskDueDate').value = task.dueDate;
            document.getElementById('taskPriority').value = task.priority;
            document.getElementById('taskStatus').value = task.status;
            document.getElementById('taskAssignee').value = task.assignee;
            document.getElementById('taskId').value = taskId;
        } else {
            alert('Task not found!');
        }
    }

    // Fetch task details based on task ID passed in URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('taskId');
    if (taskId) {
        fetchTaskDetails(taskId);
    }

    // Form submission handling for editing task
    document.getElementById('editTaskForm').addEventListener('submit', function(event){
        event.preventDefault(); 

        // Get form inputs
        var taskName = document.getElementById('taskName').value;
        var taskDescription = document.getElementById('taskDescription').value;
        var taskDueDate = document.getElementById('taskDueDate').value;
        var taskPriority = document.getElementById('taskPriority').value;
        var taskStatus = document.getElementById('taskStatus').value;
        var taskAssignee = document.getElementById('taskAssignee').value;
        var taskId = document.getElementById('taskId').value;

        // Perform client-side validation

        // Construct task object
        var updatedTask = {
            id: taskId,
            title: taskName,
            description: taskDescription,
            dueDate: taskDueDate,
            priority: taskPriority,
            status: taskStatus,
            assignee: taskAssignee
        };

        // Update task in local storage
        var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => task.id === taskId ? updatedTask : task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Redirect to task list page
        window.location.href = 'index.html';
    });

    // Delete task button handling
    document.getElementById('deleteTaskBtn').addEventListener('click', function(){
        if (confirm('Are you sure you want to delete this task?')) {
            var taskId = document.getElementById('taskId').value;

            // Remove task from local storage
            var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks = tasks.filter(task => task.id !== taskId);
            localStorage.setItem('tasks', JSON.stringify(tasks));

            // Redirect to task list page
            window.location.href = 'index.html';
        }
    });
});