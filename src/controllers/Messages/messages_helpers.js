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
     
     async getSingleUserMessages(direction, userID) {
        const userData = await Message.aggregate([
           { $match: {
              "fieldName" : direction,
              "user.userID" : userID
           }
     
           },
           {$unwind: "$user"},
           { $match: {
              "user.userID": userID
           }},
           {$project: {
              
                 userID: "$user.userID",
                 userEmail: "$user.userEmail",
                 messages: "$user.messages",
              
           }}
        ]);
        console.log(userData)
        if(userData.length > 0 && userData[0].messages.length > 0) {
        return {"message": "success", "data": userData[0].messages}; 
      } else if(userData.length > 0 && userData[0].messages.length === 0) {
         return {"message" : "no-data"};
      } 
      else {
         return {"message": "not-found"};
      }
     } 

    async getSingleMessage(direction, userID, message){
      const result = await Message.aggregate([
         {$match: {
             "fieldName" : direction,
             "user.userID" : userID
         }},
         {$project: {
           user: {
             $filter: {
               input: "$user", as: "u", cond: {$eq: ["$$u.userID", userID]}
             }
           }
         }},
         {$unwind: "$user"}, 
         { $project: {
           user: {
             userID: "$user.userID",
             userEmail: "$user.userEmail",
             messages: {
               $filter: {
                 input: "$user.messages", as: "m",
                 cond: {$eq: ["$$m._id", new ObjectId(message)]}
               }
             }
           }
         }}
     ]); 

     return result;
   
}
}


module.exports = new MessageHelpers();