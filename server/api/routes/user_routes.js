const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');


router.get('/:userID/profileData', userController.getUserProfileData);
router.get('/:userID/profileImage', userController.getUserProfileImageUrl);
router.get('/:userID/bannerImage', userController.getUserBannerImageUrl);
router.get('/:userID/gender', userController.getUserGender);
router.get('/:userID/connections', userController.getConnections);


module.exports = router;
