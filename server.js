require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const userRouter = require('./routes/User/user_routes');
const connectionRouter = require('./routes/Connection/connection_routes');
const authRouter = require('./routes/User/auth');
const messagesRouter = require('./routes/Messages/messages_routes');

const PORT = process.env.PORT || 3000;
const URL = process.env.URL;
const USERROUTECODE = process.env.USERROUTECODE;




app.use(express.json());
app.use(express.urlencoded({extended: false}));




app.use('/', authRouter);
app.use(`${USERROUTECODE}/climbuser`, userRouter);
app.use('/connection', connectionRouter);
app.use('/message',messagesRouter);

mongoose.connect(URL).then(() => {
     app.listen(PORT, () => {
        console.log(`Server on ${PORT}`);
    });
    console.log(`MONGO DB Connect`)}).catch((error) => { console.log(`Connected error: ${error}`);
        
    });

 module.exports = app;   
