const ServerError = require('../../core/errors');
const ServerMessage = require('../../core/servermessage');
const Utils = require('../../core/Utils/utils');
const NotificationRepository = require('./notifications_repository');

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

module.exports = new AddNotificationUseCase();