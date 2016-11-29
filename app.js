var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var index = require('./routes/index');
var nhapFixer = require('./routes/nhapFixer');
var nhapQuan = require('./routes/nhapQuan');
var nhapDichvu = require('./routes/nhapDichvu');
var nhapAccount = require('./routes/nhapAcount');
var nhapKhachHang = require('./routes/nhapKhachHang');
var nhapYeuCau = require('./routes/Request');
var nhapDetailYeuCau = require('./routes/DetailRequest');
var nhapBusyCal = require('./routes/nhapBusyCal');
var nhapBusyForCus = require('./routes/nhapBusyForCus');
var xemChiTietFixer = require('./routes/XemChiTietFixer');
var thongKeDonHang = require('./routes/ThongKeDonHang');
var thongTinKhachHang = require('./routes/ThongTinKhachHang');
var google = require('./routes/GoogleAPI');
var search = require('./routes/Search');
var timkiem = require('./routes/APISearch');
var lichlamviec = require('./routes/APILichLamViec');
var mongoose = require('./Database/MongoDBDriver');

mongoose.connect;

var app = express();
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false
}));
//
app.use('/nhap',nhapFixer);
app.use('/nhapquan',nhapQuan);
app.use('/nhapdichvu',nhapDichvu);
app.use('/nhapaccount',nhapAccount);
app.use('/nhapkhachhang',nhapKhachHang);
app.use('/nhapyeucau',nhapYeuCau);
app.use('/nhapdetailyeucau',nhapDetailYeuCau);
app.use('/nguoi_giup_viec', xemChiTietFixer);
app.use('/thong_ke_don_hang',thongKeDonHang);
app.use('/thong_tin_khach_hang',thongTinKhachHang);
app.use('/get_address', google);
app.use('/search', search);

app.use('/', index);
app.use('/api',require('./routes/APIFixer'));
app.use('/api/timkiem', timkiem);
app.use('/api/lichlamviec', lichlamviec);



app.use('/favicon.ico',function(req,res,next){
    res.end();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
