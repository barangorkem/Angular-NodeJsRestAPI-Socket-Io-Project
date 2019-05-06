const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const checkAuth=require('../middleware/check-auth');
const Topic=require('../models/topics');
const User=require('../models/users');
const io=require('../../socket');

router.post('/opentopic',checkAuth,(req,res,next)=>{

    User.findById(req.userData.userId).then(user=>{
        if(!user)
            {
                res.status(404).json({
                    message:"Kullanıcı bulunamadı."
                });
            }
        else{
            const id=req.userData.userId;
            const topic=new Topic({
                _id:new mongoose.Types.ObjectId,
                TopicName:req.body.TopicName,
                TopicTime:req.body.TopicTime,
                User:id
            });
            
            topic.save().then(result=>{
                user.Topics.push(result);
                user.save();
            res.status(200).json(result);
            }).catch(err=>{
                res.status(500).json({
                    error:err
                })
            
            });

        
    }
    }).catch(err=>{
            res.status(500).json({
                error:err
            });
        })

})
router.get('/gettopics',(req,res,next)=>{

  Topic.find().select('_id TopicName TopicTime User').populate('User','Email').exec().then(result=>{
      res.status(200).json(result);
  }).catch(err=>{
      res.status(500).json({
          message:"Hata oluştu"
      })
  })
})
router.get('/gettopics/:topicId',(req,res,next)=>{

    Topic.findOne({_id:req.params.topicId}).select('_id TopicName Comments').populate('Comments','_id CommentContent CommentTime').populate('User','Email').exec().then(result=>{
        res.status(200).json(result);
    }).catch(err=>{
        res.status(500).json({
            message:"Hata oluştu"
        })
    })
  })

module.exports=router;