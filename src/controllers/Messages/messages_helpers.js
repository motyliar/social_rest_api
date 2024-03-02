const Message = require('../../models/Message/message_model');
const { ObjectId} = require('mongodb');
const mongoose = require('mongoose');
const User = require('../../models/User/user_model')
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
         async convertData(result, direction) {
            const listOFMessages = result[direction];
            console.log(typeof listOFMessages)
            const idsSet = new Set();
            listOFMessages.forEach(value => idsSet.add(value.from));
        
            const ids = [...idsSet];
            const avatars = [];
            for (const value of ids) {
                try {
                    const user = await User.findById(value);
                    avatars.push({"id" : user.id, "profileAvatar" : user.profileAvatar});
                } catch (error) {
                    console.error(`Błąd podczas pobierania danych użytkownika o identyfikatorze ${value}:`, error);
                    avatars.push(null); // lub inna wartość, która oznacza brak danych
                }
            }
            return avatars;
         }
     



     
     
  
   
}





module.exports =  new MessageHelpers();