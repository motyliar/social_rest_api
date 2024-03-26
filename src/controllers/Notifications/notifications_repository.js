const Notification = require("../../models/Notification/notification_model");
const SingleNotify = require('../../models/Notification/single_notify');
const ServerError = require('../../core/errors');
const ServerMessage = require('../../core/servermessage');
const Utils = require('../../core/Utils/utils');
const { notify, userTable } = require("./notification_helpers");


const userID = 'user_id';

class NotificationRepository {
    

     createSingleNotify(body) {
        return new SingleNotify(notify(body));
    }

    async addSingleNotify(body) {

        const notify = await SingleNotify.create(this.createSingleNotify(body));
        if(notify) {
            const user = await Notification.findOne({[userID] : body.user_id},);
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
}


module.exports = NotificationRepository;