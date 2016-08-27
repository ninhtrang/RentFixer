
var restful = require('node-restful');
var mongoose = restful.mongoose;

var DichVuSchema = new mongoose.Schema({
   tenDichVu: {type: String, unique: true},
	phiTheoGio: Number,
    mota : String
});
module.exports = restful.model('dichvu',DichVuSchema);