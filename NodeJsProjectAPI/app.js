const express=require('express');
const usersRouter=require('./api/routes/users');
const topicsRouter=require('./api/routes/topics');
const commentsRouter=require('./api/routes/comments');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const checkAuth=require('./api/middleware/check-auth');
const app=express();

mongoose.connect("mongodb://localhost:27017/AgProgramlamaProje");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
   });

app.use('/users',usersRouter);
app.use('/topics',topicsRouter);
app.use('/comments',commentsRouter);

app.use((req,res,next)=>{
    const error=new Error('Not found');
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
})

module.exports=app;