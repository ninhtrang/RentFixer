var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports.mongoose = mongoose;
module.exports.Schema = Schema;


// Connect to mongo
function connect() {
	console.log('mongoDB_driver - connect to db');
	var url = 'mongodb://Trang:trang829084@ds021884.mlab.com:21884/demo1'
	mongoose.connect(url);
}
function disconnect() {mongoose.disconnect()}
module.exports.connect = connect();
