require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
app.use(express.urlencoded({ extended: true }));
const userRouter = require('../src/routes/User/user_routes');
const connectionRouter = require('../src/routes/Connection/connection_routes');
const authRouter = require('../src/routes/User/auth');
const messagesRouter = require('../src/routes/Messages/messages_routes');
const noticeRouter = require('../src/routes/Notice/notice_router');
const uploadRouter = require('../src/routes/Uploader/uploader_routes')
const sportRouter = require('../src/routes/Sport/sport_router');

const PORT = process.env.PORT || 3000;
const URL = process.env.URL;
const USERROUTECODE = process.env.USERROUTECODE;

const path = require('path');


const avatarsPath = path.join(__dirname, '..', 'avatars');
const imagesPath = path.join(__dirname,'..', 'app_images');


app.use('/avatars/', express.static(avatarsPath));
app.use('/app_images/', express.static(imagesPath));

app.use(helmet());
app.use(compression());
app.use((req, res, next) => {
  const timestamp = Date.now();
  const dateNow = new Date(timestamp)
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
   console.log(`Data: ${dateNow.toLocaleString()}\n Method: ${req.method} URL: ${req.url}`);
   next();
 });
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use((err, req, res, next) => {
   console.error(err.stack);
 
   res.status(500).json({
     status: 'error',
     message: 'Something went wrong on the server.'
   });
   console.log(res)
   next()
 });



 
app.use('/', authRouter);
app.use(`${USERROUTECODE}/climbuser`, userRouter);
app.use('/connection', connectionRouter);
app.use('/message',messagesRouter);
app.use('/notice', noticeRouter);
app.use('/up', uploadRouter);
app.use('/sports', sportRouter);


mongoose.connect(URL).then(() => {
     app.listen(PORT, () => {
        console.log(`Server on ${PORT}`);
    });
    console.log(`MONGO DB Connect`)}).catch((error) => { console.log(`Connected error: ${error}`);
        
    });

 module.exports = app;   
