const express = require('express');
const getNoticeServices = require('../../controllers/Notice/usecase/get_notice_service');
const postNoticeService = require('../../controllers/Notice/usecase/post_notice_service');
const deleteNoticeServices = require('../../controllers/Notice/usecase/delete_notice_service');
const updateNoticeService = require('../../controllers/Notice/usecase/update_notice_service');
const router = express.Router();


/**
 * @GET
 */

router.get('/all', getNoticeServices.getNotices);
router.get('/single/:id', getNoticeServices.getSingleNotice);
router.get('/author/:id', getNoticeServices.findNoticeCreatedByUser);
/**
 * @POST
 */

router.post('/new', postNoticeService.createNotice);
router.post('/comment/:id', postNoticeService.addComment);
/**
 * @DELETE
 */

router.delete('/delete/:id', deleteNoticeServices.deleteSingleNotice);
router.delete('/deletemany/', deleteNoticeServices.deleteManyNotices);
router.delete('/comment/delete/:id', deleteNoticeServices.deleteSingleComment);

/**
 * @UPDATE
 */
router.put('/notice/update/:id', updateNoticeService.updateNoticeContent);
router.put('/comment/update/:id', updateNoticeService.updateOneComment);


module.exports = router;