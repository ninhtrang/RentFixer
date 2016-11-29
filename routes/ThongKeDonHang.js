var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    console.log("thong ke don hang");
    //res.render('Fixer_ChiTiet', {id: 133});
  	res.render('ThongKeDonHang');
});
module.exports = router;