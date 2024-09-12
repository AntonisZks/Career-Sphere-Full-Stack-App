import { setError } from './input_field_setters.js';
import { isEmailValid, isPasswordValid } from './form_validators.js';


// Wait for the DOM to load before executing the following script
document.addEventListener('DOMContentLoaded', function () {

  // Receive the login form of the application and add the submit event listener
  // to it to handle the submit procedure
  document.getElementById('loginForm').addEventListener('submit', async function (event) {

    // First prevent the default action of the form submition
    event.preventDefault();
    let validData = true;

    // Receive the email and the password HTML elements. These elements are both input fields
    const emailElement = document.getElementById('emailInput');
    const passwordElement = document.getElementById('passwordInput');

    // Validate the email address and the password and if any data is not valid set an 
    // error to the corresponding input field
    const emailValidationResult = isEmailValid(emailElement.value.trim());
    if (!emailValidationResult.isValid) {
      setError(emailElement, emailValidationResult.errorMessage);
      validData = false;
    }

    const passwordValidationResult = isPasswordValid(passwordElement.value.trim());
    if (!passwordValidationResult.isValid) {
      setError(passwordElement, passwordValidationResult.errorMessage);
      validData = false;
    }

    // If any data is not valid stop here and return
    if (!validData) { return; }

    // Otherwise continue with the submit process. At this point all the data are valid,
    // so we can send the data to the backend of the application
    const formData = {
      email: emailElement.value.trim(),
      password: passwordElement.value.trim()
    };

    try {

      // Try sending the data to the backend and get the server response using Fetch API
      const response = await fetch('/api/connect_to_account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      // If we received a successfull response, redirect to the home page of the desired user
      if (response.ok) {
        const result = await response.json();
        window.location.href = `/home/${result.userID}`;
      }
      // Otherwise reload the page with some additional error messages
      else {
        window.location.reload();
      }

    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form');
    }

  });

});
