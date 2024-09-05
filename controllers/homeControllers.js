const db = require("../config/db_config");
const databaseConnectionPool = db.createConnectionPool();


exports.getUserHomePage = (request, response) => {

  const userID = request.params.userID;

  // Receive the user with the corresponding id passed at the url
  const sqlUserQuery = "SELECT * FROM users WHERE user_id = ?"
  databaseConnectionPool.query(sqlUserQuery, [userID], (userQueryError, userQueryResults) => {
    if (userQueryError) {
      return response.status(500).send("Error finding user");
    }

    if (userQueryResults.length == 1) {
      const user = userQueryResults[0];

      // Receive the user profile image         
      const sqlUserProfileImageQuery = "SELECT image_id FROM profile_images WHERE user_id = ?";
      databaseConnectionPool.query(sqlUserProfileImageQuery, [userID], (profileImgQueryError, profileImgQueryResults) => {
        if (profileImgQueryError) {
          return response.status(500).send("Error receiving profile image");
        }

        let profileImageUrl = '';
        if (profileImgQueryResults.length > 0) {
          const profileImageID = profileImgQueryResults[0].image_id;
          profileImageUrl = `/home/profile_image/${profileImageID}`;
        }

        return response.status(200).render('home', {
          user: user,
          profile_image_url: profileImageUrl
        });

      })

    } else {

      return response.status(404).send("No such a user found");

    }

  });

}

exports.getUserProfileImageUrl = (request, response) => {

  const imageID = request.params.imageID;

  const sqlImageQuery = "SELECT data FROM profile_images WHERE image_id = ?";
  databaseConnectionPool.query(sqlImageQuery, [imageID], (error, results) => {
     if (error) {
        return response.status(500).send("Error receiving profile image");
     }

     if (results.length === 1) {

        const image = results[0];

        const data = image.data;
        const type = "image/jpeg";

        response.contentType(type);
        response.send(data);
     
     } else {

        response.status(404).send("Image not found");

     }
  })

}