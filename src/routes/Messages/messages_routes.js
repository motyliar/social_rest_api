const express = require('express');
const MessageActions = require('../../controllers/Messages/messages_controller');
const router = express.Router();


//GET
router.get('/all/', MessageActions.getMessageTable);
router.get('/single/:fieldName', MessageActions.findOneField);
router.put('/normal/:id', MessageActions.findOneWhere);
router.get('/find/:id', MessageActions.findOneMessage);

router.post('/singleMessage/:id', MessageActions.findSingleMessage);
router.get('/pagination/:id', MessageActions.getUserMessagesPagination);
//POST
router.post('/user/:id', MessageActions.getUser);
router.post('/table/', MessageActions.createMessageTable);
router.post('/create', MessageActions.madeUserTable);
router.post('/sendmessage/', MessageActions.sendMessageUser);
router.post('/multiple', MessageActions.sendMessageToMultilpeUsers);

//PUT
router.put('/update/:id', MessageActions.updateOneMessage);

//DELETE

router.delete('/deleteMany/:id', MessageActions.deleteFew);
router.delete('/delete/:id', MessageActions.deleteOne);



module.exports = router;