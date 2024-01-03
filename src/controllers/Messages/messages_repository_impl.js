const Utils = require('../../core/Utils/utils');
const Message = require('../../models/Message/message_model');
const MessagesRepository = require('./messages_repository');
const { ObjectId} = require('mongodb');
const messageHelpers = require('./messages_helpers');
const ServerMessage = require('../../core/servermessage');

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
                "fieldName" : "message", "user.userID" : userID},
                 {[`user.${direction}.$`] : 1});
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
            const result = await Message.aggregate([
               { $match: {
                 "user.userID" : userID,
                    },},
                {$project: {
                    user: {
                        $filter: {
                            input: "$user", as: "u", cond: {$eq: ["$$u.userID", userID] 
                        }},
                    } 
                }},
                {$unwind: "$user"},
                {$project: {
                    data: {
                         $filter: {
                            input: `$user.${direction}`, as: "m", cond: {$eq: ["$$m._id", new ObjectId(messageId)]}
                         }
                    }

                }}   
            ]);

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

     async getMessagesByPagination(userID,) {
        const page = 1;
        const perPage = 3;
        const direction = 'received';
        try {

            const result = await Message.aggregate([
                {$match: {"user.userID": userID}},
                // {$project: {
                //     user: {
                //         $filter: {
                //             input: "$user", as: "u", cond: {$eq: ["$$u.userID", userID] 
                //         }},
                //     } 

                // }},
                {$unwind: "$user"},
                
                {$unwind: "$user.received"},
                { 
                    $match: { 
                        "user.userID": userID,
                        "user.received.to": userID
                    }
                },
                { 
                    $replaceRoot: {
                        newRoot: "$user.received"
                    }
                },
                // {$project: {
                //     messages: "$user.received",
                // }},
                { $skip: (page - 1) * perPage },
                { $limit: perPage },
                
                
            ]);
            // const result = await Message.findOne({
            //     "user.userID": userID
            // }, {"user.received.$" : 1});
            // const totalItems = result.user[0].received.length;
            // const totalPages = totalItems / perPage;
            // console.log(totalPages);


            // if(result.user[0].received.length > 1) {
            //     return result.user[0].received.slice((page - 1) * perPage, page * perPage) }
                
               return result
        } catch (error) {
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
                "user.userID" : sender,  
            },
            {$push: { "user.$.send" : message}},
            {new: true}, 
            );
            const recipientMessage = await Message.findOneAndUpdate({
                "user.userID" : recipient,
            },
            {$push: { "user.$.received" : message}}, 
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
            "user.userID" : userID
        }, {$pull:
             {[`user.$.${direction}`] :
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
                "user.userID" : updateParams.userID, [`user.${updateParams.direction}._id`] : new ObjectId(updateParams.messageID)
            },
            {$set: {[`user.$[].${updateParams.direction}.$[xxx].${updateParams.field}`] : updateParams.update}},
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