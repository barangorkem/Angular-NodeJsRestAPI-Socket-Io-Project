const mongoose=require('mongoose');

const commentSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    CommentContent:{type:String,required:true},
    CommentTime:{type:String,required:true},
    User:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    Topic:{type:mongoose.Schema.Types.ObjectId,ref:'Topic'},

});

module.exports=mongoose.model('Comment',commentSchema);