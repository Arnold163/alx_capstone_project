document.addEventListener('DOMContentLoaded', function() {
    //modal handling here
    var modal = document.getElementById('taskModal');
    var addTaskbtn = document.getElementById('addTaskBtn');
    var closeBtn = document.getElementsByClassName('close')[0];

    //open modal when add task button is clicked
    addTaskbtn.onclick = function() {
        modal.style.display = 'block';
    }
    
    //close modal when button clicked
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    //close modal when clicking outside of it 
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    //form submission handling 
    document.getElementById('taskForm').addEventListener('submit', function(event) {
        event.preventDefault(); //default shouldnt submit 

        //get form inputs
        var taskName = document.getElementById('taskName').value;
        var tasDescriprition = document.getElementById('taskDescription').value;
        var taskPriority = document.getElementById('taskPriority').value;
        var dueDate = document.getElementById('dueDate').value;
        var taskStatus = document.getElementById('taskStatus').value;

        // perform client side if validation required

        //submit task data to server (backensd fetch POST request to a backend endpoint)
        fetch('add_task_.py', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                taskName: taskName,
                tasDescriprition: tasDescriprition,
                taskPriority: taskPriority,
                dueDate: dueDate,
                taskStatus: taskStatus
            })
        })
        .then(response => response.json())
        .then(data => {
            //handle response from server
            if (data.success) {
                //if task adds succesfully, close modal and refresh task list
                modal.style.display = 'none';
                
            } else {
                //display error msg 
                alert('failed to add task, try again.');
            }
        })

        .catch(error =>{
            console.error('Error:', error);
            //display error msg
            alert('An error occured while proseccing your request, try later');
        });

    });

});