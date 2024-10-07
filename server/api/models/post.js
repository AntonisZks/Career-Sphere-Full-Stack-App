const { executeQuery } = require("../../config/db_config");

async function getPostLikes(postID) {

  const sqlQuery = `SELECT COUNT(*) AS likes FROM user_likes_posts WHERE post_id = ?;`;
  const results = await executeQuery(sqlQuery, [postID]);

  return results[0].likes;

}

async function getPostDislikes(postID) {

  const sqlQuery = `SELECT COUNT(*) AS dislikes FROM user_dislikes_posts WHERE post_id = ?;`;
  const results = await executeQuery(sqlQuery, [postID]);

  return results[0].dislikes;

}

async function getPostComments(postID) {

  const sqlQuery = `SELECT COUNT(*) AS comments FROM post_comments WHERE post_id = ?;`;
  const results = await executeQuery(sqlQuery, [postID]);

  return results[0].comments;

}

module.exports = { getPostLikes, getPostDislikes, getPostComments };
