var mongoose = require('mongoose');
var Schema = mongoose.Schema;
module.exports.mongoose = mongoose;
module.exports.Schema = Schema;


// Connect to mongo
function connect() {
	console.log('mongoDB_driver - connect to db');
	var url = 'mongodb://ninhtrang:ninhtrang@ds029725.mlab.com:29725/thuctap'
	mongoose.connect(url);
}
function disconnect() {mongoose.disconnect()}
module.exports.connect = connect();
