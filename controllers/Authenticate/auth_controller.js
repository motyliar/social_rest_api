require('dotenv').config();
const User = require('../../models/User/user_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const KEY = process.env.KEY;



const userRegister = (req, res, next) => {
    bcrypt.hash(req.body.userAuthID, 10, function(err, hashedPass) {
        if(err) {
            res.status(500).json({err});
        }
        const newUser = new User ({
            userAuthID: hashedPass,
            userName: req.body.userName,
            userEmail: req.body.userEmail,

        });

       newUser.save().then(newUser => {res.status(200).json({message: 'success', id: newUser._id})});

        
    });
} 
    const login = async (req,res) => {
        try {
            const user = await User.findOne({'userEmail': req.body.userEmail});
            if(user) {
                bcrypt.compare(req.body.userAuthID, user.userAuthID, function(err, result){
                    if(err) {
                        res.status(500).json({ error: 'server-error'})
                    }
                    if(result) {
                        let token = jwt.sign({userEmail: user.userEmail}, `${KEY}`,  {expiresIn: '20h'})
                        let id = user._id
                        let login = user.name
                        res.status(200).json({userEmail: user.userEmail ,userAuthID: user.userAuthID , token: token, id: id,})
                    } else { res.status(401).json({message: 'wrong-password'})}
                    
                })}
         else{ res.status(400).json({message: 'user-not-found'})}
            }
         catch(err) {
            res.status(500).json({error: 'server-error'});
    } 
    } 


    module.exports = {userRegister, login}





