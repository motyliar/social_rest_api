const mongoose = require('mongoose');
const singleMessageModel = require('./message_sub_models');
const Utils = require('../../core/Utils/utils');

const { Schema } = mongoose;

const messageSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
    fieldName: {type: String, required:true},
    user: {type: [{
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true, required: true },
    userID: {type: String, required: true},
    userEmail: {type: String,default: "mail", required: false},
    send: {type: Array, default: [], required: false},
    received:  {type: Array, default: [], required: false},
    createdAt: {type: String, default: () => Utils.getData()},
    updatedAt: {type: String, default: () => Utils.getData()},
    }], default: [], required: false},
    

},);









const Message = mongoose.model('climbmessage', messageSchema);

module.exports = Message;