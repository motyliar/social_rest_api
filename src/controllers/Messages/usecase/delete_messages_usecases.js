const MessageRepositoryImpl = require('../messages_repository_impl');
const messageRepository = new MessageRepositoryImpl();
const ServerMessage = require('../../../core/servermessage');


class DeleteMessagesUseCases {


    /**
     * 
     * @param {String} userID id of user to delete messages from DB 
     * @param {Array} idToDelete list of messages id's to delete
     * @param {String} direction send or received array 
     */
    async deleteMessages(req, res) {
        const userID = req.params.id;
        const direction = req.body.direction;
        const idToDelete = req.body.delete;
        console.log(req.body);
        try {
            const result = await messageRepository.deleteMessage(userID, direction, idToDelete);

            if(result.message === ServerMessage.success) {
                res.status(200).json(result);
            } else {
                res.status(404).json(result);
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }


}

module.exports = new DeleteMessagesUseCases();