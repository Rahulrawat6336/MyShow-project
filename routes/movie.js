var express =require('express')
var pool =require('./pool')
var router=express.Router();
var upload=require('./multer')
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

router.get('/movieinterface',function(req,res,next){
    var data=JSON.parse(localStorage.getItem('ADMIN'))
    try{
        if(data==null){
            res.render('loginpage',{message:''})
        }
        else{
            res.render('movieinterface',{status:0})
        }
    }
    catch(e)
    {res.render('loginpage',{message:''})}
    
});
router.post('/movie_submit',upload.single("picture"),function(req,res,next){
    console.log("BODY",req.body)
    console.log("file",req.file)
    pool.query('insert into moviedetails(stateid,cityid,cinemaid,screenid,moviename,description,releasedate,ticketprice,actorname,actressname,status,picture)values(?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.stateid,req.body.cityid,req.body.cinemaid,req.body.screenid,req.body.moviename,req.body.description,req.body.releasedate,req.body.ticketprice,req.body.actorname,req.body.actressname,req.body.status+'',req.file.filename],function(error,result){
        if(error){
            console.log("Error:",error)
            res.render('movieinterface',{message:'database error',status:2,data:[]})
        }
        else{
            res.render('movieinterface',{message:'success',status:1,data:result})
        }
    })
})

router.get('/displayallmovie',function(req,res,next){
    try{
        var data =JSON.parse(localStorage.getItem('ADMIN'))
        console.log('DATA',data)
        if(data==null)
       { res.render('loginpage',{message:''})}
    else
    {
    
    pool.query("select m.*,(select s.statename from states s where s.stateid=m.stateid) as statename,(select c.cityname from city c where c.cityid=m.cityid) as cityname,(select c.cinemaname from cinema c where c.cinemaid=m.cinemaid) as cinemaname,(select s.screenname from screen s where s.screenid=m.screenid) as screenname from moviedetails m",function(error,result){
        if(error){
            res.render('displayallmovie',{data:[],message:'database error'})
        }
        else{
            res.render('displayallmovie',{data:result,message:'success'})
        }
    })
}}
catch(e){
    res.render('loginpage',{message:''})
}

})
router.get('/display_all_movieby_id',function(req,res,next){
    
    pool.query("select m.*,(select s.statename from states s where s.stateid=m.stateid) as statename,(select c.cityname from city c where c.cityid=m.cityid) as cityname,(select c.cinemaname from cinema c where c.cinemaid=m.cinemaid) as cinemaname,(select s.screenname from screen s where s.screenid=m.screenid) as screenname from moviedetails m where m.movieid=?",[req.query.movieid],function(error,result){
        if(error){
            res.render('displayallmoviebyid',{data:[]})
        }
        else{
            res.render('displayallmoviebyid',{data:result[0]})
        }
    })
})
router.post('/Edit_delete_movie',function(req,res){
    var btn=req.body.btn
    if(btn=='Edit')
    {

    pool.query('update  moviedetails set stateid=?,cityid=?,cinemaid=?,screenid=?,moviename=?,description=?,releasedate=?,ticketprice=?,actorname=?,actressname=?,status=? where movieid=?',[req.body.stateid,req.body.cityid,req.body.cinemaid,req.body.screenid,req.body.moviename,req.body.description,req.body.releasedate,req.body.ticketprice,req.body.actorname,req.body.actressname,req.body.status+'',req.body.movieid],function(error,result){
    
        if(error){
            res.redirect('/movie/displayallmovie')
        }
        else{
            res.redirect('/movie/displayallmovie')
        }
    })
}
    else{
        pool.query('delete from moviedetails  where movieid=?',[req.body.movieid],function(error,result){
            
             if(error){
                 res.redirect('/movie/displayallmovie')
             }
             else{
                 res.redirect('/movie/displayallmovie')
             }
            })


    }
})
router.get('/show_picture',function(req,res){

    res.render('showpicture',{data:req.query})

})
router.post('/edit_picture',upload.single("picture"),function(req,res){
    pool.query("update  moviedetails set picture=? where movieid=?",[req.file.filename,req.body.movieid],function(error,result){
        console.log('error',error)
        console.log('result',result)
        if(error){
            res.redirect('/movie/displayallmovie')
        }
        else{
            res.redirect('/movie/displayallmovie')
        }
    })
})
router.get('/dashboard',function(req,res){
    pool.query('select * from admins where (emailid=? or mobileno=?) and password=?',[req.query.emailid,req.query.emailid,req.query.password],function(error,result){
        res.render("dashboard",{data:result})

    })
    
})
router.get('/dashboard',function(req,res){
   res.render('dashboard')
    
})


module.exports=router