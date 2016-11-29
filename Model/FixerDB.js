var database = require('../Database/MongoDBDriver');

var FixerSchema = new database.Schema({
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
    danhgia : String
});

module.exports.Fixer = database.mongoose.model('tho2', FixerSchema);