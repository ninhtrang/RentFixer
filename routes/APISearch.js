//var FixerSchema = require('../Model/FixerDB');
//var fixer = FixerSchema.Fixer;

var LichBanThoSchema = require('../Model/BusyCal');
var lichbantho = LichBanThoSchema.lichbantho;

var LichLVSchema = require('../Model/BusyForCus');
var lichlamviectho = LichLVSchema.lichlamviectho;

var express = require('express');
var router = express.Router();

router.post('/lichban', function(req, res, next) {
    
    var dataTimKiem = {
            gioBD: req.body.gioBD,
            gioKT: req.body.gioKT,
            quan: req.body.quan,
            dichvu: [req.body.dichvu],
            ngay: req.body.ngay
        }
    lichbantho.find({
        ngay: dataTimKiem.ngay,
        $or:[
            {giobd : {$gte:dataTimKiem.gioBD, $lt:dataTimKiem.gioKT}},
            {giokt : {$gt:dataTimKiem.gioBD, $lte:dataTimKiem.gioKT}},
            {
                giobd : { $lte:dataTimKiem.gioBD},
                giokt : {$gte:dataTimKiem.gioKT}
            }
        ]
    }, function (err, dsLichBan) {
        if (err){
            res.send(err);
            return;
        }
        res.json(dsLichBan);
        
        
    });
    
});


router.post('/lichlamviec', function(req, res, next) {
    
    var dataTimKiem = {
            gioBD: req.body.gioBD,
            gioKT: req.body.gioKT,
            quan: req.body.quan,
            dichvu: [req.body.dichvu],
            ngay: req.body.ngay
        }
    lichlamviectho.find({
        ngay: dataTimKiem.ngay,
        $or:[
            {giobd : {$gte:dataTimKiem.gioBD, $lt:dataTimKiem.gioKT}},
            {giokt : {$gt:dataTimKiem.gioBD, $lte:dataTimKiem.gioKT}},
            {
                giobd : { $lte:dataTimKiem.gioBD},
                giokt : {$gte:dataTimKiem.gioKT}
            }
        ]
    }, function (err, dsLichLV) {
        if (err){
            res.send(err);
            return;
        }
        
        res.json(dsLichLV);
        
    });
});


module.exports = router;