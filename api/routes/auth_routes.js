const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');


router.get('/', (request, response) => { 
  const error = request.query.error;
  response.render('login', { error }); 
});
router.get('/login', (request, response) => { 
  const error = request.query.error;
  response.render('login', { error }); 
});
router.get('/signup', (request, response) => { 
  const error = request.query.error; 
  response.render('signup', { error }); 
});

router.post('/api/create_account', authController.createNewAccount);
router.post('/api/connect_to_account', authController.connectToAccount);


module.exports = router;
