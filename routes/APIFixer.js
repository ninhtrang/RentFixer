var express  = require('express');
var router   =  express.Router();
var NhanVien = require('../Model/Fixer');
var Quan = require('../Model/Quan');
var DichVu = require('../Model/DichVu');
var Account = require('../Model/Account_KH');
var KhachHang = require('../Model/KhachHang');
var YeuCau = require('../Model/YeuCau');
var DetailYeuCau = require('../Model/DetailYeuCau');

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

DetailYeuCau.methods(['get','put','post','delete']);
DetailYeuCau.register(router,'/detailyeucau');

module.exports = router;