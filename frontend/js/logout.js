document.getElementById('logoutBtn').addEventListener('click', function() {
    // Send a request to the server to logout
    fetch('/logout', {
        method: 'POST', // You can use GET, POST, or other methods depending on your setup
        headers: {
            'Content-Type': 'application/json'
        },
       
    })
    .then(response => {
        if (response.ok) {
            // Redirect to the login page after successful logout
            window.location.href = '/login.html';
        } else {
            // Handle errors
            console.error('Logout failed:', response.statusText);
            // Optionally, display an error message to the user
        }
    })
    .catch(error => {
        console.error('Logout failed:', error);
        // Handle errors
        // Optionally, display an error message to the user
    });
});