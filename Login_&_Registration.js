// 2D array to store user data: [username, email, password]
let users = [];

// Show login form
function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    clearMessages();
}

// Show registration form
function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    clearMessages();
}

// Clear message displays
function clearMessages() {
    document.getElementById('loginMessage').textContent = '';
    document.getElementById('registerMessage').textContent = '';
}

// Registration function
function register() {
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const messageElement = document.getElementById('registerMessage');

    if (!username || !email || !password) {
        messageElement.textContent = 'All fields are required';
        return;
    }

    if (username.length < 3) {
        messageElement.textContent = 'Username must be at least 3 characters';
        return;
    }

    if (password.length < 6) {
        messageElement.textContent = 'Password must be at least 6 characters';
        return;
    }

    const userExists = users.some(user => user[0] === username);
    if (userExists) {
        messageElement.textContent = 'Username already taken';
        return;
    }

    users.push([username, email, password]);
    messageElement.textContent = 'Registration successful!';
    
    document.getElementById('regUsername').value = '';
    document.getElementById('regEmail').value = '';
    document.getElementById('regPassword').value = '';
    
    console.log('Current users:', users);
    
    // Return to login page after 1 second
    setTimeout(showLogin, 1000);
}

// Login function
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const messageElement = document.getElementById('loginMessage');

    if (!username || !password) {
        messageElement.textContent = 'All fields are required';
        return;
    }

    const user = users.find(user => user[0] === username && user[2] === password);
    
    if (user) {
        messageElement.textContent = 'Login successful! Welcome ' + username;
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
        // Redirect to home page after 1 second
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        messageElement.textContent = 'Invalid username or password';
    }
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    const now = new Date();
    const hours = now.getHours();
    const greeting = document.createElement('h2');

    if (hours < 12) {
        greeting.textContent = 'Good Morning!';
    } else if (hours < 18) {
        greeting.textContent = 'Good Afternoon!';
    } else {
        greeting.textContent = 'Good Evening!';
    }

    document.querySelector('#loginForm').insertBefore(greeting, document.querySelector('#loginForm').firstChild.nextSibling);
    document.querySelector('#registerForm').insertBefore(greeting.cloneNode(true), document.querySelector('#registerForm').firstChild.nextSibling);
});