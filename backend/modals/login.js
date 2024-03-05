var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    token: {type: String}
}, {versionKey: false});

var login = new mongoose.model('user', schema)
module.exports = login;