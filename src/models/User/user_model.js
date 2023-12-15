const  {messageDataModel, friendsModel, preferencesModel, detailsModel, activeSchema }
 = require('./user_sub_models');
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    userAuthID: {type:String, required:true},
    userName: {type: String, required:true},
    userEmail: {type: String, required:true},
    details: {type: detailsModel.schema,   required:false},
    profileAvatar: {type: String, default: "https://i.pinimg.com/564x/05/4f/e7/054fe717b6a9fe3907cce07956e4e5d8.jpg", required:true},
    messages: {type: [String], default: [], required:false},
    friends: {type: [String], default: [], required:false},
    friendsRequest: {type: [String], required:false},
    userChallengesIDs: {type: [String], default:[], required:false},
    preferences: {type: preferencesModel.schema, default: {mode: true, language: 'pl'}, required:false},
    active: {type: activeSchema, default: () => ({}),  required: true},
    isAdmin: {type: Boolean, required:false, default:false},
    isUser: {type: Boolean, required:false, default:true},
});



const User = mongoose.model('climbUser', userSchema);

module.exports = User;