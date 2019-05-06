let io;


const mongoose = require("mongoose");
const Comment=require('./api/models/comments');

module.exports = {
  init: httpServer => {
    io = require("socket.io")(httpServer);
    io.on('connection',(socket)=>{
        console.log('new connection made');
    
        socket.on('join',function(data){
            socket.join(data.room);
            console.log("join",data.room);
        });
        socket.on('disconnect',function(data){
          if(!socket.username) return ;
      //Disconnect
      console.log(`Leave`);
      });
      
        socket.on('commentRequest',function(data){
            console.log("data room",data.room);
            Comment.find({Topic:data.room}).select('_id CommentContent CommentTime User Topic').populate('User','Email').populate('Topic','TopicName').exec().then(result=>{
            io.to(data.room).emit('sendMessage',{comment:result});
            }).catch(err=>{
                throw err;
            })
        })
        socket.on('leave',function(data){
          console.log(data);
          console.log("gitti");
          socket.leave(data);
          socket.emit('disconnect',data);
        })
        
    
    }) 
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized");
    }
    return io;
  }
};