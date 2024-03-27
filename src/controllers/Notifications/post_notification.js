const ServerError = require('../../core/errors');
const ServerMessage = require('../../core/servermessage');
const Utils = require('../../core/Utils/utils');
const NotificationRepository = require('./notifications_repository');
const Notice = require('../../models/Notice/notice_model');

const notifications = new NotificationRepository();


class AddNotificationUseCase {

    async execute(req,res) {
        const body = req.body;
         
        try {
        await notifications.addSingleNotify(body);
      
        res.status(200).json({message: ServerMessage.success});

        } catch (e) 
        {
            res.status(500).json({message: e.message}
                );}
    }


}

class FetchNotifyUseCase {
    async execute(req, res) {
        const user = req.params.id;
        try {
            const data = await notifications.getAllNotify(user);
            res.status(200).json(data);
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    }
}

class UpdateIsReadUseCase {
    async execute(req,res) {
        try {
           await notifications.findNotifyById(req.params.id);
           res.status(200).json({message: ServerMessage.success});     
        }
        catch(e) {
            res.status(500).json({message: e.message});
        }
    }
}

class GetAllNotifications {
    async execute(req,res) {
        try {
           const data = await notifications.getAllNotifications();
            res.status(200).json(data);
        } catch(e) {
            res.status(500).json({error: e.message});
        }
    }
}


const addNotificationUseCase = new AddNotificationUseCase();
const fetchNotifyUseCase = new FetchNotifyUseCase(); 
const updateIsReadUseCase = new UpdateIsReadUseCase();
const getAllNotifications = new GetAllNotifications();

module.exports = {
    addNotificationUseCase,
    fetchNotifyUseCase,
    updateIsReadUseCase,
    getAllNotifications,
}
