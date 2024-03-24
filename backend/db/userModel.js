
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
    },

    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
    },
    
    type:{
        type:String,
        required:true,
    },
    reminders:{
        type:mongoose.Schema.Types.Mixed,
        
    }


})

module.exports = mongoose.model.Users || mongoose.model("Final_users", UserSchema);
