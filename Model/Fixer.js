
var restful = require('node-restful');
var mongoose = restful.mongoose;

var FixerSchema = new mongoose.Schema({
    cmnd : {type: String, unique: true},
    hoten : String,
    ngaysinh : String,
    sodt : Number,
    quequan : String,
    diachi : {
      phuong : String,
      quan : String
    },
    sotruong:[],
    sonamkinhnghiem : Number,
    motakinhnghiem : String,
    hinhanh : String,
    luong : Number,
    danhgia : String,
    email : String
});
module.exports = restful.model('Fixer',FixerSchema);