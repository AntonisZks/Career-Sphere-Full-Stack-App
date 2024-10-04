const {db_pool} = require("../../config/db_config");

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

exports.getBannerImageURL = async function (request, response) {

  const imageID = request.params.imageID;

  const sqlImageQuery = "SELECT data FROM profile_bg_images WHERE image_id = ?";
  db_pool.query(sqlImageQuery, [imageID], (error, results) => {

    if (error) {
      return response.status(500).send("Error receiving banner image");
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

exports.getPostImageURL = async function (request, response) {

  const postID = request.params.postID;

  const sqlImageQuery = "SELECT data FROM post_images WHERE post_id = ?";
  db_pool.query(sqlImageQuery, [postID], (error, results) => {

    if (error) {
      return response.status(500).send("Error receiving banner image");
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
