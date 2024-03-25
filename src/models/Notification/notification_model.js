const mongoose = require("mongoose");

const {Schema} = mongoose;


const NotificationSchema = Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true, required:true},
    user_id: {type: String, required: true},
    notification: {type: [String], default: []},

});

const Notfication = mongoose.model('user-notification', NotificationSchema);

module.exports = Notification;