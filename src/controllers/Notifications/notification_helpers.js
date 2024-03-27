const Notice = require('../../models/Notice/notice_model');

const notify = (body) =>  {
    const avatar = body.authorAvatar || 'none';
    return {
    "user_id" : body.user_id, 
    "event_id" : body.event_id, 
    "author_id" : body.author_id, 
    "authorAvatar" : avatar,
    "authorName": body.authorName, 
    "category" : body.category,
    "isPositive": body.isPositive,
 };
}

const userTable = (id, notify) => {
    return {
        "user_id" : id,
        "notification": [notify],
    }
}

const update = () => {
    return { "isRead": false}
}

class NoticeResolveHandler {

    async addResolveToNotice(notice, category, user) {
            if(category === 'resolve') {
                const data = await Notice.findOne({'_id': notice});
                data.resolutions.push(user);
                await data.save();
            } 
    }
}

const noticeResolve = new NoticeResolveHandler();




module.exports = { notify, userTable, update, noticeResolve };