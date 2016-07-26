var express  = require('express');
var router   =  express.Router();
var NhanVien = require('../Model/Fixer');
var Quan = require('../Model/Quan');
var DichVu = require('../Model/DichVu');
var KhachHang = require('../Model/KhachHang');

NhanVien.methods(['get','put','post','delete']);
NhanVien.register(router,'/fixer'); 

Quan.methods(['get','put','post','delete']);
Quan.register(router,'/quan');

DichVu.methods(['get','put','post','delete']);
DichVu.register(router,'/dichvu');

KhachHang.methods(['get','put','post','delete']);
KhachHang.register(router,'/khachhang');

module.exports = router;