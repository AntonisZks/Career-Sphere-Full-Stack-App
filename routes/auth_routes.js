const express = require('express');
const router = express.Router();


router.get('/', (request, response) => { response.render('login'); });
router.get('/login', (request, response) => { response.render('login'); });
router.get('/signup', (request, response) => { response.render('signup'); });

module.exports = router;
