const { exec } =require('child_process');
const express = require('express');
const authenticate = require('../../controllers/Authenticate/auth_controller');
const router = express.Router();

router.post('/register', authenticate.userRegister);
router.post('/login', authenticate.login);
router.post('/logout', authenticate.logout);
router.post('/hook', async (req, res) => {
    console.log('wchodze w exec');
    try {
        await new Promise((resolve, reject) => {
            exec('sh /root/.restart.sh', (error, stdout, stderr) => {
                if(error) {
                    console.error(error);
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
        console.log('This is webhook');
        res.status(200).send("OK");
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
