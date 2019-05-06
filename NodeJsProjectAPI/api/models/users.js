const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    Email:{type:String,required:true},
    Password:{type:String,required:true},
    UserName:{type:String,required:true},
    FirstName:{type:String,required:true},
    LastName:{type:String,required:true},
    Topics:[{type:mongoose.Schema.Types.ObjectId,ref:'Topic'}],
    Comments:[{type:mongoose.Schema.Types.ObjectId,ref:'Comment'}]
});

module.exports=mongoose.model('User',userSchema);