const Sport = require('../../../models/Sports/sport');
const SportRepositoryImpl = require('../sport_repository_impl');
const sportRepository = new SportRepositoryImpl();
const ServerMessage = require('../../../core/servermessage');

class PostSportUseCase {

    async createUser(req, res) {
        const sportUser = new Sport(req.body.sport);
        const userId = req.body.sport.userId;
        const user = await Sport.find({"userId": userId});
        

        if(user.length === 0) {
            try {
                await sportRepository.createNewSportUser(sportUser);
                res.status(200).json({message: ServerMessage.success})
             } catch (e) {
                res.status(500).json({message: e.message})};
        } else {
            try {
                await sportRepository.updateUserSports(req.body.sport);
                res.status(200).json({message: ServerMessage.updateSuccess});
            } catch (e) {
                res.status(500).json({message: e.message});
            }
        }

    }
}

module.exports = new PostSportUseCase();
