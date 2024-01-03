const mongoose = require('mongoose');
const Utils = require('../../core/Utils/utils');

const { Schema } = mongoose;



const sendSchema = Schema({
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
});

const messageModel = mongoose.model('messageModel', sendSchema);
const receivedSchema = Schema({
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
});




const singleUserSchema = Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
    userID: {type: String, required: true},
    userEmail: {type: String,default: "mail", required: false},
    send: {type: [sendSchema], default: [], required: false},
    received:  {type: [receivedSchema], default: [], required: false},
    createdAt: {type: String, default: () => Utils.getData()},
    updatedAt: {type: String, default: () => Utils.getData()},
    
});

const singleUserModel = mongoose.model('userMessage', singleUserSchema);



module.exports = { receivedSchema };



