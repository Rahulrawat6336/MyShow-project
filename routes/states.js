var express =require('express')
var pool =require('./pool')
var router=express.Router();

router.get('/fetch_all_states',function(req,res,next){
    pool.query('select * from states',function(error,result){
        if(error){
            res.status(500).json({message:'database error',status:false,data:[]})
        }
        else{
            res.status(200).json({message:'success',data:result,status:true})
        }
    })

});
router.get('/fetch_all_city',function(req,res,next){
    pool.query('select * from city where stateid=?',[req.query.stateid],function(error,result){
        if(error){
            res.status(500).json({message:'database error',status:false,data:[]})
        }
        else{
            res.status(200).json({message:'success',data:result,status:true})
        }
    })

});
router.get('/fetch_all_cinema',function(req,res,next){
    pool.query('select * from cinema where cityid=?',[req.query.cityid],function(error,result){
        if(error){
            res.status(500).json({message:'database error',status:false,data:[]})
        }
        else{
            res.status(200).json({message:'success',data:result,status:true})
        }
    })
})

router.get('/fetch_all_screen',function(req,res,next){
    pool.query('select * from screen where cinemaid=?',[req.query.cinemaid],function(error,result){
        if(error){
            res.status(500).json({message:'database error',status:false,data:[]})
        }
        else{
            res.status(200).json({message:'success',data:result,status:true})
        }
    })
})

module.exports=router