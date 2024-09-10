/* Filename: live_form_validation.js */

import { EMAIL_REGEX, PHONE_REGEX } from './config.js';
import { setError, setSuccess } from './input_field_setters.js';


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

    if (firstNameValue === '') {
        setError(firstNameElement, 'First name is required');
        return false;
    } else if (!firstNameValue.match(/^[a-zA-Z]+$/)) {
        setError(firstNameElement, 'Only characters allowed');
        return false;
    } else if (firstNameValue.length < 2) {
        setError(firstNameElement, 'At least 2 characters');
        return false;
    } else {
        setSuccess(firstNameElement);
        return true;
    }

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

    if (lastNameValue === '') {
        setError(lastNameElement, 'Last name is required');
        return false;
    } else if (!lastNameValue.match(/^[a-zA-Z]+$/)) {
        setError(lastNameElement, 'Only characters allowed');
        return false;
    } else if (lastNameValue.length < 2) {
        setError(lastNameElement, 'At least 2 characters');
        return false;
    } else {
        setSuccess(lastNameElement);
        return true;
    }

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

    if (emailValue === '') {
        setError(emailElement, 'Email is required');
        return false;
    } else if (!EMAIL_REGEX.test(String(emailValue).toLowerCase())) {
        setError(emailElement, 'Provide a valid email address');
        return false;
    } else {
        setSuccess(emailElement);
        return true;
    }

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

    if (passwordValue === '') {
        setError(passwordElement, 'Password is required');
        return false;
    } else if (passwordValue.length < 8) {
        setError(passwordElement, 'Password must be at least 8 characters');
        return false;
    } else {
        setSuccess(passwordElement);
        return true;
    }

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

    if (passwordVerificationValue === '') {
        setError(passwordVerificationElement, 'Password is required');
        return false;
    } else if (passwordVerificationValue.length < 8) {
        setError(passwordVerificationElement, 'Password must be at least 8 characters');
        return false;
    } else if (passwordVerificationValue !== passwordValue) {
        setError(passwordVerificationElement, 'Passwords do not match');
        return false;
    } else {
        setSuccess(passwordVerificationElement);
        return true;
    }

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

    if (phoneNumberValue === '') {
        setError(phoneNumberElement, 'Phone number is required');
        return false;
    } else if (!PHONE_REGEX.test(phoneNumberValue)) {
        setError(phoneNumberElement, 'Only digits allowed');
        return false;
    } else if (phoneNumberValue.length !== 10) {
        setError(phoneNumberElement, 'Phone number must have exactly 10 digits');
        return false;
    } else {
        setSuccess(phoneNumberElement);
        return true;
    }

}

// Expose validation functions to the global scope
window.validateFirstName = validateFirstName;
window.validateLastName = validateLastName;

window.validateEmail = validateEmail;
window.validatePassword = validatePassword;
window.validatePasswordVerification = validatePasswordVerification;

window.validatePhoneNumber = validatePhoneNumber;
