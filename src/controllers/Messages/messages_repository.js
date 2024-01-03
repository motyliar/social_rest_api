

const ServerError = require('../../core/errors');
class MessagesRepository {

    /**
     * Below are contracting all get function for Message schema
     @GET
     * Function to get all messages from DB
     */

     async getAllMessages() {
        throw new ServerError("This method should be overridden in subclasses");
     }

     // get user messages from DB by send or received messages

     async getUserMessages() {
        throw new ServerError("This method should be overridden in subclasses");
     }

     // get single message from user

     async getSingleMessage() {
        throw new ServerError("This method should be overridden in subclasses");
     }
    
     // get user messages from DB (send or received) by pagination 

     async getMessagesByPagination() {
        throw new ServerError("This method should be overridden in subclasses");
     }

     /**
      * All function below are for post function in Messages schema
      * @POST
      */

     // send single message to one user
     async sendNewMessageToOne() {
        throw new ServerError("This method should be overridden in subclasses");
     }

     // send single message to many users

     async sendNewMessageToMany() {
        throw new ServerError("This method should be overridden in subclasses");
     }

     /**
      * @DELETE
      */
     async deleteMessage() {
        throw new ServerError("This method should be overridden in subclasses");
     }

     /**
      * @PUT
      */
    async updateSingleMessage() {
        throw new ServerError("This method should be overridden in subclasses");
    }








    
}


module.exports = MessagesRepository;