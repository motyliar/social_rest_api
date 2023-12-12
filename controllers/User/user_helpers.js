const User = require('../../models/User/user_model');
const ServerMessage = require('../../core/servermessage');
const mongoose = require('mongoose');


class UserHelpers {

    async getFriendsList(friends) {
        const friendsObject = [];
        await Promise.all(
            friends.map(async friend => 
                {
              await User.findById(friend).then((value) => {
                
                const object = {"_id" : value._id, "userName": value.userName};
                
                friendsObject.push(object);
            });
            
            })
        );
        return friendsObject;
    }
}


module.exports = new UserHelpers();