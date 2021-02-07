const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BiodataDb',{ useNewUrlParser: true , useUnifiedTopology: true });
const schema = mongoose.Schema;

var userSchema = new schema({
    email : String,
    password : String
});

var userData = mongoose.model('user',userSchema);

module.exports = userData;