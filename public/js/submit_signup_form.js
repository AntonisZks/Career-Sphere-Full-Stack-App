import { setError } from './input_field_setters.js';
import { isFirstNameValid, isLastNameValid, isPhoneNumberValid } from './form_validators.js';
import { isEmailValid, isPasswordValid, isPasswordVerificationValid } from './form_validators.js';
import { isGenderValid } from './form_validators.js';


// Wait for the DOM to load before executing the following script
document.addEventListener('DOMContentLoaded', function () {

  // Receive the signup form of the application and add the submit event listener
  // to it to handle the submit procedure
  document.getElementById('signupForm').addEventListener('submit', async function (event) {

    // First prevent the default action of the form submition
    event.preventDefault();
    let validData = true;

    // Receive the form data HTML elements. These elements are all input fields
    const firstNameElement = document.getElementById('firstNameInput');
    const lastNameElement = document.getElementById('lastNameInput');  
    const emailElement = document.getElementById('emailInput');
    const passwordElement = document.getElementById('passwordInput');
    const passwordVerificationElement = document.getElementById('passwordVerificationInput');
    const phoneNumberElement = document.getElementById('phoneInput');
    const maleGenderElement = document.getElementById('maleInput');
    const femaleGenderElement = document.getElementById('femaleInput');
    

    // Validate the first and last name and if any data is not valid set an error to the 
    // corresponding input field
    const firstNameValidationResult = isFirstNameValid(firstNameElement.value.trim());
    if (!firstNameValidationResult.isValid) {
      setError(firstNameElement, firstNameValidationResult.errorMessage);
      validData = false;
    }

    const lastNameValidationResult = isLastNameValid(lastNameElement.value.trim());
    if (!lastNameValidationResult.isValid) {
      setError(lastNameElement, lastNameValidationResult.errorMessage);
      validData = false;
    }

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

    const passwordVerificationValidationResult = isPasswordVerificationValid(
      passwordElement.value.trim(), 
      passwordVerificationElement.value.trim()
    );

    if (!passwordVerificationValidationResult.isValid) {
      
      setError(passwordVerificationElement, passwordVerificationValidationResult.errorMessage);
      validData = false;
    }

    // Validate the phone number and if any data is not valid set an error to the corresponding 
    // input field
    const phoneNumberResult = isPhoneNumberValid(phoneNumberElement.value.trim());
    if (!phoneNumberResult.isValid) {
      setError(phoneNumberElement, phoneNumberResult.errorMessage);
      validData = false;
    }

    const genderResult = isGenderValid(maleGenderElement, femaleGenderElement);
    if (!genderResult.isValid) {
      const genderSelectionContainer = document.getElementById("radioInputFieldContainer");
      const errorDisplay = genderSelectionContainer.querySelector('.error-message');

      errorDisplay.innerText = genderResult.errorMessage;
      genderSelectionContainer.classList.add('error');

      validData = false;
    }

    // If any data is not valid stop here and return
    if (!validData) { return; }

    // Otherwise continue with the submit process. At this point all the data are valid,
    // so we can send the data to the backend of the application
    const formData = {
      firstName: firstNameElement.value.trim(),
      lastName: lastNameElement.value.trim(),
      email: emailElement.value.trim(),
      password: passwordElement.value.trim(),
      passwordVerification: passwordVerificationElement.value.trim(),
      phoneNumber: phoneNumberElement.value.trim(),
      gender: (maleGenderElement.checked) ? 'male' : 'female'
    };

    try {

      // Try sending the data to the backend and get the server response using Fetch API
      const response = await fetch('/api/create_account', {
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
