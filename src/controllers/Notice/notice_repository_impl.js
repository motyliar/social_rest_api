const NoticeRepository = require('./notice_repository');
const Notice = require('../../models/Notice/notice_model');
const ServerError = require('../../core/errors');
const ServerMessage = require('../../core/servermessage');
const Utils = require('../../core/Utils/utils');


class NoticeRepositoryImpl extends NoticeRepository {
    constructor() {
        super();
        this.notice = Notice;
    }

    /**
     * @Overriden
     * @GET FUNCTIONS
     */
    async getNotices() {
        try {
            const data = await Notice.find({});
        if(data) {
            return data
        } 
        else {
            return null;
        }
        } catch (error) {
            throw  Error('Database query failed');
        }
    } 

    async getSingleNotice(id) {

        try {
            const data = await Notice.findById(id);
        if(data) {
            return data;
        }
        } catch (error) {
            Utils.errorSwitch(error);
            
        }
    }

    async getNoticesByPagination(page, pageSize) {
        const data = await Notice.find({});
        try {
            if(data) {
                return Utils.paginationHelper(page, pageSize, data);
       
               } else {
                   throw Error(ServerMessage.fail);
               }
        } catch (error) {
            throw new Error(ServerMessage.fail);
        }
    }

    async paginationNoticesByFieldName(page, pageSize, fieldParrent, fieldChild) {
       
            const data = await Notice.where(fieldParrent).equals(fieldChild);
       
        try {
            if(data) {
               return  Utils.paginationHelper(page, pageSize, data);
            } else {
                throw new Error(ServerMessage.fail);
            }
        } catch(error) {
            throw new Error(ServerMessage.fail);
        }
    }

    #userExist = async (userId) => {
        
        const data = await Notice.exists({"authorId" : userId});
           console.log('to jest'+ data);
           if(data === null) {
            throw new ServerError('no-data');
           }
            else {  return data;
               
            }
        
    }
    async findNoticeCreatedByUser(userId)  {

        try {
            const user = await this.#userExist(userId);
            console.log(user);
            if(user) {
            const data = await Notice.find().where("authorId").equals(userId);
            if(data.length > 0) {
                return data;
            } else {throw new ServerError('no-messages')}
        } 
        } catch(error) {
            throw new ServerError(error.message);
        }
    }
    /**
     * @Oveririden
     * @POST FUNCTIONS
     */
    async createNotice(notice) {
    
        const data = await Notice.create(notice);
        if(data) {
            return data;
        } else {
            throw Error('Database query failed');
        }

    }
    async addComment( id, comment) {

        const data = await Notice.updateOne({"_id": id}, {$push: {"comments" : comment}, $set: {"updatedAt": Utils.getData()}});
        if(data) {
            return {data: data, status: ServerMessage.success};
        } else {
            return null;
        }
    }
    /**
     * @Overriden
     * @DELETE FUNCTIONS
     */
    async deleteSingleNotice(id) {
       
        try {
            const data = await Notice.findByIdAndDelete(id);

            if(data) {
                return data;
            } 

        } catch (error) {
            Utils.errorSwitch(error);
        }
    }
    async deleteManyNotices(idList) {
        try {
            const data = await Notice.deleteMany({_id: {$in: idList}});
            if(data) {
                return data;
            } 
        } catch(error) {
            return null;
        }
    }

    async deleteSingleComment(noticeId , userId) {
        try {
            const data = await Notice.updateOne(
                {"_id" : noticeId, "comments._id" : userId},
                {$pull: {"comments": {"_id" : userId} } }
                );
                if(data.modifiedCount > 0) {
                    return {"status" : ServerMessage.success}
                } else null;
        }
        catch(error) {
           Utils.errorSwitch(error);
        }
    }

    /**
     * @Overriden
     * @UPDATE
     */
    async updateNoticeContent(noticeId, field, content) {
      try {
        const data = await Notice.updateOne(
            {"_id": noticeId,}, 
            {$set: {[`${field}`]: content }, "updatedAt": Utils.getData()}
            );
            console.log(data.modifiedCount);
            if(data.modifiedCount > 0) {
                return {"status": ServerMessage.success}
            } else {
                null;
            }
      } catch (error) {
        Utils.errorSwitch(error);
      }
    }


    async updateOneComment(noticeId, commentId, newContent) {

        const data = await Notice.updateOne(
            { "_id" : noticeId, "comments._id" : commentId}, 
            { $set: {"comments.$.content" : newContent, "comments.$.updatedAt" : Utils.getData() },
            
            "updatedAt": Utils.getData()}
            );
            if(data) {
                return {data: data, status: ServerMessage.success};

            } else {
                return null;
            }
    }

    async userLikeJoining(body) {
        console.log(body);
        const data = await Notice.findById(body.id);
        if(data) {
            if(body.where === 'request') {
                data.requests.push(body.userId);
                data.save();
                return ServerMessage.success;
            }
            if(body.where === 'interested') {
                data.interested.push(body.userId);
                data.save();
                return ServerMessage.success;
            }
            
        } else {
            throw new ServerError('not-found');
        }
    }

    async userUnlikeJoining(body) {
        console.log(body);
        const data = await Notice.findById(body.id);
        if (data) {
            if (body.where === 'request') {
                const index = data.requests.indexOf(body.userId);
                if (index !== -1) {
                    data.requests.splice(index, 1);
                    await data.save();
                    return ServerMessage.success;
                }
            } else if (body.where === 'interested') {
                const index = data.interested.indexOf(body.userId);
                if (index !== -1) {
                    data.interested.splice(index, 1);
                    await data.save();
                    return ServerMessage.success;
                }
            }
        } else {
            throw new ServerError('not-found');
        }
    }
}





module.exports = NoticeRepositoryImpl;