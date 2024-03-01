const mongoose = require('mongoose');
const Utils = require('../../core/Utils/utils')

const { Schema } = mongoose;


// Below is implements of Message Schemas
/// Single message model 
const messagesSchema = Schema({
    fromUser: {type:String, required:true},
    toUser: {type:String, required:true},
    sendData: {type:String, required:true},
    title: {type:String, required:true},
    message: {type:String, required:true},
    isRead: {type:Boolean, required:false, default:false}
});
const messageModel = mongoose.model('message', messagesSchema);

/// User model contains user ID and List of messages from that user
const userMessageSchema = Schema({
    userEmail: {type:String, required:true},
    message: {type: [messageModel.Schema], required:true},
});
const userMessageModel = mongoose.model('userData', userMessageSchema);

/// Two Schema of SEND and RECEVIVED messages contains list of user
const sendMessagesSchema = Schema({
    userMessages: {type: [userMessageModel.Schema], required:false},
});
const sendMessagesModel = mongoose.model('sendMessages', sendMessagesSchema);
const receivedMessagesSchema = Schema({
    userMessages: {type: [userMessageModel.Schema], required: false},
});
const receivedMessagesModel = mongoose.model('receivedMessages', receivedMessagesSchema);

/// Main message schema to split messages for send and recevied
const messageDataSchema = Schema({
    send: {type: [sendMessagesModel.Schema], required:false},
    recived: {type:[receivedMessagesModel.Schema], required:false}
});

const messageDataModel = mongoose.model('messageData', messageDataSchema);





const friendsSchema = Schema({
    userID: {type:String, required:true},
    userAvatar: {type:String, required:true},
    userName: {type:String, required:true},

});

const preferencesSchema = Schema({
    mode: {type: Boolean, required:false},
    language: {type: String, required:false},
});

const detailsSchema = Schema({
    age: {type:Number, required:false},
    gender: {type: String, required:false},
    phone: {type:String, required:false},
});

const activeSchema = Schema({
    isActive: {type: Boolean, default: false, required: true},
    lastLoggedIn: {type: String, default: () => Utils.getData(), required: true}
})


const friendsModel = mongoose.model('friends', friendsSchema);
const preferencesModel = mongoose.model('preferences', preferencesSchema);
const detailsModel = mongoose.model('details', detailsSchema);



module.exports = { messageDataModel, friendsModel, preferencesModel, detailsModel, activeSchema};


