let campId = null; // Global variable to store camp ID

// Check if the user is logged in
if (!localStorage.getItem('token')) {
    window.location.href = '/user-login';
}

// Function to fetch and display user profile details
function loadProfile() {
    fetch('/auth/profile', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        const location = data.location;
        campId = data.role === 'camp_assistant' ? data.location.id : null; // Store camp ID if user is a camp assistant
        const profileDetails = `
            <p>Name: ${data.name}</p>
            <p>Username: ${data.username}</p>
            <p>Mobile Number: ${data.mobile_number}</p>
            <p>Role: ${data.role}</p>
            <p>Location Name: ${location.name || 'N/A'}</p>
            <p>Address: ${location.address || 'N/A'}</p>
            <p>District: ${location.district || 'N/A'}</p>
            <p>State: ${location.state || 'N/A'}</p>
            <p>Latitude: ${location.latitude !== null ? location.latitude : 'N/A'}</p>
            <p>Longitude: ${location.longitude !== null ? location.longitude : 'N/A'}</p>
        `;
        document.getElementById('profileDetails').innerHTML = profileDetails;
    })
    .catch(error => {
        alert('Error: ' + error);
    });
}

// Function to handle logout
document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = '/user-login';
});

// Function to handle adding a need
document.getElementById('needsForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (!campId) {
        alert('Camp ID is missing. Please reload the page.');
        return;
    }

    const needData = {
        camp_id: campId,
        item: document.getElementById('item').value,
        quantity: document.getElementById('quantity').value
    };

    fetch('/api/needs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(needData)
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        // Optionally clear the form or provide feedback to the user
    })
    .catch(error => {
        alert('Error: ' + error);
    });
});

// Redirect to the needs page
document.getElementById('viewNeedsButton').addEventListener('click', function() {
    window.location.href = '/camp-assistant-needs';
});

// Handle home button
document.getElementById('homeButton').addEventListener('click', function() {
    window.location.href = '/';
});

// Load profile details on page load
loadProfile();
