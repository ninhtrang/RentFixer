
var restful = require('node-restful');
var mongoose = restful.mongoose;

var QuanSchema = new mongoose.Schema({
    tenquan : String,
    tenkhuvuc : String
});
module.exports = restful.model('quan',QuanSchema);