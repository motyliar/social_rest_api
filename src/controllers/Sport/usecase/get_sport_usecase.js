const ServerMessage = require('../../../core/servermessage');
const SportRepositoryImpl = require('../sport_repository_impl');
const sportRepository = new SportRepositoryImpl();

class GetSportUseCase {


    async getUsers(req, res) {
        try {
            const users = await sportRepository.getAllUsers();
            res.status(200).json(users);
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    }

    async getSingleUser(req, res) {
        const userId = req.params.id;
        try {
            const user = await sportRepository.getSingleUser(userId);
            res.status(200).json(user);
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    }

    async getSimilarUsers(req,res) {
        const sport = req.params.sport;
        const value = req.params.value || 0;

        try {
            const users = await sportRepository.getSimilarUsers(sport, value);
            res.status(200).json(users);
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    }
}


module.exports = new GetSportUseCase();