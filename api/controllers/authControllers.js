const { db_pool } = require("../../config/db_config");
const { getUserByEmail, userExistsWithEmail, insertDataIntoDatabase } = require("../models/user");
const bcrypt = require('bcrypt');

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

  // Receive the email of the user entered and check whether the email already exists or not. If not
  // redirect to the sign up page with an error message
  const email = request.body.email;
  if (await userExistsWithEmail(email)) {
    return response.redirect('/signup?error=Email is already in use');
  }

  // Receive and collect the rest of the user data from the registration form 
  // which is the body of the http request
  const userRegistrationData = {
    firstName : request.body.firstName,
    lastName : request.body.lastName,
    email : request.body.email,
    password : request.body.password,
    phoneNumber : request.body.phoneNumber,
    gender : 'male'
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
exports.connectToAccount = async function(request, response) {
  
  let isMatch = false;

  // Receive the user data from the login form, and the fetch the user corresponding
  // to the given email address from the database
  const email = request.body.email;
  const password = request.body.password;
  const user = await getUserByEmail(email);

  // First check if there is a user with the corresponding email inside the database. If not redirect to 
  // the login page with an error message
  if (user == null) {
    return response.redirect('/login?error=Email does not exist');
  }

  // Then check if the given password matches the password of the account found inside the database, 
  // according to the email address. If not redirect to the login page
  try {

    isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
      return response.redirect('/login?error=Incorrect password');
    }
    else {
      // Otherwise redirect to the home page of the logged in user
      return response.redirect(`/home/${user.user_id}`);
    }
  
  } catch (error) {
    console.error("Error verifying password: ", error);
  }

}
