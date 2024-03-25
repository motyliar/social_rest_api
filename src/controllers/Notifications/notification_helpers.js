const notify = (body) =>  {
    const avatar = body.avatar || 'none';
    return {
    "user_id" : body.user_id, 
    "event_id" : body.event_id, 
    "author_id" : body.author_id, 
    "authorAvatar" : avatar, 
    "category" : body.category
 };
}

const userTable = (id, notify) => {
    return {
        "user_id" : id,
        "notification": [notify],
    }
}


module.exports = { notify, userTable };