const express = require('express');
const authenticate = require('../../controllers/Authenticate/auth_controller');
const router = express.Router();

router.post('/register', authenticate.userRegister);
router.post('/login', authenticate.login);
router.post('/logout', authenticate.logout);
router.post('/hook', async (req, res) => {
    console.log('This is webhook');
    res.status(200).send("OK");
})


module.exports = router;
