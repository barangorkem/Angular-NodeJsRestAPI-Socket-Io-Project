const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const checkAuth=require('../middleware/check-auth');
const User=require('../models/users');

router.post('/signin',(req,res,next)=>{
    User.findOne({Email:req.body.Email}).exec().then(user=>{
        if(!user)
            {
                return res.status(404).json({
                    message:"Kayıt Bulunamadı"
                })
            }
        bcrypt.compare(req.body.Password,user.Password,(err,result)=>{
            if(err)
                {
                    return res.status(401).json({
                        message:"Giriş başarısız"
                    })
                }
            if(result)
                {
                 const token = jwt.sign({
                        Email:user.Email,
                        userId:user._id
                    },"secret",{
                        expiresIn:"1h"
                    });
                    return res.status(200).json({
                        message:'Giriş başarılıdır.',
                        token:token
                    });
                }
                return res.status(401).json({
                    message:"Yanlış şifre girdiniz"
                })
        })
    })
})

router.post('/signup',(req,res,next)=>{


    User.find({Email:req.body.Email}).exec().then(user=>{
        if(user.length>=1)
            {
                res.status(409).json({
                    message:'Mail daha önce kayıt edilmiş'
                });
            }
        else
            {
                bcrypt.hash(req.body.Password,10,(err,hash)=>{
        
                    if(err)
                    {
                        return res.status(500).json({
                            error:err
                        });
                    }
                    else{
                        const user=new User({
                            _id:new mongoose.Types.ObjectId,
                            Email:req.body.Email,
                            Password:hash,
                            FirstName:req.body.FirstName,
                            LastName:req.body.LastName,
                            UserName:req.body.UserName
                        });
                        user.save().then(result=>{
            
                            res.status(201).json({
                                message:'Kayıt gerçekleşti'
                            });
                        }).catch(err=>{
                            res.status(500).json({
                                    error:err
                                
                            });
                        })
                    }
                })
            }
    }).catch(err=>{
        res.status(500).json({
            error:err
        
    });
    })
})

router.get('/getUserClaims',checkAuth,(req,res,next)=>{
    res.status(200).json({
        userData:req.userData
    })
});

module.exports=router;