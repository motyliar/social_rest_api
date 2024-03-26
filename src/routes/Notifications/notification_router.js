const express = require('express');
const { addNotificationUseCase, fetchNotifyUseCase, updateIsReadUseCase}= require('../../controllers/Notifications/post_notification');


const router = express.Router();

router.get('/get/:id', fetchNotifyUseCase.execute);
router.post('/add', addNotificationUseCase.execute);
router.put('/update/:id',updateIsReadUseCase.execute);




module.exports = router;