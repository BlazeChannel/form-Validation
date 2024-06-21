document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('theForm');
    const showStatus = document.getElementById('status');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        showStatus.innerHTML = '';

        const firstName = document.getElementById('firstName').value.trim();
        const email = document.getElementById('emailAddress').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!firstName || !email || !message) {
            showStatus.textContent = 'Please fill out all required fields.';
            showStatus.className = 'error';
            return;
        }

        const data = {
            firstName: firstName,
            lastName: document.getElementById('lastName').value,
            company: document.getElementById('companyName').value,
            email: email,
            phone: document.getElementById('phoneNumber').value,
            message: message
        };

        showStatus.textContent = 'Submitting...';
        showStatus.className = '';

        fetch('https://667186bce083e62ee43bf63b.mockapi.io/api/v1/contact-us', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            showStatus.textContent = 'Thank you for your message. We will get back to you shortly.';
            showStatus.className = 'success';
            form.reset(); 

            setTimeout(() => {
                showStatus.textContent = '';
                showStatus.className = '';
            }, 2000);
        })
        .catch(error => {
            showStatus.textContent = 'There was a problem submitting your message. Please try again later.';
            showStatus.className = 'error';
        });
    });
});
