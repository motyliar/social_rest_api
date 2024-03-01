require('dotenv').config();
const User = require('../../models/User/user_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const KEY = process.env.KEY;
const Utils = require('../../core/Utils/utils');
const ServerMessage = require('../../core/servermessage');
const Message = require('../../models/Message/message_model');
const { singleUserModel, messageModel } = require('../../models/Message/message_sub_models');



const userRegister = async (req, res, next) => {

    let idToSave;
    bcrypt.hash(req.body.userAuthID, 10, async function(err, hashedPass) {
        if(err) {
            res.status(500).json({err});
        }
       const newUser = new User ({
            userAuthID: hashedPass,
            userName: req.body.userName,
            userEmail: req.body.userEmail,
          

        });

      await newUser.save().then(newUser =>  {
       
        res.status(200).json({message: 'success', id: newUser._id},
       
       
        )});
          idToSave = newUser._id;
          const tableUser = new Message({

            "userID": idToSave,
            "userEmail": req.body.userEmail,
            "send": [],
            "received": [],

        });
                const send = await Message.create(tableUser);
                
               
                
               
    });

    

} 
    const login = async (req,res) => {
        console.log(req.body);
        try {
            const user = await User.findOne({'userEmail': req.body.userEmail});
            if(user)  {
                user.active.isActive = true;
                user.active.lastLoggedIn = Utils.getData();
                await user.save();
                bcrypt.compare(req.body.userAuthID, user.userAuthID, function(err, result){
                    if(err) {
                        res.status(500).json({ error: 'server-error'})
                    }
                    if(result)  {
                        let token = jwt.sign({userEmail: user.userEmail}, `${KEY}`,  {expiresIn: '20h'})
                        let id = user._id
                        res.status(200).json({userEmail: user.userEmail ,userAuthID: user.userAuthID , token: token, id: id, user: user})
                    } else { res.status(401).json({message: 'wrong-password'})}
                    
                })}
         else{ res.status(400).json({message: 'user-not-found'})}
            }
         catch(err) {
            res.status(500).json({error: 'server-error'});
    } 
    } 

    const logout = async (req,res) => {
        try {
            const user = await User.findOne({"userEmail": req.body.userEmail});
            if(user) {
                user.active.isActive = false;
                await user.save();
                res.status(200).json({message: ServerMessage.logout, active: user.active.isActive});
            } else {
                res.status(404).json({message: ServerMessage.notFound});
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }


    module.exports = {userRegister, login, logout}





