let collectionPointId = null; // Global variable to store collection point ID

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
        collectionPointId = data.role === 'collection_agent' ? data.location.id : null; // Store collection point ID if user is a collection agent
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
        loadNeeds(); // Load needs after profile is loaded
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

// Function to load needs for the collection agent to respond to
function loadNeeds() {
    fetch('/api/needs/unfulfilled', {
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
                    <td>${need.camp_name}</td>
                    <td>${need.camp_district}</td>
                    <td>${need.camp_state}</td>
                    <td>
                        <button onclick="respondToNeed(${need.id})">Respond</button>
                        <button onclick="forwardToPublic(${need.id})">Forward to Public</button>
                    </td>
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

// Function to respond to a need
function respondToNeed(needId) {
    fetch(`/api/needs/respond/${needId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ collection_point_id: collectionPointId })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        loadNeeds(); // Reload needs after responding
    })
    .catch(error => {
        alert('Error: ' + error);
    });
}

// Function to forward a need to the public
function forwardToPublic(needId) {
    fetch(`/api/needs/forward/${needId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        loadNeeds(); // Reload needs after forwarding
    })
    .catch(error => {
        alert('Error: ' + error);
    });
}

// Redirect to the responded needs page
document.getElementById('viewRespondedNeedsButton').addEventListener('click', function() {
    window.location.href = '/collection-agent-responded-needs';
});

// Handle home button
document.getElementById('homeButton').addEventListener('click', function() {
    window.location.href = '/';
});

// Load profile details on page load
loadProfile();
