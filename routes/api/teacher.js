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
 * @api {get} /api/teacher/teaInfo view presonal info
 * @apiVersion 0.1.0
 * @apiName get teaInfo
 * @apiGroup teacher
 *
 * 
 * @apiSampleRequest /api/teacher/teaInfo
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
router.get('/teaInfo/:tno',(req,res)=>{
    let sql=`select * from teacher where tno='${req.params.tno}'`;
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
 * @api {post} /api/teacher/insertTeaInfo insert teacher_info
 * @apiVersion 0.1.0
 * @apiName insertTeaInfo
 * @apiGroup teacher
 *
 * 
 * @apiParam {String} tno teacher_id
 * @apiParam {String} tname teacher_name
 * @apiParam {String} tsex teacher_sex
 * @apiParam {int} tage teacher_age
 * @apiParam {String} tdept teacher_department
 * @apiSampleRequest /api/teacher/teaInfo
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
router.post('/insertTeaInfo',(req,res)=>{
    let sql=`insert into teacher set?`;
    db.query(sql,req.body,(err,result)=>{
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
 * @api {post} /api/teacher/delTeaInfo/{tno} delete teacher_info
 * @apiVersion 0.1.0
 * @apiName delTeaInfo
 * @apiGroup teacher
 *
 * 
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
router.delete('/delTeaInfo',(req,res)=>{
    let sql=`delete from teacher where tno='${req.body.tno}'`;
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

//修改老师个人信息
router.put('/changeTeaInfo',(req,res)=>{
    let sql=  `update teacher set tname='${req.body.tname}',tage=
    ${req.body.tage},tsex='${req.body.tsex}',tdept='${req.body.tdept}' where tno='${req.body.tno}'`;
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).send('修改异常');
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