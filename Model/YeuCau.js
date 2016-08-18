
var restful = require('node-restful');
var mongoose = restful.mongoose;

var YeuCauSchema = new mongoose.Schema({
    ngaydatyeucau : String,
    chiphi : String,
    hotenkh : String,
    sodtkh : String,
    dichvu : String,
    diachikh : String,
    cmndfixer : String,
    hotenfixer : String,
    trangthai : String,
    hinhthucthanhtoan : String
});
module.exports = restful.model('YeuCau',YeuCauSchema);