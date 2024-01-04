const mongoose = require('mongoose');

const { receivedSchema } = require('../../models/Message/message_sub_models');
const messageModel = mongoose.model('messagess', receivedSchema);

function messageTemplate(to, from ,sender, recipient, subject, content) {
    return new messageModel( {
            
            to: to,
            from: from,
            sender: sender,
            recipient: recipient,
            subject: subject,
            content: content,
            
           
}) }

class updateMessageParams {
    constructor(userID, messageID, direction, update, field) {

        this.userID = userID;
        this.messageID = messageID;
        this.direction = direction;
        this.update = update;
        this.field = field

    }   
    
}

class paginationMessageParams {
    constructor(userID, page, perPage, direction) {
        this.userID = userID;
        this.page = page;
        this.perPage = perPage;
        this.direction = direction
    }
}

function countMessages(userID, direction )  { return [
    { $match: { "userID": userID } },
 
    
    { $unwind: `$${direction}` },
    { $group: {_id: null, sendCount: { $sum: 1 } } }
 ]}

 function paginationQuery(paginationParams)  { 
    return [
    {$match: {"userID": paginationParams.userID}},
    {$project: {
        _id: 0, [`${paginationParams.direction}`]: 1
    }},
    {$unwind: `$${paginationParams.direction}`},
    {$replaceRoot:
    {newRoot: `$${paginationParams.direction}`}},
    {$skip: (paginationParams.page - 1) * paginationParams.perPage}, {$limit: parseInt(paginationParams.perPage, 10)},
]}

 








module.exports = { messageTemplate, updateMessageParams, paginationMessageParams, countMessages, paginationQuery }


