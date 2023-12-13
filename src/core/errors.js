
const _ERROR = 'Something wrong'


 class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = _ERROR;
        this.errorCode = errorCode;
        this.timestamps = Date.now();
    }

    log() {
        console.log(`[${this.timestamps}] ERROR: ${this.message} CODE: ${this.errorCode}`);
    }

 }


 module.exports = ServerError;


