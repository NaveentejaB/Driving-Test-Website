const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_name : {
        type : String,
        required : true
    },
    user_contact :{
        type : Number,
        required : true,
    },
    user_address : {
        type : String,
        required : true
    },
    user_email :{
        type : String,
        required : true
    },
    user_password :{
        type : String,
        required : true
    },
    user_photo :{
        type : String,
        default:""
    },
    user_proof :{
        type : String,
        default:""
    },
    user_license :{
        type : String,
        default:""
    },
    user_result : {
        score : Number,
        status :{
            type:Boolean,
            default : false
        },
        area_of_improvement:{
            type : Number
        }
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User