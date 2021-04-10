const express = require('express')
const app = express()
const custRouter = require('./Routes/customer')
const mongoose = require('mongoose')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const path = require('path');


mongoose.connect('mongodb://localhost:27017/Bank', {useNewUrlParser:true , useUnifiedTopology:true , useCreateIndex:true})
mongoose.connection
    .once('open' , ()=> {
        console.log("Database connected")
    })
    .on('error',(err)=>{
        console.log(err)
    })


app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave:false,
}))
app.use(flash());
app.set('view engine' , 'ejs')

app.use(express.static('public'))
app.use('/style',express.static(__dirname + 'public/style'))
app.use('/images',express.static(__dirname + 'public/images'))
app.use('/js',express.static(__dirname + 'public/js'))


app.listen(3000,() => {
    console.log('Listening on port 3000')
})

app.use('/',custRouter) 