// Function to load needs forwarded to the public
function loadPublicNeeds() {
    fetch('/api/needs/public', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        const needsList = data.map(need => `
            <div>
                <p>Item: ${need.item}</p>
                <p>Quantity: ${need.quantity}</p>
                <button onclick="fulfillNeed(${need.id})">Click to Fulfill</button>
            </div>
        `).join('');
        document.getElementById('publicNeedsList').innerHTML = needsList;
    })
    .catch(error => {
        alert('Error: ' + error);
    });
}

// Function to fulfill a need by a public user
function fulfillNeed(needId) {
    const name = prompt('Enter your name:');
    const mobile_number = prompt('Enter your mobile number:');
    const details = prompt('Enter any additional details:');

    if (name && mobile_number) {
        const publicUserData = {
            name,
            mobile_number,
            details
        };

        fetch('/api/public-users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(publicUserData)
        })
        .then(response => response.json())
        .then(data => {
            const publicUserId = data.id;

            const updateData = {
                status: 'fulfilled_by_public',
                collection_center_id: null,
                public_user_id: publicUserId
            };

            fetch(`/api/needs/${needId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
                loadPublicNeeds(); // Reload public needs list after updating status
            })
            .catch(error => {
                alert('Error: ' + error);
            });
        })
        .catch(error => {
            alert('Error: ' + error);
        });
    } else {
        alert('Name and mobile number are required to fulfill the need.');
    }
}

// Load public needs on page load
loadPublicNeeds();
