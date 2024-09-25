const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');


router.get('/', authController.renderLogInPage);
router.get('/login', authController.renderLogInPage);
router.get('/signup', authController.renderSignUpPage);

router.post('/api/create_account', authController.createNewAccount);
router.post('/api/connect_to_account', authController.connectToAccount);


module.exports = router;
