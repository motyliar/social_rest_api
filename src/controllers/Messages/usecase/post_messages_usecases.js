

const { messageTemplate } = require('../message_template');
const ServerMessage = require('../../../core/servermessage');
const MessageRepositoryImpl = require('../messages_repository_impl');
const messageRepository = new MessageRepositoryImpl();

const SEND_DIRECTION = "send";
const RECEIVED_DIRECTION = "received";


class PostMessagesUseCases {


    async sendNewMessageToOne(req,res) {
        const sender = req.body.message.from
        const recipient = req.body.message.to;
        const message = req.body.message;
        const messageToSend = messageTemplate(message.to, message.from, message.sender, message.recipient, message.subject, message.content,);

        try {
            const result = await messageRepository.sendNewMessageToOne(sender, recipient, messageToSend);
            if(result) {
                res.status(200).json(result)
            } else {
                res.status(404).json({message: ServerMessage.notFound});
            }

        } catch(error) {
            res.status(500).json({error: error.message});
        }

        
        
    
    }

    async sendNewMessageToMany(req, res) {
        const userID = req.body.message.from;
        const recipients = req.body.recipients;
        const message = req.body.message;
        const messageToSend = messageTemplate(
            message.to, message.from, message.sender, message.recipient, message.subject, message.content,
        );
        try {

            const result = await messageRepository.sendNewMessageToMany(recipients, userID, messageToSend);
            if(result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({message: ServerMessage.notFound});
            }

        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }


}

module.exports =  new PostMessagesUseCases();