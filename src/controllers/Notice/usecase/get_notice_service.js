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

   async getNoticesByPagination( req, res) {
     const page = req.query.page;
     const pageSize = req.query.pageSize;
     let data;
     try {
         data = await noticeRepository.getNoticesByPagination(page, pageSize);
     } catch(error) {
        throw new Error(error.message);
     }
     try {
        if(data.message === ServerMessage.fail) {
            res.status(404).json(data.message);
         } else {
            res.status(200).json(data.data);
         }
     } catch (error) {
        res.status(500).json({error: error.message});
     }
   }

   async paginationNoticesByFieldName(req, res) {
        const page = req.query.page;
        const pageSize = req.query.pageSize;
        const fieldParent = req.query.parent;
        const fieldChild = req.query.child;
        let data;
        try {
            data = await noticeRepository.paginationNoticesByFieldName(page, pageSize, fieldParent, fieldChild);
    } catch(error) {
        throw new Error(error.message);
    }
       try {
        if(data.message === ServerMessage.fail) {
            res.status(404).json(data.message);
        } else {
            res.status(200).json(data);
        }
       } catch(error) {
        res.status(500).json({error: error.message});
       }
   }

   async findNoticeCreatedByUser(req,res) {
        const  { id } = req.params;

        try {
            const data = await noticeRepository.findNoticeCreatedByUser(id);
            if(data) {
        utils.responseData(res, data, data)};
        } catch( error) {
            res.status(500).json({error: error});
        }
   }
}


module.exports = new GetNoticeServices();
