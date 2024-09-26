const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeControllers');

router.get('/:userID', homeController.getUserHomePage);
router.get('/profile_image/:imageID', homeController.getUserProfileImageUrl);
router.get('/banner_image/:imageID', homeController.getUserBannerImageUrl);
router.get('/profile_image/default/male', homeController.getDefaultMaleProfileImage);
router.get('/profile_image/default/female', homeController.getDefaultFemaleProfileImage);

module.exports = router;
