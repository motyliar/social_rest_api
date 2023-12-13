const express = require('express');
const UserAction = require('../../controllers/User/user_controller');
const authenticate = require('../../middlewere/authenticate');


// const noticeImpl = new NoticeDataBaseImpl(user);






const router = express.Router();

router.get('/all', UserAction.getAll);
router.get('/single/:id', UserAction.getUser);

/**
 * @name FRIEND
 */
router.get('/getfriends/:id', UserAction.friendsPagination);
router.get('/friend/:id', UserAction.getFriends);
router.get('/friendSize/:id', UserAction.getFriendsSize);
// router.get('/notice/:id', async (req,res) => { await NoticeService.getUserById(req,res) });


router.post('/', UserAction.postUser);

// POST Functions for add/delete new data
router.post('/addChallenge/:id', UserAction.addChallegesID);
router.post('/message/:action/:id', UserAction.addMessages);
router.post('/friend/:action/:id', UserAction.friends);
router.post('/request/:action/:id', UserAction.friendsRequest);

// PUT
router.put('/:id', UserAction.updateUser);

// DELETE
router.delete('/:id', UserAction.deleteUser);





module.exports = router;