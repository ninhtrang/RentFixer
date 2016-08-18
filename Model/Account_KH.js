
var restful = require('node-restful');
var mongoose = restful.mongoose;

var AccountSchema = new mongoose.Schema({
    taikhoan : String,
    matkhau : String
});
module.exports = restful.model('AccountKH',AccountSchema);