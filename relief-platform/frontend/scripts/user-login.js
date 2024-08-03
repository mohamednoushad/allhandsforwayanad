document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const loginData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.token) {
            localStorage.setItem('token', data.token);
            if (data.role === 'camp_assistant') {
                window.location.href = '/camp-assistant-profile';
            } else if (data.role === 'collection_agent') {
                window.location.href = '/collection-agent-profile';
            } else {
                window.location.href = '/user-profile';
            }
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        alert('Error: ' + error);
    });
});
