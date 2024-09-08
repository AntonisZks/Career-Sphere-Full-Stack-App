const { db_pool, executeQuery } = require("../../config/db_config");

async function getUserByID(userID) {

  // Receive the user with the corresponding id passed at the url
  const sqlQuery = "SELECT * FROM users WHERE user_id = ?"
  const results = await executeQuery(sqlQuery, [userID]);
  
  if (results.length !== 1) {
    return null;
  }

  return results[0];

}

async function getUserProfileImageByID(userID) {

  const sqlQuery = "SELECT image_id FROM profile_images WHERE user_id = ?";
  const results = await executeQuery(sqlQuery, [userID]);
  
  if (results.length !== 1) {
    return null
  }
  
  return results[0];

}

async function insertDataIntoDatabase(userData) {

  console.log(userData);

  const sqlQuery = `
    INSERT INTO users (
      user_id, first_name, last_name, description, email, 
      password, phone_number, gender, type, register_date
    ) 
    VALUES (
      NULL, ?, ?, NULL, ?, ?, ?, ?, 'professional', current_timestamp()
    )`;
    
  const results = await executeQuery(
    sqlQuery, 
    [
      userData.firstName, userData.lastName, userData.email, 
      userData.password, userData.phoneNumber, userData.gender
    ]
  );

}

module.exports = { 
  getUserByID, 
  getUserProfileImageByID, 
  insertDataIntoDatabase 
};
