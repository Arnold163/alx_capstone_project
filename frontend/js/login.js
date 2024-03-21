document.addEventListener('DOMContentLoaded', function() {
    // Form submission handler
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        // Get form inputs
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        // Send login request to server
        fetch('http://localhost:5000/backend/login.py', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            // Handle response from server
            if (data.success) {
                // Redirect to dashboard
                window.location.href = 'index.html';
            } else {
                // Display error message 
                alert('Login failed. Please check your credentials.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Display error message 
            alert('An error occurred while processing your request. Please try again later.');
        });
    });
});