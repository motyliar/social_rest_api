require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
const KEY = process.env.KEY;

const authenticate = (req,res,next)=> {
    try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jsonwebtoken.verify(token, `${KEY}`);

    req.userEmail = decode;
    next();
} catch(e) {
    res.json({message: "not authenticate", error: e});
} 
}

module.exports = authenticate;