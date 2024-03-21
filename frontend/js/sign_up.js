document.getElementById('signupForm').addEventListener('submit' ,function(event){
    event.preventDefault(); //prevent default from submission 
    //perform signup validation and registration 
    //if signup is succeful, redirect to loging page
    window.location.href = 'login.html';
});