//libraries
const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser');
const path = require('path')
const app = express()

//middleware
app.use(express.static(path.join(__dirname,'/public')))//method to identify folder with static files
app.use(express.urlencoded({extended:false}))//this is to accept data sent through the html form
app.use(express.json())//used to accept data in Json format
app.use(bodyParser.json());

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
/*
Status codes
200 - OK
201 - created
404 - not found  
*/
//Initialize home page
app.get('/',(req,res) => {
    res.status(200).sendFile(path.join(__dirname,'/index.html'))
})
app.post('/createClass',(req,res) =>{
    const classID = req.body.classID
    const teacher = req.body.teacher
   
    conn.query((`CREATE TABLE IF NOT EXISTS ${classID} ( StudentID VARCHAR(20) PRIMARY KEY, FirstName VARCHAR(50), Surname VARCHAR(50), Attended INT DEFAULT 0, Teacher VARCHAR(50) GENERATED ALWAYS AS ("${teacher}"), TotalClasses INT DEFAULT 0)`),(err,result) => {
            if (err)
            {
                console.log(err)
            }
            else
            {
                //res.send("Success")
                console.log(`${classID} created successfully`)
            }
        })
})

app.post('/addStudents',(req,res) =>{
    const studentID = req.body.studentID
    const firstName = req.body.firstName
    const surname = req.body.surname
    const classID = req.body.classID

    conn.query((`INSERT INTO ${classID} (StudentID, FirstName, Surname) VALUES ("${studentID}", "${firstName}", "${surname}")`),(err,result) => {
        if (err)
        {
            console.log(err)
        }
        else
        {
            console.log(`${studentID} added successfully to ${classID}`)
        }
    })


})
//port for the server to listen to
app.listen(5000,(req,res) =>{
    console.log('Server runnning on port 5000...')
})

