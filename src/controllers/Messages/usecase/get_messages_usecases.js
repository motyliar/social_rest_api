const MessageRepositoryImpl = require('../messages_repository_impl');
const ServerMessage = require('../../../core/servermessage');
const messageRepository = new MessageRepositoryImpl();
const Message = require('../../../models/Message/message_model');
const { paginationMessageParams } = require('../message_template');
const User = require('../../../models/User/user_model');

const SEND_DIRECTION = "send";

class GetMessagesUseCases {


 async getAllMessages(req, res) {
    try {
        const result = await messageRepository.getAllMessages();

        if (result) {
             res.status(200).json(result);   
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
 }
 /**
  * @param {String} userID req.params.id - user ID to find in DB, handling in params from app 
  * @param {String} direction (send or received) to pass in req.query.direction, when direction 
  * if null, then will show send messages array
  */

 getIdsToList =(messages) =>
    messages.map((value) => value.from);   

async addProfileAvatar(listOfIds) {
return await Promise.all(listOfIds.map(async (value) => {
   const user = await User.findById(value);
   return {"id" : user.id, "profileAvatar" : user.profileAvatar};
}));

}
 async getUserMessages(req, res) {
    const userID = req.params.id;
    const direction = req.body.direction || SEND_DIRECTION;

        try {
            const result = await messageRepository.getUserMessages(userID, direction);

            if(result){
               
               const listOFMessages = result.send;
               const idsSet = new Set();
               listOFMessages.map((value) => {idsSet.add(value.from)});
                  console.log(idsSet);
                  const ids = [...idsSet];
               const avatars = await Promise.all(ids.map(async (value) => {
                  const user = await User.findById(value);
                  return {"id" : user.id, "profileAvatar" : user.profileAvatar};
               }));


                res.status(200).json({messages: result, avatars: avatars});

            } else {
                res.status(404).json({message: ServerMessage.notFound});
            }
        } catch(error) {
            res.status(500).json({error: error.message});

 } 

 
 }
  
 /**
  * 
  * @param {String} userID req.params.id pass userID who is author or recipient of message 
  * @param {String} direction indicates where to retrieve the message
  * @param {String} messageId id of single message from send/received table
  * @return {Object}
  */

 async getSingleMessage(req,res) {
    const userID = req.params.id;
    const direction = req.body.direction; 
    const messageId = req.body.messageId;
    console.log(messageId)
         try {
            const result = await messageRepository.getSingleMessage(userID, direction, messageId);
         if(result) {
            res.status(200).json(result);
         } else {
            res.status(404).json({message: ServerMessage.notFound});
         }  

    } catch (error) {
        res.status(500).json({error: error.message});
    }
 }

 async getMessagesByPagination(req,res) {
    const paginationParams = new paginationMessageParams(req.params.id, req.query.page, req.query.limit, req.query.direction ,);
    
    const result = await messageRepository.getMessagesByPagination( paginationParams );

    
    res.status(200).json(result);
 }

 async getNewUser(req,res) {
    await Message.createIndexes();
    const userID = req.params.id;
    const result = await Message.countDocuments({
        'user.userID': userID, 
       'user.userID.received': {$exists: true, $ne: null},
    })
    res.json(result);
 }


}

module.exports = new GetMessagesUseCases();