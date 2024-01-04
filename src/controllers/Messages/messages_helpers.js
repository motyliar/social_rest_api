const Message = require('../../models/Message/message_model');
const { ObjectId} = require('mongodb');
const mongoose = require('mongoose');
class MessageHelpers {

   async sendSingleMessage(direction, recipient, message)  {
      const data =  await Message.findOneAndUpdate({
         "fieldName" : "message" , "user.userID": recipient
         }, {$push : {[`user.$.${direction}`] : message}}, {new : true});
      return data;
     }

     async sendMessageToMultipleUser(recipients, userID, message) {
      const data = await Promise.all(
         recipients.map(async recipient => {
            await Message.updateMany({
               "userID": recipient
            }, {$push: {"received": message}}, {new: true});
            return recipient;
            
         }));
         console.log(data);
         if(data.length === recipients.length) {
            await Message.findOneAndUpdate({
               "userID" : userID
            }, {$push: {"send" : message}}) 
            return data;

      
   
         } else {
            return null;
         }       
     }

     
     
  
   
}

function countMessages(userID, direction )  { return [
   { $match: { "userID": userID } },

   
   { $unwind: `$${direction}` },
   { $group: {_id: null, sendCount: { $sum: 1 } } }
]}



module.exports =  new MessageHelpers();