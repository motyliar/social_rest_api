const mongoose = require('mongoose');
const Utils = require('../../core/Utils/utils');

function messageTemplate(to, from ,sender, recipient, subject, content) {
    return  {
       
            to: to,
            from: from,
            sender: sender,
            recipient: recipient,
            subject: subject,
            content: content,
            createdAt: Utils.getData(),
            updatedAt: Utils.getData() 
           
} }

class updateMessageParams {
    constructor(userID, messageID, direction, update, field) {

        this.userID = userID;
        this.messageID = messageID;
        this.direction = direction;
        this.update = update;
        this.field = field

    }
}




module.exports = { messageTemplate, updateMessageParams }