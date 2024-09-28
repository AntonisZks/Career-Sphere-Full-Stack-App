const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageControllers');


router.get('/profileImages/:imageID', imageController.getProfileImageURL);
router.get('/bannerImages/:imageID', imageController.getBannerImageURL);


module.exports = router;
