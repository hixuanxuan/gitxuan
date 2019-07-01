const express=require("express");
const app=express();
const mysql=require("mysql");
const users=require('./routes/api/users.js');
const course=require("./routes/api/course.js");
const student=require("./routes/api/student.js");
const teacher=require("./routes/api/teacher.js");
const stucho=require("./routes/api/stucho.js");
const teacho=require("./routes/api/teacho.js");
const bodyParser=require("body-parser");
const cors=require("cors");
const path=require('path');
const fs=require('fs');
app.use(cors());
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
  });
  
//设置路由，浏览器就可以访问到
app.get("/",(req,res)=>{
    res.send("Hello world");
})
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//使用routes 引入user.js
app.use('/api/users',users);
app.use('/api/course',course);
app.use('/api/student',student);
app.use('/api/teacher',teacher);
app.use('/api/stucho',stucho);
app.use('/api/teacho',teacho);
//静态资源的使用
app.use(express.static(path.join(__dirname, 'public')));

//DB ?
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '66825638155',
    database : 'mystudb',
    port:3306
  });
//connected
// db.connect( err =>{
//     if(err) {
//         throw err;
//     }
//     console.log('mysql connected');
// })
//test
app.post("/register",(req,res)=>{
    console.log(req.body);
})
app.get('/apidoc',(req,res)=>{
        // fs.readFile('./apidoc/index.html','utf-8',(err,result)=>{
        //     if(err){
        //         throw err;
        //     }
        // })
        res.writeHead(200,{'Content-Type':'text/html'})
        fs.readFile('./public/index.html','utf-8',function(err,data){
            if(err){
            throw err ;
            }
            res.end(data);
            });
})
const port=process.env.PORT||5001;
app.listen(port,()=>{
    console.log("Server in running on port"+port);
})