//libraries
const express = require('express')
const mysql = require('mysql')
const path = require('path')
const app = express()

//middleware
app.use(express.static(path.join(__dirname,'/public')))//method to identify folder with static files
app.use(express.urlencoded({extended:false}))//this is to accept data sent through the html form
app.use(express.json())//used to accept data in Json format

//Create database connection
const conn = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: null,
    database:'Student_Attendance'
})

//Connect to database
conn.connect((err) =>{
    if (err)
    {
        console.log("Error in connecting to database")
    }
    else
    {
        console.log("Database connection successful")
    }
})

//Initialize home page
app.get('/',(req,res) => {
    res.status(200).sendFile(path.join(__dirname,'/index.html'))
})

//port for the server to listen to
app.listen(5000,(req,res) =>{
    console.log('Server runnning on port 5000...')
})