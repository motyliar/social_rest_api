const mongoose = require('mongoose');
const singleMessageModel = require('./message_sub_models');
const Utils = require('../../core/Utils/utils');

const { Schema } = mongoose;

const messageSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
    userID: {type: String, required: true},
    userEmail: {type: String,default: "mail", required: false},
    send: {type: Array, default: [], required: false},
    received:  {type: Array, default: [], required: false},
    account: {type: String, default: 'user', required: true},
    createdAt: {type: String, default: () => Utils.getData()},
    updatedAt: {type: String, default: () => Utils.getData()},
   
    

},);

messageSchema.index({'send.userID': 1}, {multikey: true});
messageSchema.index({'received.userID': 1}, {multikey: true});









const Message = mongoose.model('climbmessage', messageSchema);
Message.createIndexes();
module.exports = Message;

