const { db_pool } = require("../../config/db_config");
const { getUserByEmail, insertDataIntoDatabase } = require("../models/user");
const bcrypt = require('bcrypt');

exports.createNewAccount = async function (request, response) {

  // Receive the email of the user entered and check whether the email already exists or not
  const email = request.body.email;
  if (getUserByEmail(email) !== null) {
    console.log("Email already exists");
  }

  // Receive the rest of the user data from the registration form which is the body of the request
  const firstName = request.body.firstName;
  const lastName = request.body.lastName;
  const password = request.body.password;
  const passwordVerification = request.body.passwordVerification;
  const phoneNumber = request.body.phoneNumber;

  // Encrypt the user password to keep safety
  let hashedPassword = '';
  try {
    const saltRounds = 10;
    hashedPassword = await bcrypt.hash(password, saltRounds);
  } 
  catch (error) {
    console.error('Error hashing password: ', error);
  }

  // Collect all the data of the user
  const userRegistrationData = {
    firstName: firstName, 
    lastName: lastName,
    email: email, 
    password: hashedPassword,
    phoneNumber: phoneNumber,
    gender: 'male'
  };

  // Insert the data into the database
  insertDataIntoDatabase(userRegistrationData);

  response.redirect('/signup');

};
