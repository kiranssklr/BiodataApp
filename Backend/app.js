const express = require('express');
const { urlencoded } = require('express');
var bodyparser=require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
var CandidateData = require('./src/model/candidate');
var userData = require('./src/model/userData');


const app = express();
app.use(urlencoded({extended:true}));
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

username = 'admin@gmail.com';
password = '123456';


app.post('/addUser',function(req,res){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');    
    var user = {
        email : req.body.newUser.email,
        password : req.body.newUser.password
    }
    var user = new userData(user);
    console.log(user);
    user.save();
})

app.post('/login',function(req,res){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');   
    let loginData = req.body;
    if(username != loginData.email || password != loginData.password){
        res.status(401).send('Invalid Username or Passsword');
        console.log('Invalid Username or Passsword');
    }
    else{
        let payload = { subject : username + password }
        var token = jwt.sign(payload,'secretkey');
        res.status(200).send({token,username});
        console.log(token);
    }    
})

app.post('/addResume',verifyToken,function(req,res){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');    
    var candidate = {
        userid : req.body.resume.userid,
        name : req.body.resume.name,
        f_name : req.body.resume.f_name,
        m_name : req.body.resume.m_name,
        phone : req.body.resume.phone,
        email : req.body.resume.email,
        age : req.body.resume.age,
        dob : req.body.resume.dob,
        gender : req.body.resume.gender,
        address : req.body.resume.address,
        pin : req.body.resume.pin,
        qualification : req.body.resume.qualification,
        language : req.body.resume.language,
        objective : req.body.resume.objective        
    }
    var candidate = new CandidateData(candidate);
    candidate.save();
    console.log(candidate);
})


function verifyToken(req,res,next){
    let token = req.headers.authorization.split('')[1]
    let payload = jwt.verify(token,'secretkey');
    console.log(payload);

    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized Request');
    }
    if(token == null){
        return res.status(401).send('Unauthorized Request');
    }
    if(!payload){
        return res.status(401).send('Unauthorized Request');
    }
    req.userid = payload.subject;
    next()
}

app.listen(5000);