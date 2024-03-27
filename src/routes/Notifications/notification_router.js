const express = require('express');
const { 
    addNotificationUseCase,
    fetchNotifyUseCase,
    updateIsReadUseCase,
    getAllNotifications,
    deleteNotifyUseCase,    
}= require('../../controllers/Notifications/post_notification');


const router = express.Router();

router.get('/get/:id', fetchNotifyUseCase.execute);
router.get('/all', getAllNotifications.execute);

router.post('/add', addNotificationUseCase.execute);
router.put('/update/:id',updateIsReadUseCase.execute);

router.delete('/delete', deleteNotifyUseCase.execute);




module.exports = router;