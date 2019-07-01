const experss=require("express");
const router=experss.Router();
const mysql=require("mysql");
const dbconfig=require("../../config/database.js");
var db = mysql.createConnection(dbconfig.connection);
db.connect( err =>{
    if(err) {
        throw err;
    }
    console.log('mysql connected');
})

router.get('/stuInfo',(req,res)=>{
    let sql1=`select * from student`;
   db.query(sql1,(err,result)=>{
       if(err){
           throw err;
       }else{
           res.status(200).json({
               code:200,
               data:{
                   result
               }
           })
       }
   })
})
/**
 * @api {get} /api/student/stuInfo/{id} view presonal info
 * @apiVersion 0.1.0
 * @apiName stuInfo
 * @apiGroup student
 *
 * 
 * @apiSampleRequest /api/student/stuInfo
 * @apiSuccessExample Success-Response:
 *     {
 *      code:200,
 *      data:{
 *         
 *     }
 * }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

 router.get('/stuInfo/:id',(req,res)=>{
     let sql1=`select * from student where sno=${req.params.id}`;
    db.query(sql1,(err,result)=>{
        if(err){
            throw err;
        }else{
            res.status(200).json({
                code:200,
                data:{
                    result
                }
            })
        }
    })
 })

/**
 * @api {post} /api/student/insertStuInfo insert personal info
 * @apiVersion 0.1.0
 * @apiName insert stuInfo
 * @apiGroup student
 *
 * @apiParam {string} sno the student id
 * @apiParam {string} sname the student name
 * @apiParam {string} sex woman or man
 * @apiParam {int} sage student age
 * @apiParam {string} sdept  student department
 * 
 * @apiSampleRequest /api/student/insertStuInfo
 * @apiSuccessExample Success-Response:
 *     {
 *      code:200,
 *      data:{
 *         
 *     }
 * }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
 router.post('/insertStuInfo',(req,res)=>{
     let sql=`insert into student set?`;
     db.query(sql,req.body,(err,result)=>{
         if(err){
             res.status(500).json({
                 code:500,
                 data:{
                     msg:result
                 }
             })
             throw err;
         }else{
             res.status(200).json({
                 code:200,
                 data:{
                     msg:"success insert"
                 }
             })
         }
     })
 })

/**
 * @api {put} /api/student/changeStuInfo change personal info
 * @apiVersion 0.1.0
 * @apiName change stuInfo
 * @apiGroup student
 *
 * @apiParam {string} sname the student name
 * @apiParam {string} sex woman or man
 * @apiParam {int} sage student age
 * @apiParam {string} sdept  student department
 * 
 * @apiSampleRequest /api/student/changeStuInfo
 * @apiSuccessExample Success-Response:
 *     {
 *      code:200,
 *      data:{
 *         
 *     }
 * }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
 router.put('/changeStuInfo',(req,res)=>{
     let sql=`update student set sname='${req.body.sname}',sex='${req.body.sex}',sage=${req.body.sage},sdept='${req.body.sdept}' where sno=${req.body.sno}`;
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }else{
            res.status(200).json({
                code:200,
                data:{
                    result
                }
            })
        }
    })
 })

 /**
 * @api {delete} /api/student/delStuInfo Adminster delete personal info
 * @apiVersion 0.1.0
 * @apiName delete stuInfo
 * @apiGroup student
 *
 * @apiParam {string} sno  student_id
 * 
 * @apiSampleRequest /api/student/delStuInfo
 * @apiSuccessExample Success-Response:
 *     {
 *      code:200,
 *      data:{
 *         
 *     }
 * }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
 router.delete('/delStuInfo',(req,res)=>{
     let sql=`delete from student where sno=${req.body.sno}`;
     db.query(sql,(err,result)=>{
         if(err){
             throw err;
         }
         else{
             res.status(200).json({
                 code:200,
                 data:{
                     result
                 }
             })
         }
     })
 })
module.exports=router;
