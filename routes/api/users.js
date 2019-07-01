const experss=require("express");
const router=experss.Router();
const mysql=require("mysql");
const dbconfig=require("../../config/database.js");
//route
router.get('/test',(req,res)=>{
    res.json({msg:"login works"});
})
var db = mysql.createConnection(dbconfig.connection);
db.connect( err =>{
    if(err) {
        throw err;
    }
    console.log('mysql connected');
})
//注册
/**
 * @api {post} /api/users/register Register User information
 * @apiVersion 0.1.0
 * @apiName register
 * @apiGroup User
 *
 * @apiParam {string} id Users unique ID.
 * @apiParam {string} username Users nickname
 * @apiParam {string} password User password
 * @apiParam {int} type student type 1 and teacher type 2
 * 
 * @apiSampleRequest /api/users/register
 * @apiSuccessExample Success-Response:
 *     {
 *      code:200,
 *      data:{
 *         msg:"success register"
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
router.post('/register',(req,res)=>{
    //查询数据库里面id是否存在，如果存在返回注册失败
    let sql1=`select id from userinfo where id=${req.body.id}`;
    db.query(sql1,(err,result)=>{
        if(err)
        throw err;
        else{
            if(result.length>0){
                res.status(400).json({
                    code:400,
                    data:{
                        msg:"Regsiter failed! User has been Registered."
                    }
                })
            }else{
                //用户可以执行注册的逻辑
                let sql2='INSERT INTO userinfo SET ?';
                db.query(sql2,req.body,(err,result)=>{
                    if(err)
                    throw err;
                    res.status(200).json({
                        code:200,
                        data:{
                            status:"success",
                            msg:"success register"
                        }
                    })
                })
            }
        }
    })
})
//登陆
/**
 * @api {post} /api/users/login  User login api
 * @apiVersion 0.1.0
 * @apiName login
 * @apiGroup User
 *
 * @apiParam {string} id Users unique ID.
 * @apiParam {string} password User password
 * @apiParam {int} type student type 1 and teacher type 2
 * @apiSampleRequest /api/users/login
 * @apiSuccessExample Success-Response:
 *     {
 *      code:200,
 *      data:{
 *         msg:"success login"
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
router.post('/login',(req,res)=>{
    //检查用户名是否存在，如果存在检查密码是否正确，如果密码正确成功登陆
    let sql1=`select id from userinfo where id=${req.body.id}`;
    db.query(sql1,(err,result)=>{
        if(err)
        throw err;
        else{
            if(result.length==0){
                res.status(400).json({
                    code:400,
                    data:{
                        msg:"Login failed! User has not been Registered."
                    }
                })
            }else{
                //检验密码是否正确
                let sql2=`select password from userinfo where id=${req.body.id}`;
                db.query(sql2,(err,result)=>{
                    if(err)
                    throw err;
                    else{
                        if(result[0].password==req.body.password){
                            res.status(200).json({
                                code:200,
                                data:{
                                    user:req.body.id,
                                    msg:"Login success!"
                                }
                            });
                        }else{
                            res.status(400).json({
                                code:{
                                    status:"failed",
                                    msg:"error password"
                                }
                            })
                        }
                    }
                })
            }
        }
    })
})
//修改用户信息
/**
 * @api {put} /api/users/changeInfo  User change info api
 * @apiVersion 0.1.0
 * @apiName changeInfo
 * @apiGroup User
 *
 * @apiParam {string} id Users unique ID.
 * @apiParam {string} username Users nickname
 * @apiParam {string} password User password
 * @apiParam {int} type student type 1 and teacher type 2
 * 
 * @apiSuccessExample Success-Response:
 *     {
 *      code:200,
 *      data:{
 *         msg:"success update"
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
router.put('/changeInfo',(req,res)=>{
    let sql1=`update userinfo set password=${req.body.password},username='${req.body.username}' where id=${req.body.id}`;
    db.query(sql1,(err,result)=>{
        if(err){
            res.json(err);
            throw err;
        }else{
            res.json(result);
        }
    })
})
/**
 * @api {delete} /api/users/delUser  Adminster del user api
 * @apiVersion 0.1.0
 * @apiName deluser
 * @apiGroup User
 *
 * @apiParam {string} id Users unique ID.
 * 
 * @apiSuccessExample Success-Response:
 *     {
 *      code:200,
 *      data:{
 *         msg:"success delete"
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
router.delete('/deluser/:id',(req,res)=>{
    let sql=`delete from userinfo where id=${req.params.id}`;
    db.query(sql,(err,result)=>{
        if(err){
            throw err;
        }else{
            res.json(result);
        }
    })
});
//测试body-parser
router.post("/register",(req,res)=>{
    console.log(req.body);
})
//获取所有用户信息的大表
router.get('/getuser',(req,res)=>{
    let sql='select * from userinfo';
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).json({err});
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
//获取单个用户信息
router.get('/getuser/:id',(req,res)=>{
    let sql=`select * from userinfo where id=${req.params.id}`;
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).json({err});
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
//获取用户信息详情
//let sql=`select userinfo.id,tname,cname`
module.exports=router;