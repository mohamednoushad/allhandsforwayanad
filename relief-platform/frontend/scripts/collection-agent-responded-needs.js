// Check if the user is logged in
if (!localStorage.getItem('token')) {
    window.location.href = '/user-login';
}

// Function to load needs responded to by the collection agent
function loadRespondedNeeds() {
    fetch('/api/needs/responded', {
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
                    <td>${need.camp_name}</td>
                    <td>${need.camp_district}</td>
                    <td>${need.camp_state}</td>
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
    window.location.href = '/collection-agent-profile';
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

// Load responded needs on page load
loadRespondedNeeds();
