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

async function userExistsWithEmail(email) {

  // Receive the user with the corresponding id passed at the url
  const sqlQuery = "SELECT * FROM users WHERE email = ?"
  const results = await executeQuery(sqlQuery, [email]);
  
  if (results.length == 1) {
    return true;
  }
  
  return false;

}

async function getUserByEmail(email) {

  // Receive the user with the corresponding id passed at the url
  const sqlQuery = "SELECT * FROM users WHERE email = ?"
  const results = await executeQuery(sqlQuery, [email]);
  
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

async function getUserBannerImageByID(userID) {

  const sqlQuery = "SELECT image_id FROM profile_bg_images WHERE user_id = ?";
  const results = await executeQuery(sqlQuery, [userID]);
  
  if (results.length !== 1) {
    return null
  }
  
  return results[0];

}

async function insertDataIntoDatabase(userData) {

  const sqlQuery = `
    INSERT INTO users (
      user_id, first_name, last_name, description, email, 
      password, phone_number, gender, type, register_date
    ) 
    VALUES (
      NULL, ?, ?, NULL, ?, ?, ?, ?, 'professional', current_timestamp()
    )`;
    
  await executeQuery(
    sqlQuery, 
    [
      userData.firstName, userData.lastName, userData.email, 
      userData.password, userData.phoneNumber, userData.gender
    ]
  );

  const newUser = await getUserByEmail(userData.email);

  return newUser.user_id;

}

module.exports = { 
  getUserByID, 
  getUserByEmail,
  userExistsWithEmail,
  getUserProfileImageByID, 
  getUserBannerImageByID,
  insertDataIntoDatabase 
};
