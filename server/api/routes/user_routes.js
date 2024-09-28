const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeControllers');
const userController = require('../controllers/userControllers');


router.get('/:userID/profileData', userController.getUserProfileData);
router.get('/:userID/profileImage', userController.getUserProfileImageUrl);
router.get('/:userID/bannerImage', userController.getUserBannerImageUrl);


module.exports = router;
