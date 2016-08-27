
var restful = require('node-restful');
var mongoose = restful.mongoose;

var KhachHangSchema = new mongoose.Schema({
    tenkhachhang : String,
    hinhanh : String
});
module.exports = restful.model('KhachHang',KhachHangSchema);

