

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


    /**
     * 
     * @param {String} userID id of user from app 
     * @param {String} recipients list of many recipients to send message
     * @param {Object} message object of message, creating like message template  
     */
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

     /**
     * Creating new Message object
     * @notes - Only for Admin function
     * @param {newField} - creating new message object
     * @req should send {"fieldName" : "nameOfTable"}
     * @returns {newField} - return new object
     */
     async createMessageTable(req,res) {
        const newField = await Message.create(req.body);
        res.status(200).json(newField);
       
        } 


}

module.exports =  new PostMessagesUseCases();