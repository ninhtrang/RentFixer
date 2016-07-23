
var restful = require('node-restful');
var mongoose = restful.mongoose;

var DichVuSchema = new mongoose.Schema({
    tendichvu : String,
    mota : String
});
module.exports = restful.model('DichVu',DichVuSchema);