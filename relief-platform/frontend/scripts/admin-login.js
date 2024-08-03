document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const credentials = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = '/admin';
        } else {
            alert('Login failed');
        }
    })
    .catch(error => {
        alert('Error: ' + error);
    });
});
