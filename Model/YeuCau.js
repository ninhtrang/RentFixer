
var restful = require('node-restful');
var mongoose = restful.mongoose;

var YeuCauSchema = new mongoose.Schema({
    mayc : {type: String, unique: true},
    ngaydatyeucau : Date,
    accountKH : String,
    hotenKH : String,
    sodt : Number,
    email : String,
    diachi : String,
    cmndTho : String,
	hotenTho: String,
	sdtTho : String,
	dichvuyc: [],
    quan : String,
    ngaylam : String,
    giobatdau : Number,
	gioketthuc : Number,
	phidichvu: Number,
	mota: String,
    nhanxet : String,
	trangthai:String
});
module.exports = restful.model('yeucau',YeuCauSchema);