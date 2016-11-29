var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
   res.render('nhapBusyForCus',{title : 'asss'});
});

module.exports = router;