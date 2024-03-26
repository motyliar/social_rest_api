const notify = (body) =>  {
    const avatar = body.authorAvatar || 'none';
    return {
    "user_id" : body.user_id, 
    "event_id" : body.event_id, 
    "author_id" : body.author_id, 
    "authorAvatar" : avatar, 
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


module.exports = { notify, userTable, update };