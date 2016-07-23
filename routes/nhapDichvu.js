var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
   res.render('nhapDichvu',{title : 'asss'});
});

module.exports = router;