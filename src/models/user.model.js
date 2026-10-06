const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email required to create a use.r"],
        trim:true,
        lowercase:true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Invaild email address."],
        unique:[true,"Email already exists."]
    },
    name:{
        type:String,
        required:[true,"Name is required to create a account."],        
    },
    password:{
        type:String,
        required:[true,"Password is required for creating an account."],
        minlength:[6,"Password should be contain more than 6 character."],
        select:false
    },
    systemUser:{
        type:Boolean,
        default:false,
        immutable:true,
        select:false
    }
},{
    timestamps:true
})

userSchema.pre("save", async function(next){
    
    if(!this.isModified("password")){
        return;
    }
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash;
    return;
    
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}


const userModel = mongoose.model("user", userSchema)

module.exports = userModel;