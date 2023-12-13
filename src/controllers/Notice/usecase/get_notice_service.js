const NoticeRepositoryImpl = require('../notice_repository_impl');
const utils = require('../../../core/Utils/utils');
const ServerMessage = require('../../../core/servermessage');

const noticeRepository = new NoticeRepositoryImpl();


class GetNoticeServices {

   async getNotices(req, res) {
    const data = await noticeRepository.getNotices()
    try {
        utils.responseData(res, data, data);
    } 
   catch (error) {
    res.status(500).json({message: error});
   }};

   async getSingleNotice(req, res) {
    const { id } = req.params;
    try {
        const data = await noticeRepository.getSingleNotice(id);
        utils.responseData(res, data, data);
      
    } catch(error) {
        res.status(500).json({error: error});
    }

   }

   async findNoticeCreatedByUser(req,res) {
        const  { id } = req.params;

        try {
            const data = await noticeRepository.findNoticeCreatedByUser(id);
        utils.responseData(res, data, data);
        } catch( error) {
            res.status(500).json({error: error});
        }
   }
}


module.exports = new GetNoticeServices();
