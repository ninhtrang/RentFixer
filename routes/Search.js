var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {

           var quan = req.body.quan;
            var ngay = req.body.ngay;
           var dichvu = req.body.dichvu;
            var giobd1 = req.body.giobd1;
            var giokt1 = req.body.giokt1;
    var ngaydat = req.body.newDate;

    req.session.tenquan = quan;
    req.session.tendichvu = dichvu;
    req.session.ngay = ngay;
    req.session.giobd = giobd1;
    req.session.giokt = giokt1;
    console.log(req.session.tenquan);

    res.redirect('/search' );
});
/* GET users listing. */
router.get('/', function(req, res, next) {
    var tenquan = req.session.tenquan;
    var tendichvu = req.session.tendichvu;
    var ngay = req.session.ngay;
    var giobd = req.session.giobd;
    var giokt = req.session.giokt;
  	res.render('Search', {tenquan:tenquan,tendichvu:tendichvu,ngay:ngay,giobd:giobd,giokt:giokt});
});

module.exports = router;
