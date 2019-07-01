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

/**
 * @api {get} /api/teacho/viewTeaCho get teacher_choose
 * @apiVersion 0.1.0
 * @apiName getTeaCho
 * @apiGroup teachoose 
 *
 *                                                                
 * @apiSampleRequest /api/course/viewCourse
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

 router.get('/viewTeaCho/:tno1',(req,res)=>{
     let sql=`select cno2,cname,info from teacho,course where tno1=${req.params.tno1} and teacho.cno2=course.cno`;
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
 });
/**
 * @api {post} /api/teacho/insertTeaCho insert teacher_choose
 * @apiVersion 0.1.0
 * @apiName insertTeaCho
 * @apiGroup teachoose 
 *
 * @apiParam {string} tno1 teacher id unique
 * @apiParam {string} cno2 course_id iunique
 * @apiParam {string} info 老师开设的这门课程的介绍
 *                                                                
 * @apiSampleRequest /api/course/viewCourse
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

 router.post('/insertTeaCho',(req,res)=>{
     let sql=`insert into teacho set?`;
     db.query(sql,req.body,(err,result)=>{
        if(err){
            res.status(500).json({
                code:500,
                data:{
                    err
                }
            })
        }else{
            res.status(200).json({
                code:200,
                data:{
                    result
                }
            })
        }
     })
 });

 /**
 * @api {delete} /api/teacho/delTeaCho/{tno}/{cno} delete teacher_choose
 * @apiVersion 0.1.0
 * @apiName delTeaCho
 * @apiGroup teachoose 
 *
 *                                                                
 * @apiSampleRequest /api/teacho/delTeaCho
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

router.delete('/delTeaCho/:tno/:cno',(req,res)=>{
    let sql=`delete from teacho where tno1=${req.params.tno} and cno2=${req.params.cno}`;
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).json({
                code:500,
                data:{
                    err
                }
            })
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
 * @api {put} /api/teacho/changeTeaCho/{tno}/{cno} change teacher_choose
 * @apiVersion 0.1.0
 * @apiName changeTeaCho
 * @apiGroup teachoose 
 *
 * @apiParam {string} info 老师开设的这门课程的介绍
 *                                                                
 * @apiSampleRequest /api/course/viewCourse
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
router.put('/changeTeaCho/:tno/:cno',(req,res)=>{
    let sql=`update teacho set info='${req.body.info}' where tno1=${req.params.tno} and cno2=${req.params.cno}`;
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).json({
                code:500,
                data:{
                    err
                }
            })
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
//获取老师开课情况以及老师个人信息的api
router.get('/fullTeaInfo',(req,res)=>{
    let sql=`select teacho.tno1,teacho.cno2,teacho.info,teacher.tname,teacher.tsex,course.cname from teacho,teacher,course where teacho.tno1=teacher.tno and course.cno=teacho.cno2`;
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).json({err})
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

//获取单个老师开课情况以及老师个人信息的api
router.get('/fullTeaInfo/:tno',(req,res)=>{
    let sql=`select teacho.tno1,teacho.cno2,teacho.info,teacher.tname,teacher.tsex,course.cname from teacho,teacher,course where teacho.tno1=teacher.tno and course.cno=teacho.cno2 and teacho.tno1=${req.params.tno}`;
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).send('服务端异常')
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
module.exports=router;