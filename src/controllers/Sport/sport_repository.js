const ServerError = require('../../core/errors');

class SportRepository {

    async createNewSportUser() {
        throw new ServerError("This method should be overridden in subclasses");
    }

    async updateSports() {
      throw new ServerError("This method should be overridden in subclasses");
    }

    async getAllUsers() {
      throw new ServerError("This method should be overridden in subclasses");
    }

    async getSingleUser() {
      throw new ServerError("This method should be overridden in subclasses");
    }

    async getSimilarUsers() {
      throw new ServerError("This method should be overridden in subclasses");
    }
}


module.exports = SportRepository;