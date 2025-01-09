const mongoose = require("mongoose");
const connectDb = async () =>{
    try{
        mongoose.set("strictQuery", false)
        await mongoose.connect(process.env.mongodb_con_url)
        console.log("DataBase connected Succesfully")
    }catch(error){
        console.log(error)
    }
}

module.exports = connectDb;