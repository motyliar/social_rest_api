const Utils = require('../../core/Utils/utils');
const Message = require('../../models/Message/message_model');
const MessagesRepository = require('./messages_repository');
const { ObjectId} = require('mongodb');
const messageHelpers = require('./messages_helpers');
const ServerMessage = require('../../core/servermessage');
const { countMessages, paginationQuery } =require('./message_template');

const ServerError = require('../../core/errors');


class MessageRepositoryImpl extends MessagesRepository {
    constructor() {
        super();
        this.message = Message;
    }

    /**
     @Overriden methods
     @GET functions
     */

     async getAllMessages() {
        try {
            const result = await Message.find({});

        if(result) {
            return result;

        } else {
            return null
        }
        } catch (error) {
            throw Error(error.message);
        }
     }

     async getUserMessages(userID, direction) {
        try {
            const result = await Message.findOne({
                "userID" : userID},
                 {[`${direction}`] : 1});
             if(result) {
                return result;
                
                }else {
                    return null;
             }    

        } catch (error)
         {
            throw Error(error.message);
        }
     }

     async getSingleMessage(userID, direction, messageId ) {
        try {

            const result = await Message.find({"userID": userID, [`${direction}._id`]: new ObjectId(messageId)}, {[`${direction}.$`]: 1});
            
        if (result.length > 0) {
            return result;
        } else if(result.length === 0){
            return null;
        } else {
            return null;
        }
        } catch(error) {
            throw new Error(error.message);
        }
     } 

     async getMessagesByPagination(params) {
        console.log(params);
        
        try {
            const countTotalDocuments = await Message.aggregate(
                countMessages(params.userID, params.direction)
            );
            const paginationOfMessages = await Message.aggregate(
                paginationQuery(params)
            );

            //calculate total pages by countTotalDocuments from aggregate
            const totalPages = Math.ceil(countTotalDocuments[0].sendCount / params.perPage);
            if(totalPages === null || totalPages === 0) {
                return null
            } else
            return {totalDocuments : countTotalDocuments[0].sendCount,
                    totalPages : totalPages,
                    currentPage: params.page,
                    item : params.perPage,
                    data: paginationOfMessages,

        } } 
        catch (error) {
            return new ServerError(error.message);
        }
     }

     /**
      * @Overriden methods
      * @POST
      */


     async sendNewMessageToOne(sender, recipient, message) {
        try {
            const userMessage = await Message.findOneAndUpdate({
                "userID" : sender,  
            },
            {$push: { "send" : message}},
            {new: true}, 
            );
            const recipientMessage = await Message.findOneAndUpdate({
                "userID" : recipient,
            },
            {$push: { "received" : message}}, 
            {new: true},
            );
            
            if(userMessage && recipientMessage) {
                return userMessage;
            } else {
                return null;
            }
        } catch(error) {
            throw new Error(error.message);
         }

     } 

     async sendNewMessageToMany(recipients, userID, message) {
        try {
            const result = await messageHelpers.sendMessageToMultipleUser(recipients, userID, message);
            if(result) {
                return result;

            } else {
                return null;
            }
        } catch(error) {
            throw new Error(error.message);
        }
     }

    async createUserMessageData() {
        try {
            
        } catch(error) {
            throw new Error(error.message);
        }
    }

     /**
      * @Override
      * @DELETE
    */
   async deleteMessage(userID, direction, messagesId ) {
    try {
        const result = await Message.updateOne({
            "userID" : userID
        }, {$pull:
             {[`${direction}`] :
              {_id: {$in: messagesId.map(message => new ObjectId(message)) }}}}
        );
        if(result.modifiedCount > 0) {
            return {message: ServerMessage.success};
        } else {
            return { message: ServerMessage.notFound};
        }
    } catch(error) {
        throw new Error(error.message);
    }
   }

   /**
    * @Override
    * @PUT
    */
    async updateSingleMessage(updateParams) {
        try {
            const result = await Message.updateOne({
                "userID" : updateParams.userID, [`${updateParams.direction}._id`] : new ObjectId(updateParams.messageID)
            },
            {$set: {[`${updateParams.direction}.$[xxx].${updateParams.field}`] : updateParams.update}},
            {
                multi: true,
                strict: false,
                arrayFilters: [ { "xxx._id": new ObjectId(updateParams.messageID) }],
            }
            );
            if(result.modifiedCount > 0) {
                return {message: ServerMessage.success};
            } else {
                return {message: ServerMessage.notFound};
            }
        } catch(error) {
            throw new ServerError(error.message);
        }
    }
     




}


module.exports = MessageRepositoryImpl;