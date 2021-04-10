const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required: true
    },
    Email:{
        type:String,
        required: true
    },
    Balance:{
        type:String,
        required: true
    },
    id:{
        type:Number
    }
})

const user = mongoose.model('User',userSchema)

module.exports = user