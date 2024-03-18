const NoticeRepositoryImpl = require('../notice_repository_impl');
const Notice = require('../../../models/Notice/notice_model');
const {Comment} = require('../../../models/Notice/notice_submodel');
const ServerMessage = require('../../../core/servermessage');
const utils = require('../../../core/Utils/utils');

const noticeRepository = new NoticeRepositoryImpl();


class PostNoticeService {

    async createNotice(req, res) {
        const notice = new Notice(req.body.notice);

        try {
            const data = await noticeRepository.createNotice(notice);
        utils.responseData(res, data,
             {message: ServerMessage.success, data: data});
        } catch (error) {
            res.status(500).json({error: error});
        }

    }

    async addComment(req,res) {
        const newComment = new Comment(req.body.comment);
        const { id } = req.params;

        const data = await noticeRepository.addComment(id, newComment);
       try {
        utils.responseData(res, data, data);
       } catch (error) {
        res.status(500).json({error: error});    
    } 
    }

    async userLikeJoining(req, res) {
        const body = req.body;
        try {
            const data = await noticeRepository.userLikeJoining(body);
            if(data) {
                res.status(200).json(data);
            }
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    }

    async userUnlikeJoining(req,res) {
        const body = req.body;
        try {
            const data = await noticeRepository.userUnlikeJoining(body);
            if(data) {
                res.status(200).json(data);
            }
        } catch (e) { res.status(500).json({message: e.message});}

    }
}

module.exports = new PostNoticeService();