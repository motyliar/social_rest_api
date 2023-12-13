const mongoose = require('mongoose');
const Utils = require('../../core/Utils/utils');

const { Schema } = mongoose;



const messageSchema = Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
    to: {type: String, required:true},
    from: {type:String, required:true},
    subject: {type:String, required:true},
    content: {type:String, required: true},
    isRead:{type: Boolean, required: false, default:false},
    isReply:{type: Boolean, required: false, default:false},
    datestamp: {type: String, default: () => Utils.getCurrentDay(), required: false},
    timestamp: {type: String, default: () => Utils.getCurrentTime(), required: false},
});

const messageModel = mongoose.model('messageModel', messageSchema);



const singleUserSchema = Schema({
    userID: {type: String, required: true},
    userEmail: {type: String,default: "mail", required: false},
    messages: {type: [messageModel.schema], default: [], required: false},
    createdAt: {type: String, default: () => Utils.getData()},
    updatedAt: {type: String, default: () => Utils.getData()},
    
});

const singleUserModel = mongoose.model('userMessage', singleUserSchema);



module.exports = { singleUserModel, messageModel };



