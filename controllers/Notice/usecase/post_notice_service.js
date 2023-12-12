const NoticeRepositoryImpl = require('../notice_repository_impl');
const Notice = require('../../../models/Notice/notice_model');
const {Comment} = require('../../../models/Notice/notice_submodel');
const ServerMessage = require('../../../core/servermessage');

const noticeRepository = new NoticeRepositoryImpl();


class PostNoticeService {

    async createNotice(req, res) {
        const notice = new Notice(req.body.notice);

        try {
            const data = await noticeRepository.createNotice(notice);
        if(data) {
            res.status(200).json({message: ServerMessage.success, data: data});
        }
        } catch (error) {
            res.status(500).json({error: error});
        }

    }

    async addComment(req,res) {
        const newComment = new Comment(req.body.comment);
        const { id } = req.params;

        const data = await noticeRepository.addComment(id, newComment);
        if(data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({message: ServerMessage.notFound});
        }
        
    }
}

module.exports = new PostNoticeService();