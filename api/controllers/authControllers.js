const bcrypt = require('bcrypt');
const { getUserByEmail, userExistsWithEmail, insertDataIntoDatabase } = require("../models/user");


/**
 * Renders the Log In HTML page with the additional data if needed. Specifically it selects all the 
 * form data and rendfers the page with those data too. Addiotionally it receives an error message
 * if any error has occured and renders this error too.
 * 
 * @param {any} request the HTTP request 
 * @param {any} response the HTTP response
 * 
 * @AntonisZks
 * @since 1.0.0
 * @date 09/09/2024
 */
exports.renderLogInPage = async function (request, response) {

  // Receive the form data and the error message using session middleware
  const formData = request.session.formData || {};
  const error = request.session.error || '';

  // Clear the session data after rendering
  request.session.formData = null;
  request.session.error = null;

  // Render the disired HTML code with the appropriate data
  response.render('login', {
    email: formData.email || '',
    password: formData.password || '',
    error: error
  });

};


exports.renderSignUpPage = async function (request, response) { 

  // Receive the form data and the error message using session middleware
  const formData = request.session.formData || {};
  const error = request.session.error || ''; 

  // Clear the session data after rendering
  request.session.formData = null;
  request.session.error = null;

  // Render the disired HTML code with the appropriate data
  response.render('signup', {
    firstName: formData.firstName || '',
    lastName: formData.lastName || '',
    email: formData.email || '',
    password: formData.password || '',
    passwordVerification: formData.passwordVerification || '',
    phoneNumber: formData.phoneNumber || '',
    error: error
  });

};


/**
 * Receives the data of the sign up form, filled by the user and inserts them inside the database,
 * after a small data handle process. Specifically it checks whether there is an account dedicated to
 * the given email address, and ecrypts the user password in order to keep safety.
 * 
 * @param {any} request the HTTP request 
 * @param {any} response the HTTP response
 * 
 * @AntonisZks
 * @since 1.0.0
 * @date 09/09/2024
 */
exports.createNewAccount = async function (request, response) {
  
  // Receive and collect the rest of the user data from the registration form 
  // which is the body of the http request
  const userRegistrationData = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    password: request.body.password,
    passwordVerification: request.body.passwordVerification,
    phoneNumber: request.body.phoneNumber,
    gender: 'male'
  }
  
  // Check whether the email already exists or not. If not redirect to the sign up page with an error message
  if (await userExistsWithEmail(userRegistrationData.email)) {
    request.session.formData = { ...userRegistrationData };
    request.session.error = 'Email address is already in use'

    return response.redirect('/signup');
  }

  // Encrypt the user password to keep safety and if there is no error 
  // insert the new data to the database
  try {

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userRegistrationData.password, saltRounds);
    userRegistrationData.password = hashedPassword;

  } catch (error) {
    console.error('Error hashing password: ', error);
  }

  // Insert the data into the database and redirect to the home page of the new user
  const newUserID = await insertDataIntoDatabase(userRegistrationData);
  return response.redirect(`/home/${newUserID}`);

};


/**
 * Receives the data of the log in form, filled by the user and checks whether there is an account inside
 * the database dedicated to those data. If this is the case it checks whether the password matches with the
 * one inside the database and it redirects the user to its home page.
 * 
 * @param {any} request the HTTP request 
 * @param {any} response the HTTP response
 * 
 * @AntonisZks
 * @since 1.0.0
 * @date 09/09/2024
 */
exports.connectToAccount = async function (request, response) {

  let isMatch = false;

  // Receive the user data from the login form, and the fetch the user corresponding
  // to the given email address from the database
  const email = request.body.email;
  const password = request.body.password;
  const user = await getUserByEmail(email);

  // First check if there is a user with the corresponding email inside the database. If not redirect to 
  // the login page with an error message and the filled form data
  if (user == null) {
    request.session.formData = { email, password };
    request.session.error = "Email address does not exist";

    return response.redirect(`/login`);
  }

  // Then check if the given password matches the password of the account found inside the database, 
  // according to the email address. If not redirect to the login page 
  try {

    isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      request.session.formData = { email, password };
      request.session.error = "Incorrect password";

      return response.redirect(`/login`);
    }
    else {
      // Otherwise redirect to the home page of the logged in user
      return response.redirect(`/home/${user.user_id}`);
    }

  } catch (error) {
    console.error("Error verifying password: ", error);
  }

}
