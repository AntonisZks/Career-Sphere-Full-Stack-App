/* Filename: live_form_validation.js */

import { PHONE_REGEX } from './config.js';
import { setError, setSuccess } from './input_field_setters.js';
import { isFirstNameValid, isLastNameValid } from './form_validators.js';
import { isEmailValid, isPasswordValid, isPasswordVerificationValid } from './form_validators.js';
import { isPhoneNumberValid } from './form_validators.js';



function setResults(results, element) {

    if (!results.isValid) {
        setError(element, results.errorMessage);
        return false;
    }
    else {
        setSuccess(element);
        return true;
    }

}


/**
 * Validates the first name field. Checks for required input, valid characters, 
 * and minimum length.
 * 
 * @returns {boolean} True if validation passes, otherwise false.
 * 
 * @AntonisZks
 */
function validateFirstName() {

    const firstNameElement = document.getElementById("firstNameInput");
    const firstNameValue = firstNameElement.value.trim();

    setResults(isFirstNameValid(firstNameValue), firstNameElement);

}

/**
 * Validates the last name field. Checks for required input, valid characters, 
 * and minimum length.
 * 
 * @returns {boolean} True if validation passes, otherwise false.
 * 
 * @AntonisZks
 */
function validateLastName() {

    const lastNameElement = document.getElementById("lastNameInput");
    const lastNameValue = lastNameElement.value.trim();

    setResults(isLastNameValid(lastNameValue), lastNameElement);

}

/**
 * Validates the email field. Checks for required input 
 * and a valid email format.
 * 
 * @returns {boolean} True if validation passes, otherwise false.
 * 
 * @AntonisZks
 */
function validateEmail() {

    const emailElement = document.getElementById("emailInput");
    const emailValue = emailElement.value.trim();

    setResults(isEmailValid(emailValue), emailElement);

}

/**
 * Validates the password field. Checks for required input 
 * and minimum length.
 * 
 * @returns {boolean} True if validation passes, otherwise false.
 * 
 * @AntonisZks
 */
function validatePassword() {

    const passwordElement = document.getElementById("passwordInput");
    const passwordValue = passwordElement.value.trim();

    setResults(isPasswordValid(passwordValue), passwordElement);

}

/**
 * Validates the password verification field. Checks for required input, minimum length, 
 * and matching passwords.
 * 
 * @returns {boolean} True if validation passes, otherwise false.
 * 
 * @AntonisZks
 */
function validatePasswordVerification() {

    const passwordElement = document.getElementById("passwordInput");
    const passwordVerificationElement = document.getElementById("passwordVerificationInput");
    const passwordValue = passwordElement.value.trim();
    const passwordVerificationValue = passwordVerificationElement.value.trim();

    setResults(isPasswordVerificationValid(passwordValue, passwordVerificationValue), passwordVerificationElement);

}

/**
 * Validates the phone number field. Checks for required input, valid digits, 
 * and exact length.
 * 
 * @returns {boolean} True if validation passes, otherwise false.
 * 
 * @AntonisZks
 */
function validatePhoneNumber() {

    const phoneNumberElement = document.getElementById("phoneInput");
    const phoneNumberValue = phoneNumberElement.value.trim();

    setResults(isPhoneNumberValid(phoneNumberValue), phoneNumberElement);

}

// Expose validation functions to the global scope
window.validateFirstName = validateFirstName;
window.validateLastName = validateLastName;

window.validateEmail = validateEmail;
window.validatePassword = validatePassword;
window.validatePasswordVerification = validatePasswordVerification;

window.validatePhoneNumber = validatePhoneNumber;
