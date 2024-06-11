var express =require('express')
var pool=require('./pool')
var router=express.Router()
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
router.get('/loginpage',function(req,res){
    try{
        var data =JSON.parse(localStorage.getItem('ADMIN'))
        console.log('DATA',data)
        if(data==null)
        {res.render('loginpage',{message:''})}
    else
   { var data=JSON.parse(localStorage.getItem('ADMIN'))
      res.render('dashboard',{data:data}); 
   }
  
    }
    catch(e){
        res.render('loginpage',{message:''})
    }
   })
router.post('/chklogin',function(req,res){
    pool.query('select * from admins where (emailid=? or mobileno=?) and password=?',[req.body.emailid,req.body.emailid,req.body.password],function(error,result){
    console.log('data',result)
    if(error)
    {res.render('loginpage',{message:'database error..'})}
    else{
        if(result.length==1)
        {    localStorage.setItem('ADMIN',JSON.stringify(result[0]))
            res.render("dashboard",{data:result[0]})}
        else{
            res.render("loginpage",{message:'Invalid email/mobileno.'})
        }
    }
        

    })
})
router.get('/logout',function(req,res){
    localStorage.clear()
    res.render('loginpage',{message:''})
})

module.exports=router