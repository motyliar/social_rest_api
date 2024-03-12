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
            throw new ServerError(ServerMessage.wrong)
        }
    }

    async updateUserSports(userSports) {
        const update = await Sport.findOneAndUpdate({"userId" : userSports.userId}, userSports);
        if(update) {
            return update
        } else {
            throw new ServerError(ServerMessage.fail);
        }
    }

    async getAllUsers() {
        const users = await Sport.find({});
        if(users) {
            return users;
        } else {
            throw new ServerError(ServerMessage.fail);
        }
    }

    async getSingleUser(userId) {
        const user = await Sport.find({"userId" : userId});
        if(user.length > 0) {
            return user;
        } else {
        const newUser = new Sport({"userId" : userId})
           const createUser = await this.createNewSportUser(newUser);
           return createUser;
        }
    }

    async getSimilarUsers(sportName, value) {
    
       
        const users = await Sport.find({[sportName] : {$gt: value}});
        if(users) {
            return users;
        } else {
            throw ServerError(ServerMessage.fail);
        }
    }
}


module.exports = SportRepositoryImpl;