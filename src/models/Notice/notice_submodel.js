const mongoose = require('mongoose');
const Utils = require('../../core/Utils/utils');

const { Schema } = mongoose;


const contentSchema = Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    when: {type: String, required: false},
    price: {type: Number, required: false},

});



const commentsSchema = Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true, required: true},
    user: {type: String, required: true},
    userId: {type: String, required:true},
    content: {type: String, required: true},
    likes: {type: Number, default: 0, required: true},
    createdAt: {type: String, default: () => Utils.getData(), required: true},
    updatedAt: {type: String, default: () => Utils.getData(), required: true},



});
    commentsSchema.method.update = function() {
        this.updatedAt = Utils.getData();
}
const Comment = mongoose.model('comment', commentsSchema);



module.exports = { 
    contentSchema,
    commentsSchema, Comment
}