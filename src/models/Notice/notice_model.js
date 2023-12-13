const mongoose = require('mongoose');
const Utils = require('../../core/Utils/utils');
const {contentSchema, commentsSchema} = require('./notice_submodel');


const { Schema } = mongoose;

const noticeSchema = Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true, required:true},
    author: {type: String, required: true},
    authorId: {type: String, required: true},
    category: {type: String, required: true},
    content: {type: contentSchema, required: true},
    comments: {type: [commentsSchema], default: [], required: false,},
    createdAt: {type: String, default: () => Utils.getData(), required: true},
    updatedAt: {type: String, default: () => Utils.getData(), required: true},
});

noticeSchema.pre('save', function (next) {
    this.updatedAt = Utils.getData();
    next();
});

const Notice = mongoose.model('climbnotice', noticeSchema);


module.exports = Notice;

