

function changeImage(imageUrl) {
    document.getElementById('welcomeScreen').innerHTML = `<img style="height: 100%; width: 100%;" src="${imageUrl}">`;
    document.getElementById('welcomeScreen').insertAdjacentHTML('beforeend', '<span id="backToHomeIcon" onclick="redirectToHome()">↩</span>');
}

function redirectToHome() {
    window.location.href = 'index.html';
}

function forgotPassword() {
    Swal.fire({
        title: 'Forgot Password',
        text: 'Please enter your email to receive a security code.',
        input: 'email',
        inputPlaceholder: 'Enter your email',
        showCancelButton: true,
        confirmButtonText: 'Send Code',
        cancelButtonText: 'Cancel',

        preConfirm: (email) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });
        },
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Code Sent!', 'Check your email for the security code.', 'success');
        }
    });
}

function handlePasswordInput() {
    const passwordInput = document.getElementById('passwordInput');
    const passwordValue = passwordInput.value;
    const maskedPassword = '•'.repeat(passwordValue.length);
    passwordInput.value = maskedPassword;
}

function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('passwordInput').value;

    if (!username || !password) {
        Swal.fire({
            icon: 'warning',
            title: 'Incomplete Login',
            text: 'Please enter a valid username and password.',
            confirmButtonText: 'OK',
        });
    } else {
        changeImage('It happens.jpg');
    }
}

function authenticateWithProvider(provider) {
    Swal.fire({
        title: `Login with ${provider}`,
        html: `Enter your ${provider} email and password: <br><br>` +
              `<input type="email" id="${provider}Email" class="swal2-input" placeholder="Email">` +
              `<input type="password" id="${provider}Password" class="swal2-input" placeholder="Password">`,
        showCancelButton: true,
        confirmButtonText: 'Log in',
        cancelButtonText: 'Cancel',

        preConfirm: () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });
        },
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            const imageUrl = getImageUrlForProvider(provider);
            changeImage(imageUrl);
            Swal.fire(`Logged in with ${provider}!`, '', 'success');
        }
    });
}

function getImageUrlForProvider(provider) {
    switch (provider) {
        case 'Google':
            return 'It happens.jpg';
        case 'Facebook':
            return 'It happens.jpg';
        case 'Twitter':
            return 'It happens.jpg';
        default:
            return 'It happens.jpg';
    }
}

// Asignar eventos después de que el DOM se haya cargado
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginButton").addEventListener("click", validateLogin);
    document.getElementById("passwordInput").addEventListener("input", handlePasswordInput);
    document.getElementById("forgotPasswordLink").addEventListener("click", forgotPassword);
    document.getElementById("googleButton").addEventListener("click", function () {
        authenticateWithProvider('Google');
    });
    document.getElementById("facebookButton").addEventListener("click", function () {
        authenticateWithProvider('Facebook');
    });
    document.getElementById("twitterButton").addEventListener("click", function () {
        authenticateWithProvider('Twitter');
    });
});
