
const ServerError = require('../../core/errors');
class NoticeRepository {
   
    /**
     * Function to get all notices from DB
     * @GET
     *  @throws {Error} This method should be overridden in subclasses
     */
async getNotices() {
    throw new ServerError("This method should be overridden in subclasses");
}

    /** 
     * Function to get single notice
     *  @GET
     */
    async getSingleNotice(id) {
        throw new ServerError("This method should be overridden in subclasses");
    }
   
    /**
     * Find notice created by user
     * @GET
     */
    async findNoticeCreatedByUser(userID) {
        throw new ServerError("This method should be overridden in subclasses");
    }
    /**
     * Get notice by pagination page/pagesize
     * @GET
      */
    async getNoticesByPagination(page, pageSize) {
        throw new ServerError("This method should be overridden in subclasses"); 
    } 
    /**
     * Get notice by Category/Pagination
     * @GET
     */
    async paginationNoticesByFieldName(page, pageSize, category) {
        throw new ServerError("This method should be overridden in subclasses");
    } 
    /**
     * Add comment to Notice
     * @POST
     */
    async addComment(id, comment) {
        throw new ServerError("This method should be overridden in subclasses");
    }
     /** 
     * Function to create new Notice
     * @POST
     * @throws {Error} This method should be overridden in subclasses
     */
     async createNotice(notice) {
        throw new ServerError("This method should be overridden in subclasses");
        }
    /**
     * Delete single notice
     * @DELETE
     */
    async deleteSingleNotice(id) {
        throw new ServerError("This method should be overridden in subclasses");
    }

    /**
     * Delete many notice
     * @DELETE
     */
    async deleteManyNotices(idList) {
        throw new ServerError("This method should be overridden in subclasses");
    }
    /**
     *  Delete single comment by user_id
     * @DELETE
     */
    async deleteSingleComment(noticeId, userId) {
        throw new ServerError("This method should be overridden in subclasses");
    }
    /**
     * Update one Notice in content field
     * @UPDATE PUT
     */
    async updateNoticeContent(noticeId, content) {
        throw new ServerError("This method should be overridden in subclasses");
    }

    /**
     * Update one comment
     * @UPDATE PUT
     */
    async updateOneComment(noticeId, commentId, newContent) {
        throw new ServerError("This method should be overridden in subclasses");

    }

    async userLikeJoining() {
        throw new ServerError("This methos should be overriden in subclasses");
    }

    async userUnlikeJoining() {
        throw new ServerError("This methos should be overriden in subclasses");
    }
}




module.exports = NoticeRepository;


