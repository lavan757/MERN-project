var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    empno : {type: Number},
      name: { type : String },
      job: { type : String },
      address: { type : String },
      phone: { type : Number },
},{versionKey : false});

var cart = new mongoose.model('details', schema);
module.exports = cart;