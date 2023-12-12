const NoticeRepositoryImpl = require('../notice_repository_impl');
const Notice = require('../../../models/Notice/notice_model');
const ServerMessage = require('../../../core/servermessage');

const noticeRepository = new NoticeRepositoryImpl();


class DeleteNoticeServices {

    async deleteSingleNotice(req, res) {
        const { id} = req.params;

       try {
        const data = await noticeRepository.deleteSingleNotice(id);
        if(data) {
            res.status(200).json({status: ServerMessage.success, removed: data});
        } else {
            res.status(404).json({message: ServerMessage.notFound});
        }
       } catch (error) {
        res.status(500).json({error: error});

       }
    }

    async deleteManyNotices(req, res) {
        const idList = req.body.idList;
        const listLength = idList.length;
        try {
            const data = await noticeRepository.deleteManyNotices(idList);

            if(data.deletedCount === listLength) {
                res.status(200).json(data);

            } else {
                res.status(404).json({message: ServerMessage.notFound});
            } 
            } catch(error) {
                res.status(500).json({error: error});
        }
    }

    async deleteSingleComment(req,res) {
        const { id } = req.params;
        const noticeId = req.body.noticeId;

        try {
            const data = await noticeRepository.deleteSingleComment(noticeId, id);
        if(data.status === ServerMessage.success) {
            res.status(200).json(data);
        } else if (data.status === ServerMessage.notFound) {
            res.status(404).json(data);
        }
        } catch(error) {
            res.status(500).json({error: error});
        }
    }
}

module.exports = new DeleteNoticeServices();