// This file contains JavaScript code for interactive elements on the website.

document.addEventListener('DOMContentLoaded', function() {
    // Welcome message in console instead of intrusive alert
    console.log('Welcome to My Static Website!');

    // Form validation for the contact page
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            if (!name || !email) {
                event.preventDefault();
                alert('Please fill in all fields.');
            } else {
                alert('Thank you for your submission, ' + name + '!');
            }
        });
    }
});