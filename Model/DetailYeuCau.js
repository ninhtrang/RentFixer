
var restful = require('node-restful');
var mongoose = restful.mongoose;

var DetailYeuCauSchema = new mongoose.Schema({
    idyeucau : String,
	giobatdau : String,
	gioketthuc : String,
	fixer :String,
	nhanxet : String,
	lienlac : String,
	trangthai :String

});
module.exports = restful.model('DetailYeuCau',DetailYeuCauSchema);