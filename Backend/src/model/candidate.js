const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BiodataDb',{ useNewUrlParser: true , useUnifiedTopology: true });
const schema = mongoose.Schema;

var candidateSchema = new schema({
    userid : String,
    name : String,
    f_name : String,
    m_name : String,
    phone : Number,
    email : String,
    age : Number,
    dob : Date,
    gender : String,
    address : String,
    pin : Number,
    qualification : String,
    objective : String
});

var CandidateData = mongoose.model('candidate',candidateSchema);

module.exports = CandidateData;