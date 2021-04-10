const mongoose = require('mongoose')

const transferSchema = mongoose.Schema({
    from:{
        type:String,
        required: true
    },
    to:{
        type:String,
        required: true
    },
    amount:{
        type:Number,
        required: true
    }
})

const transfer = mongoose.model('transferinfo',transferSchema)
module.exports = transfer