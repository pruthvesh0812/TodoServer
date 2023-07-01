const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")
const app = express();
const bodyParser = require('body-parser')
const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"pruthviiii@0812",
    database:"todos"
})


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.post("/api/insert",(req,res)=>{
   
    const id = req.body.id;
    const value= req.body.value;
    const isCompleted = req.body.isCompleted;

   
    const sqlInsert = "INSERT INTO todolist (id, value, isCompleted) VALUES (?,?,?)"
    db.query(sqlInsert,[id,value,isCompleted], (err,result)=>{
        console.log(err)
    })
})

app.delete("/api/delete/:id",(req,res)=>{
    console.log('skdjfls')
    const id = req.params.id;

    const sqlDelete = "delete from todolist where id = ?";
  
    console.log('server', id)
    db.query(sqlDelete,id.substring(1,id.length),(err,result)=>{
        if(err){
            console.log(err)    
        }
    });
})

app.delete("/api/deleteAll",(req,res)=>{
   
    const sqlAllDelete = "truncate table todolist"
  
  
    db.query(sqlAllDelete,(err,result)=>{
       
    });
})

app.get("/api/get",(req,res)=>{
    const sqlSelect = "select * from todolist"
    result1 = db.query(sqlSelect,(err,result)=>{
        console.log(result)
        res.send(result)
    })
   
})

app.get("/api/onComplete",(req,res)=>{
    const sqlSelect2 = "select * from todolist where isCompleted = 1"
    result2=db.query(sqlSelect2,(err,result)=>{
        console.log(result)
        res.send(result)
    })
    
})


app.put("/api/put",(req,res)=>{
    const isCompleted = req.body.isCompleted;
    const id = req.body.id;

    const sqlUpdate = "update todolist set isCompleted = ? where id = ?"
    db.query(sqlUpdate,[isCompleted,id],(err,result)=>{
        console.log(err)
        console.log(result,'sdfdf32423')
       
    })
})




app.listen(5000,()=>{
    console.log("server running on port 5000")
})


// app.get('/assignment/loans', (req, res) => {
//     const bookId = req.query.bookID;
//     const studentId = req.query.studentID;
//     const loans = [];
  
//     if(bookId){
//       if(!Number.isInteger(parseInt(studentId))){
//         return res.status(422)
//           .setHeader('content-type', 'application/json')
//           .send({error: 'bookId not numeric'});
//       }
//       db.all('SELECT * FROM loan WHERE bookID=?', bookId, (err, rows) => {
//         if (err) {
//           res.status(422)
//             .setHeader('content-type', 'application/json')
//             .send({error: 'Problem while querying database'});
//           return;
//         }
//         if (rows.length === 0) {
//           res.status(404)
//             .setHeader('content-type', 'application/json')
//             .send({error: 'loan bookId was not found!'});
//         } else {
//           rows.forEach(row =>
//             loans.push({id: `${row.id}`, bookID: `${row.bookID}`}));
//           res.status(200)
//             .setHeader('content-type', 'application/json')
//             .send(loans);
//         }
//       });
//     }else if(studentId){
//       if(!Number.isInteger(parseInt(studentId))){
//         return res.status(422)
//           .setHeader('content-type', 'application/json')
//           .send({error: 'studentId not numeric'});
//       }
//       db.all('SELECT * FROM loan WHERE studentID=?', studentId, (err, rows) => {
//         if (err) {
//           return res.status(422)
//             .setHeader('content-type', 'application/json')
//             .send({error: 'Problem while querying database'});
//         }
//         if (rows.length === 0) {
//           res.status(404)
//             .setHeader('content-type', 'application/json')
//             .send({error: 'loan studentId was not found!'});
//         } else {
//           rows.forEach(row =>
//             loans.push({id: `${row.id}`, studentID: `${row.studentID}`}));
//           res.status(200)
//             .setHeader('content-type', 'application/json')
//             .send(loans);
//         }
//       });
//     }else{
//       return res.status(400)
//         .setHeader('content-type', 'application/json')
//         .send({error: 'Please provide required query string'});
//     }
//   });