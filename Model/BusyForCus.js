

var database = require('../Database/MongoDBDriver');

var BusyCalSchema = new database.Schema({
    mayc : String,
    hotenKH : String,
	cmnd : String,
	ngay : String,
	giobd : Number,
	giokt : Number
});

module.exports.lichlamviectho = database.mongoose.model('lichlamviectho', BusyCalSchema);