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




module.exports = { messageTemplate, updateMessageParams }


// [{
//     _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: false },
//     to: {type: String, required:true},
//     from: {type:String, required:true},
//     sender: {type: String, required: true},
//     recipient: {type: String, required: true},
//     subject: {type:String, required:true},
//     content: {type:String, required: true},
//     isRead:{type: Boolean, required: false, default:false},
//     isReply:{type: Boolean, required: false, default:false},
//     createdAt: {type: String, default: () => Utils.getData(), required: false, },
//     updatedAt: {type: String, default: () => Utils.getData(), required: false, },
// }]