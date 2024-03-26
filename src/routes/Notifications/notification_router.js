const express = require('express');
const { addNotificationUseCase, fetchNotifyUseCase }= require('../../controllers/Notifications/post_notification');


const router = express.Router();

router.get('/get/:id', fetchNotifyUseCase.execute);
router.post('/add', addNotificationUseCase.execute);




module.exports = router;