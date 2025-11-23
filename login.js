// Select input fields for login
const email2 = document.querySelector('#email2');
const password2 = document.querySelector('#password2');

function loginHandler() {
    // Check if email or password is missing
    if (!password2.value || !email2.value) {
        return alert('Please enter email and password');
    }

    // Retrieve all users from localStorage
    const allUsers = JSON.parse(localStorage.getItem('allusers')) || [];

    // Check if the user exists based on the entered email
    const isExist = allUsers.find(function(userData) {
        return userData.email.toLowerCase() === email2.value.toLowerCase();
    });

    // If the user does not exist, show an alert
    if (!isExist) {
        return alert('Please create your account first');
    }

    // Check if the password matches the one stored for the user
    if (isExist.password === password2.value) {
        alert('Congratulations, you are signing in!');
        
        // Store the logged-in user in localStorage
        localStorage.setItem('loggedinUser', JSON.stringify(isExist));

        // Redirect to the dashboard after successful login
        window.location = 'dashboard.html';
    } else {
        alert('Incorrect password, please try again');
    }
}

function lgsignupHandler(){
    window.location = 'signup.html'
}
