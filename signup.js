// Select input fields using correct IDs
const username = document.querySelector('#username');
const firstname = document.querySelector('#firstname');
const lastname = document.querySelector('#lastname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const cpassword = document.querySelector('#cpassword');

function signupHandler() {
    // Retrieve existing users from localStorage or initialize as empty array if none exists
    let allusers = JSON.parse(localStorage.getItem('allusers')) || [];

    // Check if any fields are empty
    if (!username.value || !firstname.value || !lastname.value || !email.value || !password.value || !cpassword.value) {
        return alert('Please fill all the inputs');
    }

    // Check if password and confirm password match
    if (password.value !== cpassword.value) {
        return alert('Confirm password should match the original password');
    }

    // Ensure password is at least 8 characters
    if (password.value.length < 8) {
        return alert('Password should be at least 8 characters');
    }

    // Prepare the new user object
    const userDetails = {
        username: username.value,
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value,
    };

    // Add new user to the array of users
    allusers.push(userDetails);

    // Save the updated user list to localStorage
    localStorage.setItem('allusers', JSON.stringify(allusers));

    // Redirect to the login page after successful signup
    window.location = 'login.html';
}

function alreadyAccHandler(){
    window.location = 'login.html'
}
