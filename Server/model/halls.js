const mongoose=require('mongoose');

const hallSchema=mongoose.Schema(
    {
        name:String,
        capacity:String,
        location:String,
        image:String,
        description:String
    }
);

var hallData=mongoose.model('hall',hallSchema);

module.exports=hallData;