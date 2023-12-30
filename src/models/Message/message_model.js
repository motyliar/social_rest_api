const mongoose = require('mongoose');
const singleMessageModel = require('./message_sub_models');

const { Schema } = mongoose;

const messageSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
    fieldName: {type: String, required:true},
    user: {type: [{
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
    userID: {type: String, required: true},
    userEmail: {type: String,default: "mail", required: false},
    send: {type: [{
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
        to: {type: String, required:true},
        from: {type:String, required:true},
        sender: {type: String, required: true},
        recipient: {type: String, required: true},
        subject: {type:String, required:true},
        content: {type:String, required: true},
        isRead:{type: Boolean, required: false, default:false},
        isReply:{type: Boolean, required: false, default:false},
        createdAt: {type: String, default: () => Utils.getData(), required: false},
        updatedAt: {type: String, default: () => Utils.getData(), required: false},

    }], default: [], required: false},
    received:  {type: [{
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
        to: {type: String, required:true},
        from: {type:String, required:true},
        sender: {type: String, required: true},
        recipient: {type: String, required: true},
        subject: {type:String, required:true},
        content: {type:String, required: true},
        isRead:{type: Boolean, required: false, default:false},
        isReply:{type: Boolean, required: false, default:false},
        createdAt: {type: String, default: () => Utils.getData(), required: false},
        updatedAt: {type: String, default: () => Utils.getData(), required: false},
    }], default: [], required: false},
    createdAt: {type: String, default: () => Utils.getData()},
    updatedAt: {type: String, default: () => Utils.getData()},
    }], default: [], required: false},
    

});






const Message = mongoose.model('climbmessage', messageSchema);

module.exports = Message;