document.addEventListener('DOMContentLoaded', function() {
    //function to fetch task details from server and populate form fields 
    function fetchTaskDetails(taskId) {
        fetch('get_task_details.py?taskId=' + taskId)// assuming get task id handles retrieving task details
        .then(response => response.json())
        .then(data => {
            //populate form fields with task details
            document.getElementById('taskName').value = data.taskName;
            document.getElementById('taskDescription').value = data.taskDescription;
            document.getElementById('taskDueDate').value = data.taskDueDate;
            document.getElementById('taskPriority').value = data.taskPriority;
            document.getElementById('taskStatus').value = data.taskStatus;
            document.getElementById('taskAssignee').value = data.taskAssignee;
            document.getElementById('taskId').value = data.taskId;
        })

        .catch(error =>{
            console.error('Error:', error);
            //display error
            alert('something is wrong mate sorry try later')
        });

    }

    //fetch task details based on task ID passed in URL query parameter
    const urlparams = new URLSearchParams(window.location.search);
    const taskId = urlparams.get('taskId');
    if (taskId) {
        fetchTaskDetails(taskId);
    }
    // form subbmission handling for editing task
    document.getElementById('editTaskForm').addEventListener('submit', function(event){
        event.preventDefault(); 

        //get form inputs
        var taskName = document.getElementById('taskName').value;
        var tasDescriprition = document.getElementById('taskDescription').value;
        var taskDueDate = document.getElementById('taskDueDate').value;
        var taskPriority = document.getElementById('taskPriority').value;
        var taskStatus = document.getElementById('taskStatus').value;
        var taskAssignee = document.getElementById('taskAssignee').value;
        var taskId = document.getElementById('taskId').value;

        //perfom client side validation

        fetch('edit_task.py', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                taskId: taskId,
                taskName: taskName,
                tasDescriprition: tasDescriprition,
                taskDueDate: taskDueDate,
                taskPriority: taskPriority,
                taskAssignee: taskAssignee
            })
        })
        .then(response => response.JSON())
        .then(data => {
            //handle respomse from server
            if (data.success) {
                //if edit succeful show task list page
                window.location.href = 'index.html';
            } else {
                //display error
                alert('Failed to edit task try again my guy');


            }
        })
        .catch(error => {
            console.error('Error', error);
            //display error
            alert('an error occured while processing your request')
        });
    });

    //delete task button handlind
    document.getElementById('deleteTaskBtn').addEventListener('click', function(){
        if (confirm('sure you want this task?')) {
            var taskId = document.getElementById('taskId').value;

            //send request to server to delete task
            fetch('delete_task.py?=' + taskId, {
                method: 'DELETE' 
            })
            .then(response => response.json())
            .then(data => {
                //handle response frm server
                if (data.success) {
                    //if task deleted direct to task list or succes msg
                    window.location.href = 'index.html';
                } else {
                    //display error msg
                    alert('an error occured while processing request');
                }
            })

            .catch(error => {
                console.error('Error:', error);
                //display error message 
                alert('An error occured while processing request')
            });
        }
    }) ;
});