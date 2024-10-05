const path = require('path');
const { db_pool } = require("../../config/db_config");
const { getUserByID, getUserProfileImageByID, getUserBannerImageByID } = require('../models/user');
const { getUserSocialsInfo, getUserConnections, getUserHomePosts } = require('../models/user');
const { getPostLikes,getPostDislikes } = require('../models/post');


exports.getPosts = async function (request, response) {

  const userID = request.query.uid;

  const userPosts = await getUserHomePosts(userID);

  for (let post of userPosts) {
    post.image_url = `/images/postImages/${post.post_id}`
  }

  return response.status(200).send(userPosts);

}


exports.getPostLikes = async function (request, response) {

  const postID = request.params.postID;
  const likes = await getPostLikes(postID);

  return response.status(200).json({likes});

}

exports.getPostDislikes = async function (request, response) {

  const postID = request.params.postID;
  const dislikes = await getPostDislikes(postID);

  return response.status(200).json({dislikes});

}


/**
 * Controlls the home page of the application. It receives all the data of the user
 * of the client and sends the appropriate responses according to those data.
 * 
 * @param {any} request the request of the route 
 * @param {any} response the response to the client 
 * 
 * @returns the appropriate response back to the client 
 * 
 * @author AntonisZks
 * @since 1.0.0
 * @date 06/09/2024
 */
exports.getUserHomePage = async function (request, response) {

  // Get the user with the corresponding id passed at the url
  const userID = request.params.userID;

  // Receive the user corresponding to the given ID from the database, and if they 
  // doesn't exist send a 404 error as a response
  const user = await getUserByID(userID);
  if (user == null) {
    return response.status(404).send('User not found');
  }

  // Construct the profile banner image url according to the user banner image. If the 
  // user does not have a profile image send null
  let bannerImageUrl = '';
  let bannerImage = await getUserBannerImageByID(userID);
  bannerImageUrl = (bannerImage == null) 
    ? null 
    : `/user/banner_image/${bannerImage.image_id}`;

  // Construct the profile image url path according to the user profile image
  // If the user does not have a profile image send a default profile image as a response
  let profileImageUrl = '';
  let profileImage = await getUserProfileImageByID(userID);
  profileImageUrl = (profileImage == null)
    ? `/user/profile_image/default/${user.gender}`
    : `/user/profile_image/${profileImage.image_id}`;

  // Add the bannder and profile image url as a property to the user object
  user.profile_image_url = profileImageUrl;
  user.banner_image_url = bannerImageUrl;

  // Receive the user's socials data (followers, following & friends)
  user.followersCount = await getUserSocialsInfo(userID, 'followers');
  user.followingCount = await getUserSocialsInfo(userID, 'following');
  user.friendsCount = await getUserSocialsInfo(userID, 'friends');

  // Receive the user's connections (friends) and set up their profile images urls
  user.connections = await getUserConnections(userID);
  for (let connection of user.connections) {
    
    let profileImageUrl = '';
    let profileImage = await getUserProfileImageByID(connection.user_id);
    profileImageUrl = (profileImage == null)
      ? `/user/profile_image/default/${connection.gender}`
      : `/user/profile_image/${profileImage.image_id}`;

    connection.profile_image_url = profileImageUrl;
    if (connection.description == null) {
      connection.description = '';
    }
    
  }

  // Send the HTML code of the home page as a response to the client
  return response.status(200).json({...user});

}

/**
 * Returns a file that includes the basic default profile image for a male user.
 * 
 * @param {any} request the request of the route 
 * @param {any} response the response to the client
 * 
 * @returns the appropriate response back to the client
 * 
 * @author AntonisZks
 * @since 1.0.0
 * @date 06/09/2024
 */
exports.getDefaultMaleProfileImage = function (request, response) {
  const imagePath = path.join(
    __dirname,
    '../../public/assets/imgs/default_profile_image_male.png'
  );
  return response.sendFile(imagePath);
}

/**
 * Returns a file that includes the basic default profile image for a female user.
 * 
 * @param {any} request the request of the route 
 * @param {any} response the response to the client
 * 
 * @returns the appropriate response back to the client
 * 
 * @author AntonisZks
 * @since 1.0.0
 * @date 06/09/2024
 */
exports.getDefaultFemaleProfileImage = function (request, response) {
  const imagePath = path.join(
    __dirname,
    '../../public/assets/imgs/default_profile_image_female.png'
  );
  return response.sendFile(imagePath);
}

/**
 * Controlls the profile image url request and returns the image inside the database, corresponding
 * to the ID passed at the url path.
 * 
 * @param {any} request the request of the route 
 * @param {any} response the response to the client 
 * 
 * @return the appropriate response back to the client
 * 
 * @author AntonisZks
 * @since 1.0.0
 * @date 06/09/2024
 */
exports.getUserProfileImageUrl = function (request, response) {

  // Get the image with the corresponding id passed at the url
  const imageID = request.params.imageID;

  // Receive the image with the given ID from the database, and if it doesn't exist send a
  // 404 error as a response
  const sqlImageQuery = "SELECT data FROM profile_images WHERE image_id = ?";
  db_pool.query(sqlImageQuery, [imageID], (error, results) => {

    // Check if the query was not executed successfully
    if (error) {
      return response.status(500).send("Error receiving profile image");
    }

    // If number of results is one, it means that the image was successfully received from
    // the database and we can store its data and send them back as a response
    if (results.length === 1) {

      const image = results[0];

      // Store the data of the image and set its type to be image
      const data = image.data;
      const type = "image/jpeg";

      // Set the response type to be image and send the response back to the client
      response.contentType(type);

      return response.send(data);

    } else {

      // Otherwise send a 404 error as a response back to the client
      return response.status(404).send("Image not found");

    }

  });

}

exports.getUserBannerImageUrl = function (request, response) {

  // Get the image with the corresponding id passed at the url
  const imageID = request.params.imageID;

  // Receive the image with the given ID from the database, and if it doesn't exist send a
  // 404 error as a response
  const sqlImageQuery = "SELECT data FROM profile_bg_images WHERE image_id = ?";
  db_pool.query(sqlImageQuery, [imageID], (error, results) => {

    // Check if the query was not executed successfully
    if (error) {
      return response.status(500).send("Error receiving profile image");
    }

    // If number of results is one, it means that the image was successfully received from
    // the database and we can store its data and send them back as a response
    if (results.length === 1) {

      const image = results[0];

      // Store the data of the image and set its type to be image
      const data = image.data;
      const type = "image/jpeg";

      // Set the response type to be image and send the response back to the client
      response.contentType(type);

      return response.send(data);

    } else {

      // Otherwise send a 404 error as a response back to the client
      return response.status(404).send("Image not found");

    }

  });

}