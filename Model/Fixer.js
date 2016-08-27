
var restful = require('node-restful');
var mongoose = restful.mongoose;

var FixerSchema = new mongoose.Schema({
//    cmnd : {type: String, unique: true},
//    hoten : String,
//    gioitinh : String,
//    ngaysinh : String,
//    sodt : Number,
//    quequan : String,
//    diachi : {
//      phuong : String,
//      quan : String
//    },
//    trinhdohocvan : String,
//    sotruong:[],
//    sonamkinhnghiem : Number,
//    motakinhnghiem : String,
//    hinhanh : String,
//    luong : Number,
//    danhgia : String,
//    email : String
    
    cmnd : {type: String, unique: true},
    hoten : String,
    ngaysinh : String,
	gioitinh: String,
    sodt : Number,
    email : String,
    quequan : String,
    diachi : {
      tenkhuvuc : String,
      quan : String
    },
    trinhdohocvan : String,
    sotruong:[],
    sonamkinhnghiem : Number,
    motakinhnghiem : String,
    hinhanh : String,
    danhgia : String
});
module.exports = restful.model('tho',FixerSchema);