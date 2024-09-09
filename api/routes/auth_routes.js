const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');


router.get('/', (request, response) => { response.render('login'); });
router.get('/login', (request, response) => { response.render('login'); });
router.get('/signup', (request, response) => { 
  const error=request.query.error; 
  response.render('signup', { error }); 
});

router.post('/api/create_account', authController.createNewAccount);

module.exports = router;
