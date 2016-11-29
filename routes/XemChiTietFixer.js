var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
	var id = req.session.idngv;
    console.log(id);

  	res.render('Fixer_ChiTiet', {id: id});
});
router.post('/', function(req, res, next){
	req.session.idngv = req.body.idngv;
    console.log(req.session.idngv);
	res.redirect('/nguoi_giup_viec');
})
module.exports = router;