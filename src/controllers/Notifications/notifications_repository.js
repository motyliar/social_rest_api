const Notification = require("../../models/Notification/notification_model");
const SingleNotify = require('../../models/Notification/single_notify');
const ServerError = require('../../core/errors');
const ServerMessage = require('../../core/servermessage');
const Utils = require('../../core/Utils/utils');
const { notify, userTable, noticeResolve } = require("./notification_helpers");

// todo 
// * create new function to fetch notification
// * update field

const userID = 'user_id';

class NotificationRepository {
    

     createSingleNotify(body) {
        return new SingleNotify(notify(body));
    }

    async findUser(userId) {
        const user = await Notification.findOne({[userID] : userId});
        if(user) {return user}
        else {return null} ;
    }

    async addSingleNotify(body) {

        const notify = await SingleNotify.create(this.createSingleNotify(body));
        if(notify) {
            const user = await this.findUser(body.user_id);
            if(user) {
                user.notification.push(notify._id);
                await user.save();
                await noticeResolve.addResolveToNotice(body.event_id, body.category, body.user_id);
                return ServerMessage.success;
            } else {
                const user = new Notification(userTable(body.user_id, notify._id));
                await Notification.create(user);
                await noticeResolve.addResolveToNotice(body.event_id, category, body.user_id);
                return ServerMessage.success;
            }
        } else 
        throw new ServerError(ServerMessage.fail);
    }

    async getUserNotifications(user) {
        const data = await Notification.findOne({[userID]: user});
        if(data) {
            return data
        }
        else {
            return this.createUser(user);
        };
    
    }

    async createUser(user) {
        return await Notification.create({[userID]: user});
        
    }
    async findNotifyByList(notifications) {
       return await SingleNotify.find({_id : {$in: notifications}}).sort({"createdAt" : -1});
    }

   

    async getAllNotify(user) {
        const data = await this.getUserNotifications(user)
        if(data) {
            const notifications = data.notification;
            return await this.findNotifyByList(notifications);
        } else {
            throw new ServerError(ServerMessage.fail);
        } 

        
        
    }

    async findNotifyById(notify) {
      try {
        const data = await SingleNotify.findById(notify);
        if(data != null) {
         data.isRead = true;
         data.save();
        } 
        else {
         throw new ServerError(ServerMessage.notFound);
        }
      } catch(e) {
        throw new ServerError({message: e.message});
      }
    }

    async getAllNotifications() {
        const data = await SingleNotify.find({});
        if(data.length > 0) {
            return data;

        } else {
            throw new ServerError(ServerMessage.notFound);
        }
    }

    async deleteNotify(notify, user) {
        const data = await SingleNotify.findByIdAndDelete(notify);
        const deleteFromCollection = await Notification.updateOne(
            {"user_id": user},
            { $pull: {notification: notify}
            
            }
            );

            if(data && deleteFromCollection) {
                return ServerMessage.success;
            } else {
                throw new ServerError(ServerMessage.fail);
            }
    }



    
}


module.exports = NotificationRepository;
