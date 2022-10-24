const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

// List of columns for User schema
let User = new Schema ({
    userid:{ type: Number },
    name: { type: String },
    email: { type: String },
    password: { type: String },
    mobile: { type: Number },
    role: { type: String },
    jobTitle: { type: String},
    department: { type: String },
    address: { type: String },
    district: { type: String },
    state: { type: String },
    pinCode: { type: Number }
  },
  {
    collection: 'users'
  }
);

User.methods.generateJwtToken = async (payload, secret, expires) => {
  return jwt.sign(payload, secret, expires)
}

User.plugin(AutoIncrement, {userid:'user_seq',inc_field: 'userid'});
module.exports = mongoose.model('User', User);
