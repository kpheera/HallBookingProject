const express = require('express');
const bookingRoute = express.Router();
const bookingdetails = require('../model/booking');

//view bookings of user(week) 
bookingRoute.route('/getbookingweek/:userid').get(function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE");
    const userid = req.params.userid;
    bookingdetails.find({ "userid": userid })
        .then(function (bookingweek) {
            console.log(bookingweek)
            res.send(bookingweek);
        })
})

//view bookings of all users
bookingRoute.route('/getallbooking').get(function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE");
    const userid = req.params.userid;
    bookingdetails.find()
        .then(function (bookingweek) {
            console.log(bookingweek)
            res.send(bookingweek);
        })
})

// userid:String,
// name:String,
// hallname:String,
// date:String,
// starttime:String,
// endtime:String,
// status:String
//adding booking data
bookingRoute.route('/addbooking').post(function (req, res) {
    var item = {
        userid: req.body.userid,
        name: req.body.name,
        date: req.body.date,
        hallname: req.body.hallname,
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        status: req.body.status
    };

    let data = new bookingdetails(item);
    data.save();
    bookingdetails.find().then(function (data) {
        res.send(data);
    })
})

//delete booking
bookingRoute.route('/deletebooking/:id').delete(function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE");
    console.log(req.params.id);
    bookingdetails.findByIdAndDelete(req.params.id).then(() => {
        console.log('success')
        res.send();
    })

})

// find a booking
bookingRoute.route('/:id').get(function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE");
    const id = req.params.id;
    bookingdetails.findOne({ "_id": id }).then((_booking) => {
        console.log("hi");
        console.log(_booking);
        res.send(_booking);

    })

})

//booking update
bookingRoute.route('/editbooking/:id').put(function (req, res) {
    console.log("hello");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE");
    console.log("inside update");
    console.log(req.body.booking.date);
    console.log("well");
    bookingdetails.findByIdAndUpdate({ "_id": req.body.booking._id },
        {
            $set: {
                // "userid":req.body.userid,
                // "name":req.body.name,
                "hallname":req.body.booking.hallname,
                "date":req.body.booking.date,
                "starttime":req.body.booking.starttime,
                "endtime":req.body.booking.endtime,
                "status":"pending"

            }
        })
        .then(function () {
            res.send();
        })

});

//booking approval
bookingRoute.route('/statusApproved/:id').put(function (req, res) {
    console.log("hello");
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE");
    bookingdetails.findByIdAndUpdate({ "_id": req.body.id._id},
        {
            $set: {

                "status":"approved"

            }
        })
        .then(function () {
            res.send();
        })

});

//booking approval
bookingRoute.route('/statusRejected/:id').put(function (req, res) {
    console.log("hello");
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE");
    bookingdetails.findByIdAndUpdate({ "_id": req.body.id._id},
        {
            $set: {

                "status":"rejected"

            }
        })
        .then(function () {
            res.send();
        })

});

module.exports = bookingRoute;