const { db_pool, executeQuery } = require("../config/db_config");

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

module.exports = { getUserByID, getUserProfileImageByID };
