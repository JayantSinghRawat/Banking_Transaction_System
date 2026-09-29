const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    fromAccount:{
        type:"String",
        ref:"account",
        required:[true,"Transaction must be associated with a from account"],
        index:true
    },
    toAccount:{
        type:"String",
        ref:"account",
        required:[true,"Transaction must be associated with a to account"],
        index:true
    },
    status:{
        type:"string",
        enum:{
            values:["PENDING","COMPLETED","FAILED","REVERSED"],
            message:"Status can be either PENDING, COMPLETED, FAILED or REVERSED"
        },
        default:"PENDING"
    },
    amount:{
        type:Number,
        required:[true,"Amount is required to create a transaction"],
        min:[0,"Transaction amount cannot be in negative"]
    },
    idempotancyKey:{
        type:String,
        required:[true,"Idempotancy Key is required for creating a transaction"],
        index:true,
        unique:true
    }
},{
    timestamps
})

const transactionModel =  mongoose.model("transaction",transactionSchema)

module.exports = {
    transactionModel
}