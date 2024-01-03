
const { updateMessageParams } = require('../message_template');
const ServerMessage = require('../../../core/servermessage');
const MessageRepositoryImpl = require('../messages_repository_impl');
const messageRepository = new MessageRepositoryImpl();


class UpdateMessagesUseCases {

    async updateMessage(req, res) {
        const updateParams = new updateMessageParams(
            req.params.id,
            req.body.messageID,
            req.body.direction,
            req.body.update,
            req.body.field)
    
    try {
        const result = await messageRepository.updateSingleMessage(updateParams);
        if(result.message === ServerMessage.success) {
            res.status(200).json(result)
        } else {
            res.status(404).json(result);
        }
    } catch(error) {
        res.status(500).json({error: error.message});
    }}}


module.exports = new UpdateMessagesUseCases();