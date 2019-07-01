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
 * @api {get} /api/course/viewCourse view all courses
 * @apiVersion 0.1.0
 * @apiName viewCourse
 * @apiGroup course
 *
 * @apiParam {String} cno course_number
 * @apiParam {String} cname course_name
 * @apiParam {float} credit credit
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
router.get('/viewCourse',(req,res)=>{
    let sql='select * from course';
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
 * @api {post} /api/course/insertCourse insert courses
 * @apiVersion 0.1.0
 * @apiName insertCourse
 * @apiGroup course
 *
 * @apiParam {String} cno course_number
 * @apiParam {String} cname course_name
 * @apiParam {float} credit credit
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
router.post('/insertCourse',(req,res)=>{
    let sql='insert into course set?';
    db.query(sql,req.body,(err,result)=>{
        if (err){
            throw err;
        }else{
            res.json({
                code:200,
                data:{
                    msg:"insert data successful"
                }
            })
        }
    })
})
/**
 * @api {delete} /api/course/delCourse Administer delete courses
 * @apiVersion 0.1.0
 * @apiName delCourse
 * @apiGroup course
 *
 * @apiParam {String} cno  course_number
 * 
 * @apiSampleRequest /api/course/delCourse
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
router.delete('/delCourse/:cno',(req,res)=>{
    let sql=`delete from course where cno=${req.params.cno}`;
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).json(err);
            throw err;
        }else{
            res.status(200).json({
                code:200,
                data:{
                    msg:"success delete"
                }
            })
        }
    })
})
/**
 * @api {put} /api/course/changeCourse change courses
 * @apiVersion 0.1.0
 * @apiName changeCourse
 * @apiGroup course
 *
 * @apiParam {String} cno course_number
 * @apiParam {String} cname course_name
 * @apiParam {float} credit credit
 * 
 * @apiSampleRequest /api/course/changeCourse
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
router.put('/changeCourse',(req,res)=>{
    let sql=`update course set cname='${req.body.cname}',ccredit='${req.body.ccredit}' where cno=${req.body.cno}`;
    db.query(sql,(err,result)=>{
        if(err)
        {
            throw err;
        }else{
            res.status(200).json({
                code:200,
                data:{
                    msg:"success delete"
                }
            })
        }
    })
})
module.exports=router;