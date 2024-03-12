const mongoose = require('mongoose');

const { Schema } = mongoose.Schema();

const sportModel = Schema({
    userId: {type: String, required: true, unique: true},
    football: {type: Number, default: 0,},
    padel: {type: Number, default: 0,},
    volleyball: {type: Number, default: 0,},
    squash: {type: Number, default: 0,},
    running: {type: Number, default: 0,},
    tennis: {type: Number, default: 0,},
    hiking: {type: Number, default: 0,},
    climbing: {type: Number, default: 0,},
    gym: {type: Number, default: 0,},
    biking: {type: Number, default: 0,},
    

});



const Sport = mongoose.model('sport', sportSchema);
module.exports = Sport;

