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
        console.log(currentTime);
        return currentTime;
    }

     getCurrentDay() {
        const date = new Date();
        const currentYear = date.getFullYear();
        const currentMonth = this._addSingleNumberZero(date.getMonth() +ONE_MONTH);
        const currentDay = this._addSingleNumberZero(date.getDate());
        const currentDate = `${currentYear}.${currentMonth}.${currentDay}`;
        console.log(currentDate);
        return currentDate;
    }

    getData() {
        return `${this.getCurrentDay()} ${this.getCurrentTime()}`
    }

}

module.exports = new Utils();

