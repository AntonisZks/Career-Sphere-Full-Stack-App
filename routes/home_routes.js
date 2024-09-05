const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeControllers');

router.get('/:userID', homeController.getUserHomePage);
router.get('/profile_image/:imageID', homeController.getUserProfileImageUrl);

module.exports = router;
