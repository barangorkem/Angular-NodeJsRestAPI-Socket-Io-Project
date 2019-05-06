const mongoose=require('mongoose');

const topicSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    TopicName:{type:String,required:true},
    TopicTime:{type:String,required:true},
    User:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    Comments:[{type:mongoose.Schema.Types.ObjectId,ref:'Comment'}]

});

module.exports=mongoose.model('Topic',topicSchema);