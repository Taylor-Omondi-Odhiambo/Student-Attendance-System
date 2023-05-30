//libraries
import express from 'express'
import mysql from 'mysql'
import fetch from 'node-fetch'
import bodyParser from 'body-parser'
import path from 'path'
import url from 'url'
import ejs from 'ejs'
import { error } from 'console'
const app = express()
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware

app.use(express.urlencoded({extended:true}))//this is to accept data sent through the html form
app.use(express.json())//used to accept data in Json format
app.use(bodyParser.json());
app.set('views','./views')//method to identify folder with ejs files
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'/public')))//method to identify folder with static files

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
   res.status(200).render('index')
})

app.get('/addStudents.html',(req,res) => {

    conn.query((`SELECT ClassID FROM Classes`),(err,result) =>{
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.status(200).render('addStudents',{classes: result})
        }
    })
})

app.get('/attendance.html',(req,res) => {

    conn.query((`SELECT ClassID FROM Classes`),(err,result) =>{
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.status(200).render('attendance',{classes:result})
        }
    })
})

app.get('/classes.html',(req,res) => {

    conn.query((`SELECT ClassID FROM Classes`),(err,result) =>{
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.status(200).render('classes',{classes: result})
        }
    })
})

app.get('/createClass.html',(req,res) => {
    res.status(200).render('createClass')
})

app.get('/students.html',(req,res) => {
    conn.query((`SELECT StudentID FROM Students`),(err,result) => {
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.status(200).render('students',{students:result})
        }
    })
    
})

app.get('/teachers.html',(req,res) => {

    conn.query((`SELECT Teacher FROM Teachers`),(err,result) => {
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.status(200).render('teachers',{teachers: result})
        }
    })
})


app.get('/exam.html',(req,res) => {

    conn.query((`SELECT ClassID FROM Classes`),(err,result) =>{
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.status(200).render('exam',{classes: result})
        }
    })
})

app.get('/defaulters.html',(req,res) => {

    conn.query((`SELECT ClassID FROM Classes`),(err,result) =>{
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.status(200).render('defaulters',{classes: result})
        }
    })
})
app.get('/index.ejs',(req,res) => {
    res.status(200).render('index')
})

app.get('/addStudents.ejs',(req,res) => {
    //res.status(200).render('addStudents')
    conn.query((`SELECT ClassID FROM Classes`),(err,result) =>{
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.status(200).render('addStudents',{classes: result})
        }
    })
})

app.get('/attendance.ejs',(req,res) => {

    conn.query((`SELECT ClassID FROM Classes`),(err,result) =>{
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.status(200).render('attendance',{classes:result})
        }
    })
})

app.get('/classes.ejs',(req,res) => {
    conn.query((`SELECT ClassID FROM Classes`),(err,result) =>{
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.status(200).render('classes',{classes: result})
        }
    })
})

app.get('/createClass.ejs',(req,res) => {
    res.status(200).render('createClass')
})

app.get('/students.ejs',(req,res) => {
    conn.query((`SELECT StudentID FROM Students`),(err,result) => {
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.status(200).render('students',{students:result})
        }
    })
})

app.get('/teachers.ejs',(req,res) => {
    conn.query((`SELECT Teacher FROM Teachers`),(err,result) => {
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.status(200).render('teachers',{teachers: result})
        }
    })
})

app.get('/exam.ejs',(req,res) => {
    conn.query((`SELECT ClassID FROM Classes`),(err,result) =>{
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.status(200).render('exam',{classes: result})
        }
    })
})

app.get('/defaulters.ejs',(req,res) => {
    conn.query((`SELECT ClassID FROM Classes`),(err,result) =>{
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.status(200).render('defaulters',{classes: result})
        }
    })
})
app.post('/attendance',(req,res) => {
    const classID = req.body.classID
    conn.query((`SELECT * FROM ${classID}`),(err,result) =>{
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.status(200).render('displayAttendance',{units: result})
        }
    })
})

app.post('/takeAttendance',(req,res) => {
    const attended = req.body.attended
    const classID = req.body.classID
    for ( let i = 0; i < attended.length; i++)
    {
        conn.query((`UPDATE ${attended[i]} SET Attended = Attended + 1, TotalClasses = TotalClasses + 1 WHERE ClassID = "${classID}" `),(err,result) => {
            if (err)
            {
                console.log(err)
            }
            else
            {

            }
        })        

        conn.query((`UPDATE ${classID} SET Attended = Attended + 1 WHERE StudentID = "${attended[i]}"`),(err,result) => {
            if (err)
            {
                console.log(err)
            }
            else
            {

            }
        })
    }
    conn.query((`UPDATE ${classID} SET TotalClasses = TotalClasses + 1`),(err,result) =>{
        if (err)
        {
            console.log(err)
        }
        else
        {

        }
    })
    // console.log(attended)
    // console.log(classID)
    res.status(200).redirect('/attendance.ejs')
})

app.post('/classes',(req,res) =>{

    const classID = req.body.classID

    conn.query((`SELECT * FROM ${classID}`),(err,result) =>{
        if (err)
        {
            console.log(err)
        }
        else
        {  
            res.status(200).render('displayClasses',{units: result})
        }
    })

})

app.post('/createClass',(req,res) =>{
    const classID = req.body.classID
    const teacher = req.body.teacher

    async function step1(){
        await conn.query((`INSERT INTO Classes (ClassID, Teacher) VALUES("${classID}","${teacher}")`),(err,result) =>{ //The Classes table is prebuilt into the database
            if (err)
            {
               console.log(err) 
            }
            else
            {
                console.log(`Added ${classID} to classes`)
            }
        })
    }
    
    async function step2 (){
        await conn.query((`CREATE TABLE IF NOT EXISTS ${classID} ( StudentID VARCHAR(50) PRIMARY KEY, ClassID VARCHAR(50) GENERATED ALWAYS AS ("${classID}"), FirstName VARCHAR(50), Surname VARCHAR(50), Attended INT DEFAULT 0, Teacher VARCHAR(50) GENERATED ALWAYS AS ("${teacher}"), TotalClasses INT DEFAULT 0)`),(err,result) => {
            if (err)
            {
                console.log(err)
            }
            else
            {
                console.log(`${classID} created successfully`)
            }
        })
    }
    
    async function step3 (){
       await conn.query((`INSERT INTO Teachers (Teacher , ClassID) VALUES("${teacher}","${classID}")`),(err,result) =>{
            if (err)
            {
                console.log(err)
            }
            else
            {
                console.log(`${classID} created successfully`)
            }
        })
    }

    step1()
    step2()
    step3()
    res.status(200).redirect('/createClass.ejs')
})

app.post('/addStudents',(req,res) =>{
    const studentID = req.body.studentID
    const firstName = req.body.firstName
    const surname = req.body.surname
    const classID = req.body.classID

    /*`INSERT INTO Students (StudentID, FirstName, Surname) SELECT "${studentID}","${firstName}","${surname}" WHERE NOT EXISTS (SELECT * FROM Students WHERE StudentID = "${studentID}")`*/
    async function step1 (){
        await conn.query((`INSERT INTO ${classID} (StudentID, FirstName, Surname) SELECT "${studentID}","${firstName}","${surname}" WHERE NOT EXISTS (SELECT * FROM ${classID} WHERE StudentID = "${studentID}")`),(err,result) => {
            if (err)
            {
                console.log(err)
            }
            else
            {
                console.log(`Data in the ${classID} table has been updated`)
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

    async function step6 (){

        await conn.query((`INSERT INTO Students (StudentID, FirstName, Surname) SELECT "${studentID}","${firstName}","${surname}" WHERE NOT EXISTS (SELECT * FROM Students WHERE StudentID = "${studentID}")`),(err,result) => {
            if (err)
            {
                console.log(err)
            }
            else
            {
                console.log(`Successfully updated the Students table with data about ${studentID} `)
            }
        })
    }

    async function step7 (){

        await conn.query((`UPDATE Students SET NoOfClasses = NoOfClasses + 1 WHERE StudentID = "${studentID}"`),(err,result) => {
            if (err)
            {
                console.log(err)
            }
            else
            {
                console.log(`Successfully updated number of classes for ${studentID} in their table`)
            }
        })
    }

    step1()
    step2()
    step3()
    step4()
    step5()
    step6()
    step7()
    res.status(201).redirect('/addStudents.ejs')
})

app.post('/teachers',(req,res) => {

    const teacher = req.body.teacher
    conn.query((`SELECT * FROM Teachers WHERE Teacher = "${teacher}"`),(err,result) => {
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.status(200).render('displayTeachers',{teachers: result})
        }
    })
})

app.post((`/students`),(req,res) => {
    const student = req.body.student

    conn.query((`SELECT * FROM ${student}`),(err,result) =>{
        if (err)
        {
            console.log(err)
        }
        else
        {
            res.status(200).render('displayStudents',{students:result})
        }
    })
})

app.post('/exam',(req,res) =>{

    const classID = req.body.classID

    conn.query((`SELECT * FROM ${classID}`),(err,result) =>{
        if (err)
        {
            console.log(err)
        }
        else
        {  
            res.status(200).render('displayExam',{units: result})
        }
    })

})

app.post('/defaulters',(req,res) =>{

    const classID = req.body.classID

    conn.query((`SELECT * FROM ${classID}`),(err,result) =>{
        if (err)
        {
            console.log(err)
        }
        else
        {  
            res.status(200).render('displayDefaulters',{units: result})
        }
    })

})
//port for the server to listen to
app.listen(5000,(req,res) =>{
    console.log('Server runnning on port 5000...')
})
 