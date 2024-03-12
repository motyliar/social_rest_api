const User = require('../../models/User/user_model');
const ServerMessage = require('../../core/servermessage');
const mongoose = require('mongoose');
const UserHelpers = require('./user_helpers');

class UserAction {

    async getUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if(user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message : ServerMessage.UserNotFound});
            }

        } catch(e) {
            res.status(500).json({message : e.message});
        }

    };

    async getAll (req,res) {
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch(e) {
            res.status(500).json({message: e});
        }
    }

    async postUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.status(200).json({message: ServerMessage.success, user: newUser});
        } catch(e) {
            res.status(500).json({message: e.message});
        }
    }
    async deleteUser (req, res) {
        try {
            const {id} = req.params
            const user = await User.findByIdAndDelete(id);
           if (!user) {
            return res.status(404).json({message: ServerMessage.userNotFound});
           }
           res.status(200).json({message: ServerMessage.delete, deleteUser: user});
        } catch(error) {
            res.status(500).json({message: error.message});
        }
    }

    async updateUser (req, res) {
        try {
            const { id } = req.params
            const user = await User.findByIdAndUpdate(id, req.body);
            if(!user) {
                res.status(404).json({message : kUserNotFound}) 
            } else  {
            const newUser = await User.findById(id);
            
            res.status(200).json(newUser)}
        } catch(error) {
            res.status(500).json({message: error.message})
        }
    }

    async addChallegesID (req, res) {
        
      
        try {
            const { id } = req.params;
            console.log(id);
            const newChallenge = req.body.userChallengesIDs;
             const user = await User.findById(id);
             console.log(user);

             if(!user) {
                return res.status(404).json({message: ServerMessage.userNotFound});
             } else {
            console.log(user);
             user.userChallengesIDs.push(newChallenge);
             await user.save();
            console.log(user);
             res.status(200).json({message: ServerMessage.success});}
        } catch(err) {
            return res.status(500).json({message: err});
    } 
    }

    async addMessages (req, res) {
        const action = req.params.action;
        try{
            const { id } = req.params;
            const user = await User.findById(id);
            if(!user) {
                return res.status(404).json({message: ServerMessage.userNotFound});
            } else {
                
                if(action == 'add'){
                    const newMessage = req.body.messages;
                    user.messages.push(newMessage);
                    await user.save();
                
                    res.status(201).json({message: ServerMessage.success, user: user});
            } else if(action == 'delete'){
                    const deleteMessages = req.body.messages;
                    user.messages.pull(deleteMessages);
                    await user.save();
                    res.status(200).json({message: ServerMessage.delete, user: user});

            }
           
            } 
        } catch(err) {
                return res.status(500).json({message: err});
        } 
        }
        async friends (req, res) {
            const action = req.params.action;
            try{
                const { id } = req.params;
                const user = await User.findById(id);
                if(!user) {
                    return res.status(404).json({message: ServerMessage.userNotFound});
                } else {
                    
                    if(action == 'add'){
                        const newFriends = req.body.friends;
                        user.friends.push(newFriends);
                        await user.save();
                    
                        res.status(201).json({message: ServerMessage.success, user: user});
                } else if(action == 'delete'){
                        const deleteFriends = req.body.friends;
                        user.friends.pull(deleteFriends);
                        await user.save();
                        res.status(200).json({message: ServerMessage.delete, user: user});
    
                }
               
                } 
            } catch(err) {
                    return res.status(500).json({message: err});
            } 
            }
            async getFriends(req,res) {
                const { id } = req.params;
                let friendsObjects = [];
                const partOfWordToFind = req.query.word;

                const result = await User.findById(id);

                const friends = result.friends;

                const findFriends = await UserHelpers.getFriendsList(friends);
                const friendFilter = findFriends.filter(friend => friend.userName.startsWith(partOfWordToFind) )
                
                res.json(friendFilter);
            }

            async getFriendsSize(req,res) {
                const { id } = req.params;
                console.log(id);
                try {

                    const result = await User.findById(id, {friends: 1});

                    if(result){
                        res.status(200).json(result.friends.length);
                    } else {
                        res.status(404).json({message: ServerMessage.userNotFound});
                    }


                } catch(error) {
                    res.status(500).json({error: error});
                }
            }

            async findUserByName (req, res) {
                const { name } = req.params;
                try {
                    const users = await User.find({userName : { $regex : new RegExp(name, "i") }});
                    const friends = [];
                    users.forEach((friend) =>friends.push({_id: friend._id,
                        userName: friend.userName,
                       profileAvatar: friend.profileAvatar,
                       isActive: friend.active.isActive,
                       lastLoggedIn: friend.active.lastLoggedIn,} ));
                    res.status(200).json(friends);

                } catch (error) {
                    res.status(500).json({error})
                }
            }

            async friendsRequest (req, res) {
                const action = req.params.action;
                try{
                    const { id } = req.params;
                    const user = await User.findById(id);
                    if(!user) {
                        return res.status(404).json({message: ServerMessage.userNotFound});
                    } else {
                        
                        if(action == 'add'){
                            const newRequest = req.body.friendsRequest;
                            
                            user.friendsRequest.push(newRequest);
                            await user.save();
                        
                            res.status(201).json({message: ServerMessage.success, user: user});
                    } else if(action == 'delete'){
                            const deleteRequest = req.body.friendsRequest;
                            user.friendsRequest.pull(deleteRequest);
                            await user.save();
                            res.status(200).json({message: ServerMessage.delete, user: user});
        
                    }
                   
                    } 
                } catch(err) {
                        return res.status(500).json({message: err});
                } 
                }

                async friendsPagination (req, res) {
                    
                    const { id } = req.params;
                    
                    const page = parseInt(req.query.page) || 1;
                    const pageSize = parseInt(req.query.pageSize) || 5;
                    const list = req.query.list;
                    // TODO dodanie uniwersalości w paginacji tak aby można to bylo wykorzystać w większej liczbie zapytań a nie dublować za każdym razem
                    try {
                        const user = await User.findById(id);
                        if(!user) {
                            return res.status(404).json({message: ServerMessage.userNotFound});
                        }
                        const friendCount = user.friends.length;
                        const totalPages = Math.ceil(friendCount / pageSize);

                        if(page < 1 || page > totalPages) {
                            return res.status(400).json({message: ServerMessage.params});
                        }
                        const startIndex = (page - 1) * pageSize;
                        const endIndex = page * pageSize;
                        
                        const paginatedFriend = user.friends.slice(startIndex, endIndex);

                        res.json({friends: paginatedFriend, currentPage: page});

                    } catch(err)
                     {return res.status(500).json({message: err})};

                }

                async getUserFriends(req, res) {
                    const { id } = req.params;
                    const user = await User.findById(id);

                    if(user && user.friends.length > 0) {
                        const friendsList = user.friends;
                        const findUsers = await User.find({"_id": {$in: friendsList}})
                        const users = [];
                        findUsers.forEach((friend) =>
                     users.push({
                        _id: friend._id,
                         userName: friend.userName,
                        profileAvatar: friend.profileAvatar,
                        isActive: friend.active.isActive,
                        lastLoggedIn: friend.active.lastLoggedIn,
                         }));

                       res.status(200).json(users);  
                    } else {
                        res.status(404).json({message: ServerMessage.notFound});
                    }
                    

                    
                    
                    
                    }
                }
        
    





module.exports = new UserAction();
