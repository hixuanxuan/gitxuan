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
router.get('/viewStuCho',(req,res)=>{
    let sql=`select * from stucho`;
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
 * @api {get} /api/course/viewStuCho/{sno} view student choose courses
 * @apiVersion 0.1.0
 * @apiName viewStuCho
 * @apiGroup stuchoose
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
router.get('/viewStuCho/:sno',(req,res)=>{
    let sql=`select * from stucho where sno1=${req.params.sno}`;
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
 * @api {post} /api/course/insertStuCho insert student_choose
 * @apiVersion 0.1.0
 * @apiName insertStuCho
 * @apiGroup stuchoose
 *
 * @apiParam {string} sno1 student_id unique
 * @apiParam {string} cno1 course_id iunique
 * @apiParam {boolean} state choosed=true;unchoosed=false;not neccessary
 * @apiParam {grade} float 这门课的分数，可以为空
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
router.post('/insertStuCho',(req,res)=>{
    let sql='insert into stucho set?';
    db.query(sql,req.body,(err,result)=>{
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
 * @api {delete} /api/course/delStuCho/{sno} delete student_choose
 * @apiVersion 0.1.0
 * @apiName delStuCho
 * @apiGroup stuchoose
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
router.delete('/delStuCho/:sno/:cno',(req,res)=>{
    let sql=`delete from stucho where sno1=${req.params.sno} and cno1=${req.params.cno}`;
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
 * @api {put} /api/course/changeStuCho/{sno}/{cno} change student_choose
 * @apiVersion 0.1.0
 * @apiName changeStuCho
 * @apiGroup stuchoose
 *
 * @apiParam {boolean} state choosed=true;unchoosed=false;not neccessary
 * @apiParam {float} grade 这门课的分数，可以为空
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
router.put('/changeStuCho/:sno/:cno',(req,res)=>{
    let sql=`update stucho set state=${req.body.state},grade=${req.body.grade} where sno1=${req.params.sno} and cno1='${req.params.cno}'`;
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
//学生选课
router.put('/stuchoose/:sno/:cno',(req,res)=>{
    let sql1=`select state from stucho where sno1=${req.params.sno} and cno1=${req.params.cno}`;
    db.query(sql1,(err,result)=>{
        if(result.length==0){
            let sql2=`insert into stucho values('${req.params.sno}','${req.params.cno}',0,0)`;
            db.query(sql2,(err,result)=>{
                if(err){
                    res.status(500).send("插入异常！");
                    throw err;
                }else{
                    res.status(200).json({
                        code:200,
                        data:{
                            result
                        }
                    })
                }})
        }else{
            if(result[0].state==0){
                let sql=`update stucho set state=1 where sno1=${req.params.sno} and cno1='${req.params.cno}'`;
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
            }
            else if(result[0].state==1){
                res.status(400).send("您已经选过了");
            }
        }
        //res.json({result});
    })
});

// router.get('/stuchodetail',(req,res)=>{
//     //select a.*,b.* from a left join b on a.id=b.parent_id 
//     let sql=`select stucho.*,student.sname,student.sage,student.sdept`;
// })

//
router.get('/getstuchooseyou/:tno',(req,res)=>{
    let sql=`select stucho.* from stucho where stucho.state=1 and
    stucho.cno1 in (select teacho.cno2 from teacho where tno1=${req.params.tno})`;
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).send('请求失败');
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