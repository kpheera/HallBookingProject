const express = require('express');
const loginRoute = express.Router();
const userModel = require('../Model/Users');


//check if user exit
loginRoute.route('/checkUser').post(async function (req, res) {
  
    let user = await userModel.findOne({
      email: req.body.email
    });
  
    //check if user exit
    if (!user) {
      return res.status(400).json({
          type: "Not Found",
          msg: "User dosen't exists!!"
      })
    }
  
    if (req.body.password == user._doc.password) {
      //generate jwt token
      let token = await user.generateJwtToken({
        user
      }, "secret", {
          expiresIn: 604800
      })
      if (token) {
          res.status(200).json({
              success: true,
              token: token,
              userCredentials: user
          })
      }
    }
    else {
        return res.status(400).json({
            type: "Not Found",
            msg: "Wrong Login Credentials!!"
        })
    }
  });
  
  
  module.exports = loginRoute;