const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user = new schema({
    username:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        required:true,
        type:String,
        unique:true
    }
});

module.exports = mongoose.model("user",user);