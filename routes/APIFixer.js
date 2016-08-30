var express  = require('express');
var router   =  express.Router();
//var mongoose = require('mongoose');

var NhanVien = require('../Model/Fixer');
var Quan = require('../Model/Quan');
var DichVu = require('../Model/DichVu');
var Account = require('../Model/Account_KH');
var KhachHang = require('../Model/KhachHang');
var YeuCau = require('../Model/YeuCau');
//var YeuCaumodel = mongoose.model('YeuCau', YeuCau);
//var DetailYeuCau = require('../Model/DetailYeuCau');

NhanVien.methods(['get','put','post','delete']);
NhanVien.register(router,'/fixer'); 

Quan.methods(['get','put','post','delete']);
Quan.register(router,'/quan');

DichVu.methods(['get','put','post','delete']);
DichVu.register(router,'/dichvu');

 Account.methods(['get','put','post','delete']);
Account.register(router,'/account');

KhachHang.methods(['get','put','post','delete']);
KhachHang.register(router,'/khachhang');

YeuCau.methods(['get','put','post','delete']);
YeuCau.register(router,'/yeucau');


router.get('/getid', function(req, res, next) {
	YeuCau.find({}, function(err, data) {
		if(err){
			res.send(err);
		}
		if(data.length === 0){
			res.send('YC001');
		}else {
			var lastID = data.slice(-1).pop().mayc;
			var index =  parseInt(lastID.substring(2));
			index = index + 1;
			if(index<10){
				res.send("YC00"+index);
			}else if (index<100) {
				res.send("YC0"+index);
			}else if(index < 1000){
				res.send("YC"+index);
			}
		}
	})
});

//DetailYeuCau.methods(['get','put','post','delete']);
//DetailYeuCau.register(router,'/detailyeucau');

module.exports = router;