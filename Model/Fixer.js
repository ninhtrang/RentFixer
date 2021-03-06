
var restful = require('node-restful');
var mongoose = restful.mongoose;

var FixerSchema = new mongoose.Schema({
    cmnd : {type: String, unique: true},
    hoten : String,
    ngaysinh : Date,
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
    danhgia : String,
    xacnhan: Boolean
});
module.exports = restful.model('tho',FixerSchema);