
var restful = require('node-restful');
var mongoose = restful.mongoose;

var YeuCauSchema = new mongoose.Schema({
//    ngaydatyeucau : Date,
//    chiphi : Number,
//    hotenkh : String,
//    sodtkh : String,
//    dichvu : String,
//    diachikh : String,
//    quan : String,
//    ngaylam : String,
//    cmndfixer : String,
//    hotenfixer : String,
//    mota : String,
//    trangthai : String
    mayc : {type: String, unique: true},
    ngaydatyeucau : Date,
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