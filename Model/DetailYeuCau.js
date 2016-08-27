
var restful = require('node-restful');
var mongoose = restful.mongoose;

var DetailYeuCauSchema = new mongoose.Schema({
    idyeucau : String,
	giobatdau : Number,
	gioketthuc : Number,
	nhanxet : String,
	lienlac : String,
	trangthai :String

});
module.exports = restful.model('DetailYeuCau',DetailYeuCauSchema);