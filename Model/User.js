var userSchema = new mongoose.Schema({
    username : {type: String, unique: true},
    passwork : String,
	quyen: String,
	cmnd: String
});
module.exports = restful.model('user',userSchema);