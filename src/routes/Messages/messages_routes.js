const express = require('express');

const router = express.Router();

const GetMessagesUseCases = require('../../controllers/Messages/usecase/get_messages_usecases');
const PostMessagesUseCases = require('../../controllers/Messages/usecase/post_messages_usecases');
const DeleteMessagesUseCases = require('../../controllers/Messages/usecase/delete_messages_usecases');
const UpdateMessagesUseCases = require('../../controllers/Messages/usecase/update_messages_usecases');







// NEW IMPLEMENTATION

router.get('/allMessages', GetMessagesUseCases.getAllMessages);
router.post('/userMessages/:id', GetMessagesUseCases.getUserMessages);
router.get('/singleMessage/:id', GetMessagesUseCases.getSingleMessage);
router.get('/pagination/:id', GetMessagesUseCases.getMessagesByPagination);
router.get('/index/:id', GetMessagesUseCases.getNewUser);

router.post('/add/single/', PostMessagesUseCases.sendNewMessageToOne);
router.post('/add/many/', PostMessagesUseCases.sendNewMessageToMany);
router.post('/admin/newfield/', PostMessagesUseCases.createMessageTable);

router.delete('/delete/:id', DeleteMessagesUseCases.deleteMessages);

router.put('/update/:id', UpdateMessagesUseCases.updateMessage);



module.exports = router;