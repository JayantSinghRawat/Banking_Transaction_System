const mongoose = require("mongoose");

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("server is connected to db");
    })
    .catch(err=>{
        console.log("error connecting to db",err.message);
        process.exit(1);
    })
}

module.exports = connectToDb;