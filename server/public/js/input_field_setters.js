/* Filename: input_field_setters.js */

/**
 * Sets an error indication for a specific HTML element. Changes border color to red and
 * displays a custom error message.
 * 
 * @param {HTMLElement} element The HTML element (usually an input field).
 * @param {String} message The error message to display.
 * 
 * @author AntonisZks
 */
export function setError(element, message) {
   
   const inputField = element.parentElement;
   const errorDisplay = inputField.querySelector('.error-message');

   // Display error message and update styles
   errorDisplay.innerText = message;
   inputField.classList.add('error');
   inputField.classList.remove('success');

   // Hide success symbol, show error symbol
   const successSymbolElement = element.nextElementSibling;
   const errorSymbolElement = element.nextElementSibling.nextElementSibling;

   successSymbolElement.style.visibility = 'hidden';
   errorSymbolElement.style.visibility = 'visible';

}

/**
 * Sets a success indication for a specific HTML element. Changes border color to green
 * and updates symbol visibility.
 * 
 * @param {HTMLElement} element The HTML element (usually an input field).
 * 
 * @author AntonisZks 
 */
export function setSuccess(element) {

   const inputField = element.parentElement;
   const errorDisplay = inputField.querySelector('.error-message');

   // Clear error message and update styles
   errorDisplay.innerText = '';
   inputField.classList.add('success');
   inputField.classList.remove('error');

   // Show success symbol, hide error symbol
   const successSymbolElement = element.nextElementSibling;
   const errorSymbolElement = element.nextElementSibling.nextElementSibling;

   successSymbolElement.style.visibility = 'visible';
   errorSymbolElement.style.visibility = 'hidden';

}
