
const _ERROR = 'Something wrong'


 class ServerError extends Error {
    constructor(message) {
        super(message);
        this.error = message;
        this.name = _ERROR;
        this.errorCode = 500;
        this.timestamps = Date.now();
    }

    log() {
        console.log(`[${this.timestamps}] ERROR: ${this.message} CODE: ${this.errorCode}`);
    }

 }


 module.exports = ServerError;


