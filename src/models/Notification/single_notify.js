const mongoose = require("mongoose");
const Utils = require('../../core/Utils/utils');
const { Schema } = mongoose;


const SingleNotifySchema = Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true, required:true},
    user_id: {type: String, required: true},
    event_id: {type: String, default: 'none'},
    author_id: {type: String, required: true},
    authorAvatar: {type: String, required : true},
    category: {type: String, required: true},
    createdAt: {type: String, default: () => Utils.getData(), required: true}


});

const SingleNotify = mongoose.model('singleNotify', SingleNotifySchema);

module.exports = SingleNotify;