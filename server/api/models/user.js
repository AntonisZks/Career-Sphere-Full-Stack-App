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

  return results.length === 1;

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

async function getUserSocialsInfo(userID, type) {

  if (type === 'followers') {
    const sqlQuery = `SELECT COUNT(*) AS 'followers' FROM users_follow_users WHERE following_id = ?`;
    const results = await executeQuery(sqlQuery, [userID]);

    return results[0].followers;
  }
  else if (type === 'following') {
    const sqlQuery = `SELECT COUNT(*) AS 'following' FROM users_follow_users WHERE follower_id = ?`;
    const results = await executeQuery(sqlQuery, [userID]);

    return results[0].following;
  }
  else if (type === 'friends') {
    const sqlQuery = `
      SELECT COUNT(u1.following_id) AS friends FROM users_follow_users u1
      JOIN users_follow_users u2 ON u1.follower_id = u2.following_id AND u1.following_id = u2.follower_id
      WHERE u1.follower_id = ?;
    `
    const results = await executeQuery(sqlQuery, [userID]);

    return results[0].friends;
  }
  else if (type === null) {
    return {
      'followers': await getUserSocialsInfo(userID, 'followers'),
      'following': await getUserSocialsInfo(userID, 'following'),
      'friends': await getUserSocialsInfo(userID, 'friends'),
    }
  }

}

async function getUserConnections(userID) {

  const sqlQuery = `
    SELECT * FROM users WHERE user_id in (
      SELECT u1.following_id AS friend_id FROM users_follow_users u1
      JOIN users_follow_users u2 ON u1.follower_id = u2.following_id AND u1.following_id = u2.follower_id
      WHERE u1.follower_id = ?
    );
  `
  const results = await executeQuery(sqlQuery, [userID]);

  return results;

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

async function getUserPosts(userID) {

  const sqlQuery = `SELECT * FROM posts`;

  const results = await executeQuery(sqlQuery, []);

  return results;

}

module.exports = {
  getUserByID, getUserByEmail,
  userExistsWithEmail,
  getUserProfileImageByID,
  getUserBannerImageByID,
  insertDataIntoDatabase,
  getUserSocialsInfo,
  getUserConnections,
  getUserPosts
};
