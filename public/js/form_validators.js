import { EMAIL_REGEX, PHONE_REGEX } from './config.js';

/**
 * Validates the email field. Checks for required input 
 * and a valid email format.
 * 
 * @returns {boolean} True if validation passes, otherwise false.
 * 
 * @AntonisZks
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
 * @AntonisZks
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