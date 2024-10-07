const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeControllers');


router.get('/posts', homeController.getPosts);
router.get('/posts/:postID/likes', homeController.getPostLikes);
router.get('/posts/:postID/dislikes', homeController.getPostDislikes);
router.get('/posts/:postID/comments', homeController.getPostComments);


module.exports = router;
