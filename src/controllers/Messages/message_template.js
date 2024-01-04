const mongoose = require('mongoose');

const { receivedSchema } = require('../../models/Message/message_sub_models');
const messageModel = mongoose.model('messagess', receivedSchema);

function messageTemplate(to, from ,sender, recipient, subject, content) {
    return new messageModel( {
            
            to: to,
            from: from,
            sender: sender,
            recipient: recipient,
            subject: subject,
            content: content,
            
           
}) }

class updateMessageParams {
    constructor(userID, messageID, direction, update, field) {

        this.userID = userID;
        this.messageID = messageID;
        this.direction = direction;
        this.update = update;
        this.field = field

    }   
    
}

class paginationMessageParams {
    constructor(userID, page, perPage, direction) {
        this.userID = userID;
        this.page = page;
        this.perPage = perPage;
        this.direction = direction
    }
}






module.exports = { messageTemplate, updateMessageParams, paginationMessageParams }


