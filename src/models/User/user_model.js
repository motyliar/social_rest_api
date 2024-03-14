const  {messageDataModel, friendsModel, preferencesModel, detailsModel, activeSchema }
 = require('./user_sub_models');
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    userAuthID: {type:String, required:true},
    userName: {type: String, required:true},
    userEmail: {type: String, required:true},
    details: {type: detailsModel.schema,   required:false},
    profileAvatar: {type: String, default: "https://cdn2.iconfinder.com/data/icons/people-flat-design/64/Sport-Athlete-Sportsman-Player-Exercise-Fitness-Avatar-512.png", required:true},
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