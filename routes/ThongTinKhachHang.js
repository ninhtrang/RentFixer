var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    console.log("thong tin khach hang");
    //res.render('Fixer_ChiTiet', {id: 133});
  	res.render('ThongTinKhachHang');
});
module.exports = router;