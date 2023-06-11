const express =require("express")
const app =express()
const mysql =require("mysql")
const path=require("path")
const PORT=process.env.PORT |3000
const bodyParser =require("body-parser")
const exphbs =require("express-handlebars")

// middlewares for bodyParser
app.use(bodyParser.urlencoded({extended :false}))
app.use(bodyParser.json())

//.env
require('dotenv').config()

// static files middleware
app.use(express.static('public'))

// app.engine('hbs',  exphbs({extname :'.hbs'}))
app.set('view engine', 'hbs')

const pool =mysql.createPool({
    connectionLimit:200,
    host :process.env.DB_HOST,
    user :process.env.DB_USER,
    password :process.env.DB_PASS,
    database :process.env.DB_NAME
})          

// connect to db
pool.getConnection((error, connection)=>{
    if(error) {console.log("connection failed")}
    else{ console.log("connection is built")
}
})


const routes =require('./server/routes/blogg')
app.use('', routes)

app.listen(PORT, ()=>{
    console.log("listening")
})

