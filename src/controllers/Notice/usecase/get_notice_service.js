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

   async sortNotices(req, res) {
        const page = req.query.page;
        const pageLimit = req.query.pageSize;
        const skip = (page -1) * pageLimit;

        try {
            const notices = await noticeRepository.getSortNoticesPagination(skip, pageLimit);
            if(notices) {
                res.status(200).json(notices);
            }
        } catch (e) {
             res.status(500).json({message: e.message});}

   }
    /**
     * @deprecated
     */
   async getNoticesByPagination( req, res) {
    console.warn('This function is depracated');
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

   async filterNotices(req,res) {
    const category = req.query.category;
     try {
        const data = await noticeRepository.filterNotice(req.query.word, category);
        res.status(200).json(data)
     }catch (e) {
        res.status(500).json({message: e.message});
       }

   } 
   async filterAllNotices(req, res) {
    try {
        const data = await noticeRepository.filterAllFields(req.query.word);
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
   }
}


module.exports = new GetNoticeServices();
