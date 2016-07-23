var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
   res.render('nhapQuan',{title : 'asss'});
});

module.exports = router;