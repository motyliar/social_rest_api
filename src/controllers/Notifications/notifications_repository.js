const Notification = require("../../models/Notification/notification_model");
const SingleNotify = require('../../models/Notification/single_notify');
const ServerError = require('../../core/errors');
const ServerMessage = require('../../core/servermessage');
const Utils = require('../../core/Utils/utils');
const { notify, userTable } = require("./notification_helpers");
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
                return ServerMessage.success;
            } else {
                const user = new Notification(userTable(body.user_id, notify._id))
                await Notification.create(user);
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
       return await SingleNotify.find({_id : {$in: notifications}});
    }

   

    async getAllNotify(user) {
        const data = await this.getUserNotifications(user)
        if(data) {
            const notifications = data.notification;
            return allNotify = await this.findNotifyByList(notifications);

        } else {
            throw new ServerError(ServerMessage.fail);
        } 
        
    }



    
}


module.exports = NotificationRepository;