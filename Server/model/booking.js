const mongoose=require('mongoose');

const bookingSchema=mongoose.Schema(
    {
        userid:String,
        name:String,
        hallname:String,
        date:String,
        starttime:String,
        endtime:String,
        status:String
    }
);

var bookData=mongoose.model('bookingdetail',bookingSchema);

module.exports=bookData;