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
router.get('/pagination/notice', getNoticeServices.sortNotices);
router.get('/pagination/field', getNoticeServices.paginationNoticesByFieldName);
router.get('/filter', getNoticeServices.filterNotices);
router.get('/filterAll', getNoticeServices.filterAllNotices);
router.get('/sort', getNoticeServices.sortNotices);
/**
 * @POST
 */

router.post('/add', postNoticeService.createNotice);
router.post('/comment/:id', postNoticeService.addComment);
router.post('/join', postNoticeService.userLikeJoining);
router.post('/unjoin', postNoticeService.userUnlikeJoining);
/**
 * @DELETE
 */

router.delete('/delete/:id', deleteNoticeServices.deleteSingleNotice);
router.delete('/deletemany/', deleteNoticeServices.deleteManyNotices);
router.delete('/comment/delete/:id', deleteNoticeServices.deleteSingleComment);

/**
 * @UPDATE
 */
router.put('/single/update/:id', updateNoticeService.updateNoticeContent);
router.put('/comment/update/:id', updateNoticeService.updateOneComment);
router.put('/resolve/:id', updateNoticeService.updateResolve);


module.exports = router;