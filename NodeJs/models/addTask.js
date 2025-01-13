var Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Task = new Schema({
    taskName : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = Mongoose.model('Task',Task);