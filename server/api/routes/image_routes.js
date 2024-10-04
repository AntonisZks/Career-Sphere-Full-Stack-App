const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageControllers');


router.get('/profileImages/:imageID', imageController.getProfileImageURL);
router.get('/bannerImages/:imageID', imageController.getBannerImageURL);
router.get('/postImages/:postID', imageController.getPostImageURL);



module.exports = router;
