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
}


module.exports = new GetSportUseCase();