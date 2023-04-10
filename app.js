//libraries
import express from 'express'
import mysql from 'mysql'
import fetch from 'node-fetch'
import bodyParser from 'body-parser'
import path from 'path'
import url from 'url'
import ejs from 'ejs'
const app = express()
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware

app.use(express.static(path.join(__dirname,'/public')))//method to identify folder with static files
app.use(express.urlencoded({extended:true}))//this is to accept data sent through the html form
app.use(express.json())//used to accept data in Json format
app.use(bodyParser.json());
app.set('views',path.join(__dirname,'/views'))//methode to identify folder with ejs files
app.set('view engine','ejs')

//Create database connection
const conn = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:null,
    database:'Project'
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
   res.status(200).render('index.ejs')
})


app.post('/createClass',(req,res) =>{
    res.render('addStudents')
    const classID = req.body.classID
    const teacher = req.body.teacher
    conn.query((`INSERT INTO Classes (ClassID, Teacher) VALUES("${classID}","${teacher}")`),(err,result) =>{ //This table is prebuilt into the database
        if (err)
        {
           console.log(err) 
        }
        else
        {
            console.log(`Added ${classID} to classes`)
        }
    })

    conn.query((`CREATE TABLE IF NOT EXISTS ${classID} ( StudentID VARCHAR(50) PRIMARY KEY, ClassID VARCHAR(50) GENERATED ALWAYS AS ("${classID}"), FirstName VARCHAR(50), Surname VARCHAR(50), Attended INT DEFAULT 0, Teacher VARCHAR(50) GENERATED ALWAYS AS ("${teacher}"), TotalClasses INT DEFAULT 0)`),(err,result) => {
            if (err)
            {
                console.log(err)
            }
            else
            {
                console.log(`${classID} created successfully`)
            }
        })

        conn.query((`INSERT INTO Teachers (Teacher , ClassID) VALUES("${teacher}","${classID}")`),(err,result) =>{
            if (err)
            {
                console.log(err)
            }
            else
            {
                console.log(`${classID} created successfully`)
            }
        })
  /* conn.query((`CREATE TABLE IF NOT EXISTS ${teacher} (ClassID VARCHAR(50) PRIMARY KEY, Teacher VARCHAR(50) GENERATED ALWAYS AS ("${teacher}"), Students INT DEFAULT 0)`),(err,result) =>{
        if (err)
        {
            console.log(err)
        }
        else
        {
            console.log(`${teacher} table created successfully`)
        }
    })*/ 
})

app.post('/addStudents',(req,res) =>{
    const studentID = req.body.studentID
    const firstName = req.body.firstName
    const surname = req.body.surname
    const classID = req.body.classID

    async function step1 (){
       await conn.query((`INSERT INTO ${classID} (StudentID, FirstName, Surname) VALUES ("${studentID}", "${firstName}", "${surname}")`),(err,result) => {
            if (err)
            {
                console.log(err)
            }
            else
            {
                console.log(`${studentID} added successfully to ${classID}`)
            }
        })
    }

    async function step2 (){ /*REFERENCES classes (Teacher)*/
        await conn.query((`CREATE TABLE IF NOT EXISTS ${studentID} (ClassID VARCHAR(50) PRIMARY KEY, StudentID VARCHAR(50) GENERATED ALWAYS AS("${studentID}"), FirstName VARCHAR(50) GENERATED ALWAYS AS("${firstName}"), Surname VARCHAR(50) GENERATED ALWAYS AS("${surname}"), Teacher VARCHAR(50), Attended INT DEFAULT 0, TotalClasses INT DEFAULT 0)`),(err,result) => {
            if (err)
            {
                console.log(err)
            }
            else
            {
                console.log(`Table for ${studentID} created`)
            }
        })
    }

    async function step3 (){
        await conn.query((`INSERT INTO ${studentID} (ClassID, Teacher) VALUES ("${classID}", (SELECT Teacher FROM classes WHERE ClassID = "${classID}"))`),(err,result) =>{
            if (err)
            {
                console.log(err)
            }
            else
            {
                console.log(`${classID} has been added to the ${studentID} table`)
            }
        })
    }

    async function step4 (){
        await conn.query((`UPDATE classes SET Students = Students + 1 WHERE ClassID = "${classID}"`),(err,result) =>{
            if (err)
            {
                console.log(err)
            }
            else
            {
                console.log(`Successfully updated number of students in ${classID} in the classes table`)
            }
        })
    }
    async function step5 (){
      await conn.query((`UPDATE Teachers SET Students = Students + 1 WHERE ClassID = "${classID}"`),(err,result) => {
        if (err)
        {
            console.log(err)
        }
        else
        {
            console.log(`Successfully updated number of students in ${classID} in the teachers table`)
        }
      })
    }

    step1()
    step2()
    step3()
    step4()
    step5()
})

//port for the server to listen to
app.listen(5000,(req,res) =>{
    console.log('Server runnning on port 5000...')
})
 