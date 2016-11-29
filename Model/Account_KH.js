
var restful = require('node-restful');
var mongoose = restful.mongoose;

var AccountSchema = new mongoose.Schema({
    taikhoan : String,
    matkhau : String, 
    hinhanh : String,
    otp : String,
    diachi : String,
    email : String, 
    hoten : String
});
module.exports = restful.model('AccountKH',AccountSchema);