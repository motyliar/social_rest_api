const NoticeRepositoryImpl = require('../notice_repository_impl');
const Notice = require('../../../models/Notice/notice_model');
const {Comment} = require('../../../models/Notice/notice_submodel');
const ServerMessage = require('../../../core/servermessage');
const utils = require('../../../core/Utils/utils');

const noticeRepository = new NoticeRepositoryImpl();


class UpdateNoticeService {

    async updateNoticeContent(req, res) {
        const { id } = req.params;
        const field = req.body.field;
        const content = req.body.content;
        console.log(req.body);
        try {
            const data = await noticeRepository.updateNoticeContent(id, field, content);

        if(data.status === ServerMessage.success) {
            res.status(200).json(data);
        } else if (data.status === ServerMessage.notFound) {
            res.status(404).json(data);
        }
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async updateOneComment(req, res) {
        const { id } = req.params;
        const commentId = req.body.commentId;
        const newContent = req.body.newContent;

        const data = await noticeRepository.updateOneComment(id, commentId, newContent);

       try {
        utils.responseData(res, data, data);
       } catch (error) {
        res.status(500).json({error: error});
       }
    }

    async updateResolve(req, res) {
        try {
            await noticeRepository.updateNoticeToResolve(req.params.id);
            res.status(200).json({message: ServerMessage.success});
        } catch (e) {
            res.status(500).json({error: e.message});
        }
    }
}

module.exports = new UpdateNoticeService();