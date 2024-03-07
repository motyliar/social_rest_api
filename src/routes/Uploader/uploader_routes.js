
const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../../models/User/user_model');


const uploadRouter = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'avatars/') 
    },
    filename: function (req, file, cb) {
        
        const imageName = req.query.file || 'default'; 

        const extension = path.extname(file.originalname);
        cb(null, imageName + extension);
    }
});

const upload = multer({ storage: storage });


uploadRouter.post('/upload', upload.single('image'), async function(req,res)  {
const file = req.file.filename
if(file) {
   const userUpdate = await User.findByIdAndUpdate(req.query.file, {'profileAvatar': `http://192.168.1.41:3000/avatars/${file}`})
   if(userUpdate) {
    res.status(200).json({file: file});
   } else { res.status(404).json({message: 'cant find user'})}

};
 

})

module.exports = uploadRouter;