
const express = require('express');
const multer = require('multer');
const path = require('path');


const uploadRouter = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/') 
    },
    filename: function (req, file, cb) {
        
        const imageName = req.query.file || 'default'; 
        console.log(req.query.file);
        const extension = path.extname(file.originalname);
        cb(null, imageName + extension);
    }
});

const upload = multer({ storage: storage });


uploadRouter.post('/upload', upload.single('image'), function(req,res) {
console.log(req.body);
  res.status(200).json({message: "success"});

})

module.exports = uploadRouter;