const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    questions : [{
        question:{
            type:String,
            required : true,
            unique: true
        },
        options : {
            option_1 : {
                type:String,
                required : true,
                unique: true
            },
            option_2 : {
                type:String,
                required : true,
                unique: true
            },
            option_3 : {
                type:String,
                required : true,
                unique: true
            },
            option_4 : {
                type:String,
                required : true,
                unique: true
            },
        },
        correct_option : {
            type:String,
            required : true,
            unique: true
        },
        is_answered :{
            type : Boolean,
            default : false
        },
        category : {
            type : String,
            required : true,
            enum : ['rules','signs','safety']
        }
    }]
})

const Test = mongoose.model('Test',testSchema)

module.exports = Test