var LichLVSchema = require('../Model/BusyForCus');
var lichlamviectho = LichLVSchema.lichlamviectho;

var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  lichlamviectho.create({
            cmnd : req.body.cmnd,
            hotenKH : req.body.hotenKH,
            mayc : req.body.mayc,
            ngay : req.body.ngay,
            giobd : req.body.giobd,
            giokt : req.body.giokt

        }, function(err, _helper) {
            if (err){
                res.send(err);
                return;
            }
            res.end();
        });
});

module.exports = router;
