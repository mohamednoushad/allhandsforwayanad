// Check if the user is logged in
if (!localStorage.getItem('token')) {
    window.location.href = '/user-login';
}

// Function to load needs for the camp assistant
function loadNeeds() {
    fetch('/api/needs/camp', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data)) {
            const needsList = data.map(need => `
                <tr>
                    <td>${need.item}</td>
                    <td>${need.quantity}</td>
                    <td>${need.status}</td>
                    <td>${need.collection_point_name || 'N/A'}</td>
                    <td>${need.public_user_name || 'N/A'}</td>
                </tr>
            `).join('');
            document.getElementById('needsList').innerHTML = needsList;
        } else {
            alert('Unexpected response format');
        }
    })
    .catch(error => {
        alert('Error: ' + error);
    });
}

// Redirect to the profile page
document.getElementById('profileButton').addEventListener('click', function() {
    window.location.href = '/camp-assistant-profile';
});

// Handle logout
document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = '/user-login';
});

// Handle home button
document.getElementById('homeButton').addEventListener('click', function() {
    window.location.href = '/';
});

// Load needs on page load
loadNeeds();
