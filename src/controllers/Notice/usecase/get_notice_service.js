const NoticeRepositoryImpl = require('../notice_repository_impl');
const Notice = require('../../../models/Notice/notice_model');
const ServerMessage = require('../../../core/servermessage');

const noticeRepository = new NoticeRepositoryImpl();


class GetNoticeServices {

   async getNotices(req, res) {
    const data = await noticeRepository.getNotices()
    try {
        if(data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({message: ServerMessage.notFound});
        }
    } 
   catch (error) {
    res.status(500).json({message: error});
   }};

   async getSingleNotice(req, res) {
    const { id } = req.params;
    try {
        const data = await noticeRepository.getSingleNotice(id);
        if(data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({message: ServerMessage.notFound});
        }
    } catch(error) {
        res.status(500).json({error: error});
    }

   }

   async findNoticeCreatedByUser(req,res) {
        const  { id } = req.params;

        const data = await noticeRepository.findNoticeCreatedByUser(id);
        if(data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({message: ServerMessage.notFound});
        }
   }
}


module.exports = new GetNoticeServices();
