var express = require('express')
var mysql = require('mysql')
var router = express.Router();
var path = require('path');
var passport = require('passport');
const { Strategy } = require('passport');
const { connect } = require('../main/main');
var LocalStrategy = require('passport-local').Strategy

var connection = mysql.createConnection({
	host: 'localhost',
	port : 3306,
	user: 'root',
	password : 'tjddyd3329',
	database : 'jsman'
})

connection.connect();

router.get('/',function(req,res){
    var msg;
    var errMsg = req.flash('error')
    if(errMsg) msg = errMsg;
	res.render('join.ejs', {'message' : msg});
})

passport.serializeUser(function(user,done){
    console.log('passport session save:', user.email)
    done(null,user.email)
})

passport.deserializeUser(function(id,done){
    console.log('passport sessiong get id:',id)
    done(null,id)
})

passport.use('local-join', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    }, function(req, email, password, done){
        var query = connection.query('select * from user where email=?',[email], function(err,rows){
            if(err) return done(err);

            if(rows.length){
                return done(null, false, {message : 'your email is already used'})  //message는 app.js의 flash를 통해 알수있다.
            }else{
                var sql = {email: email, password: password};
                var query = connection.query('insert into user set ?', sql, function(err,rows){
                    if(err) throw err
                    return done(null,{'email':email})  //done이 fail이 아닐경우 serialize 불러오는데 그부분처리해야한다.
                })
            }
        })
    }))

router.post('/', passport.authenticate('local-join',{
    successRedirect: '/main',
    failureRedirect:'/join',
    failureFlash :true                  //callback 함수처럼, 실패했을때, 성공했을때 라우팅바로해준다.
}))

// router.post('/', function(req,res){
//     var body = req.body; //bodyparser app.js에서 적용시켜나서 가능
//     var email = body.email;
//     var name = body.name;
//     var password = body.password;
    
//     var query = connection.query('insert into user (email,name,password) values ("'+email+'","' + name+'","'+ password+'")',function(err,rows){
//         if(err){
//             throw err;
//         }else{
//             res.render('welcome.ejs',{'name':name})
//         }
        
//     })
// })

module.exports = router;