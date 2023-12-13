const ServerMessage = require('../servermessage');

const ONE_MONTH = 1;
const INDEX_TO_CUT = 2;

class Utils {

    _addSingleNumberZero(number) {
        
        const result =('0' + number).slice(-INDEX_TO_CUT);
        return(result);
        
    }

      getCurrentTime() {
        const date = new Date();
        const getMinutes = this._addSingleNumberZero(date.getMinutes());
        const getSeconds = this._addSingleNumberZero(date.getSeconds());
        const getHours = this._addSingleNumberZero(date.getHours());
        const currentTime = `${getHours}:${getMinutes}:${getSeconds}`;
        return currentTime;
    }

     getCurrentDay() {
        const date = new Date();
        const currentYear = date.getFullYear();
        const currentMonth = this._addSingleNumberZero(date.getMonth() +ONE_MONTH);
        const currentDay = this._addSingleNumberZero(date.getDate());
        const currentDate = `${currentYear}.${currentMonth}.${currentDay}`;
        return currentDate;
    }

    getData() {
        return `${this.getCurrentDay()} ${this.getCurrentTime()}`
    }

    errorSwitch(error) {
        if(error.name === "CastError") {
            return {"status" : ServerMessage.notFound};
        } else {
            throw Error(error);
        }
    }

    responseData(response ,data, success, failed ) {
        if(data) {
            response.status(200).json(success ? success : {message: ServerMessage.success});
        } else {
            response.status(404).json(failed ? failed : {message: ServerMessage.notFound});
        }
    }

    paginationHelper(page, pageSize, data,) {
        const messageCount = data.length;
        const totalPages = Math.ceil(messageCount / pageSize);
        if(page < 1 || page > totalPages) {
            return {"message" : ServerMessage.params}
        } else {
            const startIndex = (page - 1) * pageSize;
            const endIndex = page * pageSize;
            const paginatedMessage = data.slice(startIndex, endIndex);
            return {
                totalpages: totalPages,
                documentSize: messageCount,
                message: ServerMessage.success,
                data: paginatedMessage,
              };
        }
    }

}

module.exports = new Utils();

