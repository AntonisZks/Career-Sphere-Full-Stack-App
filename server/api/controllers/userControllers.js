const { getUserProfileImageByID, getUserByID, getUserSocialsInfo, getUserBannerImageByID} = require('../models/user');
const {db_pool} = require("../../config/db_config");


exports.getUserProfileData = async function (request, response) {

  const user = await getUserByID(request.params.userID);
  const socials = await getUserSocialsInfo(request.params.userID, null);

  return response.json({
    firstName: user.first_name,
    lastName: user.last_name,
    description: user.description,

    socials: {
      ...socials,
      email: user.email,
      phoneNumber: user.phone_number,
    }
  });

}


exports.getUserProfileImageUrl = async function (request, response) {

  const userID = request.params.userID;
  const user = await getUserByID(userID);

  const profileImage = await getUserProfileImageByID(userID);
  const profileImageURL = (profileImage === null)
    ? `/images/profileImages/default_${user.gender}`
    : `/images/profileImages/${profileImage.image_id}`

  return response.status(200).json({'url': profileImageURL});

}

exports.getUserBannerImageUrl = async function (request, response) {

  const userID = request.params.userID;
  const user = await getUserByID(userID);

  const bannerImage = await getUserBannerImageByID(userID);
  const bannerImageURL = (bannerImage === null)
    ? null
    : `/images/bannerImages/${bannerImage.image_id}`

  return response.status(200).json({'url': bannerImageURL});

}