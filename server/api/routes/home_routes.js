const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeControllers');


router.get('/posts', homeController.getPosts);

module.exports = router;
