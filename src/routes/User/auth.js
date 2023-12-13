const express = require('express');
const authenticate = require('../../controllers/Authenticate/auth_controller');
const router = express.Router();

router.post('/register', authenticate.userRegister);
router.post('/login', authenticate.login);
router.post('/logout', authenticate.logout);


module.exports = router;