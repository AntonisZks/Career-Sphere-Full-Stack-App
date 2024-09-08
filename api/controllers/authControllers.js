const { db_pool } = require("../../config/db_config");
const { insertDataIntoDatabase } = require("../models/user");

exports.createNewAccount = async function (request, response) {

  // Receive all the user data from the registration form which is the body of the request
  const firstName = request.body.firstName;
  const lastName = request.body.lastName;

  const email = request.body.email;
  const password = request.body.password;
  const passwordVerification = request.body.passwordVerification;

  const phoneNumber = request.body.phoneNumber;

  // Collect all the data of the user
  const userData = {
    firstName: firstName, 
    lastName: lastName,
    email: email, 
    password: password,
    phoneNumber: phoneNumber,
    gender: 'male'
  };

  // Insert the data into the database
  insertDataIntoDatabase(userData);

  response.redirect('/signup');

  // Validate the data and check for any error occuring


  // Receive all the emails in the database and check if there is a user with the given email
  // const sqlEmailsQuery = "SELECT email FROM users WHERE email = ?";
  // db_pool.query(sqlEmailsQuery, [email], (error, results) => {
  //   if (error) {
  //     return response.status(500).send("Error creating account");
  //   }

  //   if (results.length > 0) {
  //     return response.send("Email Address already exists");
  //   }

  //   response.redirect("/home");
  // });

};
