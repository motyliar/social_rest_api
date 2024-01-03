const express = require('express');
const MessageActions = require('../../controllers/Messages/messages_controller');
const router = express.Router();

const GetMessagesUseCases = require('../../controllers/Messages/usecase/get_messages_usecases');
const PostMessagesUseCases = require('../../controllers/Messages/usecase/post_messages_usecases');
const DeleteMessagesUseCases = require('../../controllers/Messages/usecase/delete_messages_usecases');
const UpdateMessagesUseCases = require('../../controllers/Messages/usecase/update_messages_usecases');


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



//DELETE

router.delete('/deleteMany/:id', MessageActions.deleteFew);




// NEW IMPLEMENTATION

router.get('/allMessages', GetMessagesUseCases.getAllMessages);
router.get('/userMessages/:id', GetMessagesUseCases.getUserMessages);
router.get('/singleMessage/:id', GetMessagesUseCases.getSingleMessage);

router.post('/add/single/', PostMessagesUseCases.sendNewMessageToOne);
router.post('/add/many/', PostMessagesUseCases.sendNewMessageToMany);

router.delete('/delete/:id', DeleteMessagesUseCases.deleteMessages);

router.put('/update/:id', UpdateMessagesUseCases.updateMessage);



module.exports = router;