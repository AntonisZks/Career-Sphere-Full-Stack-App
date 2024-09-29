import { EMAIL_REGEX, PHONE_REGEX } from './config.js';


/**
 * Validates the first name field. Checks for required input, valid characters, 
 * and minimum length.
 * 
 * @returns {boolean} True if validation passes, otherwise false.
 * 
 * @author AntonisZks
 */
export function isFirstNameValid(firstNameValue) {

  if (firstNameValue === '') {
    return { isValid: false, errorMessage: "First name is required" };
  }
  else if (!firstNameValue.match(/^[a-zA-Z]+$/)) {
    return { isValid: false, errorMessage: "Only characters allowed" };
  }
  else if (firstNameValue.length < 2) {
    return { isValid: false, errorMessage: "At least 2 characters" };
  }
  else {
    return { isValid: true };
  }

}

/**
 * Validates the last name field. Checks for required input, valid characters, 
 * and minimum length.
 * 
 * @returns {boolean} True if validation passes, otherwise false.
 * 
 * @author AntonisZks
 */
export function isLastNameValid(lastNameValue) {

  if (lastNameValue === '') {
    return { isValid: false, errorMessage: "Last name is required" };
  }
  else if (!lastNameValue.match(/^[a-zA-Z]+$/)) {
    return { isValid: false, errorMessage: "Only characters allowed" };
  }
  else if (lastNameValue.length < 2) {
    return { isValid: false, errorMessage: "At least 2 characters" };
  }
  else {
    return { isValid: true };
  }

}

/**
 * Validates the email field. Checks for required input 
 * and a valid email format.
 * 
 * @returns {boolean} True if validation passes, otherwise false.
 * 
 * @author AntonisZks
 */
export function isEmailValid(emailValue) {

  if (emailValue === '') {
    return { isValid: false, errorMessage: "Email is required" };
  }
  else if (!EMAIL_REGEX.test(String(emailValue).toLowerCase())) {
    return { isValid: false, errorMessage: "Provide a valid email address" };
  }
  else {
    return { isValid: true };
  }

}


/**
 * Validates the password field. Checks for required input 
 * and minimum length.
 * 
 * @returns {boolean} True if validation passes, otherwise false.
 * 
 * @author AntonisZks
 */
export function isPasswordValid(passwordValue) {

  if (passwordValue === '') {
    return { isValid: false, errorMessage: "Password is required" };
  }
  else if (passwordValue.length < 8) {
    return { isValid: false, errorMessage: "Password must be at least 8 characters" };
  }
  else {
    return { isValid: true };
  }

}

/**
 * Validates the password verification field. Checks for required input, minimum length, 
 * and matching passwords.
 * 
 * @returns {boolean} True if validation passes, otherwise false.
 * 
 * @author AntonisZks
 */
export function isPasswordVerificationValid(passwordValue, passwordVerificationValue) {

  if (passwordVerificationValue === '') {
    return { isValid: false, errorMessage: "Password is required" };
  }
  else if (passwordVerificationValue.length < 8) {
    return { isValid: false, errorMessage: "Password must be at least 8 characters" };
  }
  else if (passwordVerificationValue !== passwordValue) {
    return { isValid: false, errorMessage: "Passwords do not match" };
  }
  else {
    return { isValid: true };
  }

}

/**
 * Validates the phone number field. Checks for required input, valid digits, 
 * and exact length.
 * 
 * @returns {boolean} True if validation passes, otherwise false.
 * 
 * @author AntonisZks
 */
export function isPhoneNumberValid(phoneNumberValue) {

  if (phoneNumberValue === '') {
    return { isValid: false, errorMessage: "Phone number is required" };
  }
  else if (!PHONE_REGEX.test(phoneNumberValue)) {
    return { isValid: false, errorMessage: "Only digits allowed" };
  }
  else if (phoneNumberValue.length !== 10) {
    return { isValid: false, errorMessage: "Phone number must have exactly 10 digits" };
  }
  else {
    return { isValid: true };
  }

}

/**
 * Validates the gender radio field. Checks if any of the two radio buttons
 * has been selected.
 * 
 * @returns {boolean} True if validation passes, otherwise false.
 * 
 * @author AntonisZks
 */
export function isGenderValid(maleGenderElement, femaleGenderElement) {

  if (maleGenderElement.checked || femaleGenderElement.checked) {
    return { isValid: true };
  }
  else {
    return { isValid: false, errorMessage: "Gender is required" };
  }

}