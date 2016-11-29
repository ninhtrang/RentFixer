
var database = require('../Database/MongoDBDriver');

var BusyForCusSchema = new database.Schema({
    cmnd : String,
	ngay : String,
	giobd : Number,
	giokt : Number
});

module.exports.lichbantho = database.mongoose.model('lichbantho', BusyForCusSchema);