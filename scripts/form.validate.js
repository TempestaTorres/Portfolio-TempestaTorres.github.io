
function validateForm(form) {
    'use strict';

    // Regular expression for email validation as per HTML specification
    const emailRegExp = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d-]+(?:\.[a-z\d-]+)*$/i;
    const inputs = form.querySelectorAll('input');
    const textarea = form.querySelector('textarea');
    const button = form.querySelector('button');

    const setButtonTitle = (title) => { button.firstElementChild.lastElementChild.textContent = title; };

    // Check if the name is valid
    const isValidName = (name) => {
        return name.value.length > 1;
    };
    const handleInputName = (target) => {

         if (isValidName(target)) {
             target.nextElementSibling.textContent = '';
         }
         else {
             target.nextElementSibling.textContent = 'Name must be at least 2 characters';
         }
    };
    // Check if the subject is valid
    const isValidSubject = (subject) => {
        return subject.value.length > 2;
    };
    const handleInputSubject = (target) => {

         if (isValidSubject(target)) {
             target.nextElementSibling.textContent = '';
         }
         else {
             target.nextElementSibling.textContent = 'Subject must be at least 3 characters';
         }
    };
    // Check if the email is valid
    const isValidEmail = (target) => {
        return target.value.length !== 0 && emailRegExp.test(target.value);
    };
    const handleInputEmail = (target) => {

         if (isValidEmail(target)) {
             target.nextElementSibling.textContent = '';
         }
         else {
             target.nextElementSibling.textContent = 'Please enter a valid email address';
         }
    };

    const handleInput = (event) => {

        setButtonTitle('Send Message');

        switch (event.target.name) {
            case 'email':
                handleInputEmail(event.target);
                break;
            case 'name':
                handleInputName(event.target);
                break;
            case 'subject':
                handleInputSubject(event.target);
                break;
        }
    };
    // Check if the message is valid
    const isValidMessage = (target) => {
        return target.value.length > 9;
    };
    const textareaInput = (event) => {

        if (isValidMessage(event.target)) {
            event.target.nextElementSibling.textContent = '';
        }
        else {
            event.target.nextElementSibling.textContent = 'Message must be at least 10 characters';
        }

    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        if (form.checkValidity()) {
            // Get message
            // Get form field values

            setButtonTitle('Sending....');
            // Send message


            setTimeout(() => {
                setButtonTitle('Your message send successfully!');
                form.reset();
            }, 2000);

        }
    };
    // Form Entry point
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];

        input.addEventListener("input", handleInput);
    }
    textarea.addEventListener("input", textareaInput);
    form.addEventListener("submit", handleSubmit);
}