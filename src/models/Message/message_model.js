const mongoose = require('mongoose');
const singleMessageModel = require('./message_sub_models');

const { Schema } = mongoose;

const messageSchema = Schema({
    fieldName: {type: String, required:true},
    user: {type: [singleMessageModel.schema], default: [], required: false}

});






const Message = mongoose.model('climbmessage', messageSchema);

module.exports = Message;