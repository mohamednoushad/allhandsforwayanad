document.addEventListener('DOMContentLoaded', () => {
    // Check if the user is logged in and is an admin
    if (!localStorage.getItem('token')) {
        window.location.href = '/admin-login';
        return;
    }

    fetch('/auth/profile', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.role !== 'admin') {
            alert('Access Denied: Only admins can access this page.');
            window.location.href = '/admin-login';
        }
    })
    .catch(error => {
        alert('Error: ' + error);
        window.location.href = '/admin-login';
    });

    // Load camps and collection points on page load
    loadCampOptions();
    loadCollectionPointOptions();

    // Show/hide camp or collection point selection based on role
    document.getElementById('role').addEventListener('change', function() {
        const role = this.value;
        if (role === 'camp_assistant') {
            document.getElementById('campSelection').style.display = 'block';
            document.getElementById('collectionPointSelection').style.display = 'none';
        } else if (role === 'collection_agent') {
            document.getElementById('campSelection').style.display = 'none';
            document.getElementById('collectionPointSelection').style.display = 'block';
        } else {
            document.getElementById('campSelection').style.display = 'none';
            document.getElementById('collectionPointSelection').style.display = 'none';
        }
    });

    // Submit the form to create a new user
    document.getElementById('onboardForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const userData = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            name: document.getElementById('name').value,
            mobile_number: document.getElementById('mobile_number').value,
            role: document.getElementById('role').value,
            camp_id: document.getElementById('role').value === 'camp_assistant' ? document.getElementById('camp_id').value : null,
            collection_point_id: document.getElementById('role').value === 'collection_agent' ? document.getElementById('collection_point_id').value : null
        };

        fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            // Optionally clear the form or provide feedback to the admin
        })
        .catch(error => {
            alert('Error: ' + error);
        });
    });

    // Function to load camps for selection
    function loadCampOptions() {
        fetch('/api/camps', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            const campOptions = data.map(camp => `
                <option value="${camp.id}">${camp.name}</option>
            `).join('');
            document.getElementById('camp_id').innerHTML = campOptions;
        })
        .catch(error => {
            alert('Error: ' + error);
        });
    }

    // Function to load collection points for selection
    function loadCollectionPointOptions() {
        fetch('/api/collection_points', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            const collectionPointOptions = data.map(point => `
                <option value="${point.id}">${point.name}</option>
            `).join('');
            document.getElementById('collection_point_id').innerHTML = collectionPointOptions;
        })
        .catch(error => {
            alert('Error: ' + error);
        });
    }

    // Submit the form to add a new camp
    document.getElementById('campForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const campData = {
            name: document.getElementById('campName').value,
            address: document.getElementById('campAddress').value,
            district: document.getElementById('campDistrict').value,
            state: document.getElementById('campState').value,
            latitude: document.getElementById('campLatitude').value,
            longitude: document.getElementById('campLongitude').value
        };

        fetch('/api/camps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(campData)
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            loadCampOptions(); // Reload camp options to include the new camp
        })
        .catch(error => {
            alert('Error: ' + error);
        });
    });

    // Submit the form to add a new collection point
    document.getElementById('collectionPointForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const collectionPointData = {
            name: document.getElementById('collectionPointName').value,
            address: document.getElementById('collectionPointAddress').value,
            district: document.getElementById('collectionPointDistrict').value,
            state: document.getElementById('collectionPointState').value,
            latitude: document.getElementById('collectionPointLatitude').value,
            longitude: document.getElementById('collectionPointLongitude').value
        };

        fetch('/api/collection_points', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(collectionPointData)
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            loadCollectionPointOptions(); // Reload collection point options to include the new collection point
        })
        .catch(error => {
            alert('Error: ' + error);
        });
    });

    // Handle logout
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '/admin-login';
    });

    // Handle home button
    document.getElementById('homeButton').addEventListener('click', () => {
        window.location.href = '/';
    });
});
