// Define the users object with username-password pairs
var users = {
    'john': { password: 'password123', tasks: ['Task 1', 'Task 2'] },
    'emma': { password: 'abcxyz', tasks: ['Task 3', 'Task 4'] }
    // Add more users as needed
};

document.addEventListener('DOMContentLoaded', function() {
    // Form submission handler
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form inputs
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        // Dummy check for valid credentials
        var userData = users[username];
        if (userData && userData.password === password) {
            // Store user data in session storage (password should not be stored)
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('tasks', JSON.stringify(userData.tasks)); // Store tasks

            // Redirect to dashboard
            window.location.href = 'index.html';
        } else {
            // Display error message 
            alert('Invalid username or password. Please try again.');
        }
    });
});