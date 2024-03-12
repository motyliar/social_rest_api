const SportRepository = require('./sport_repository');
const Sport = require('../../models/Sports/sport');
const ServerError = require('../../core/errors');
const ServerMessage = require('../../core/servermessage');

class SportRepositoryImpl extends SportRepository{
    constructor() {
        super();
        this.sport = Sport;
    }

    async createNewSportUser(userSports) {
        
        const user = await Sport.create(userSports);
        if (user) {
            return user
        } else {
            throw new ServerError(ServerMessage.fail)
        }
    }

    async updateUserSports(userSports) {
        const update = await SportFindOneAndUpdate({"userId" : userSports.userId}, userSports);
        if(update) {
            return update
        } else {
            throw new ServerError(ServerMessage.fail);
        }
    }
}


module.exports = SportRepositoryImpl;