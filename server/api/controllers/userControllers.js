const { getUserProfileImageByID, getUserByID} = require('../models/user');
const {db_pool} = require("../../config/db_config");


exports.getUserProfileImageUrl = async function (request, response) {

  const userID = request.params.userID;
  const user = await getUserByID(userID);

  const profileImage = await getUserProfileImageByID(userID);
  const profileImageURL = (profileImage === null)
    ? `/users/profileImages/default_${user.gender}`
    : `/users/profileImages/${profileImage.image_id}`

  return response.status(200).json({'url': profileImageURL});

}

exports.getProfileImageURL = async function (request, response) {

  const imageID = request.params.imageID;

  const sqlImageQuery = "SELECT data FROM profile_images WHERE image_id = ?";
  db_pool.query(sqlImageQuery, [imageID], (error, results) => {

    if (error) {
      return response.status(500).send("Error receiving profile image");
    }

    if (results.length === 1) {
      const image = results[0];
      response.contentType("image/jpeg");

      return response.send(image.data);
    }
    else {
      return response.status(404).send("Image not found");
    }

  });

}
