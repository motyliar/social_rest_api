const express = require('express');
const AddNotificationUseCase = require('../../controllers/Notifications/post_notification');


const router = express.Router();


router.post('/add', AddNotificationUseCase.execute);



module.exports = router;