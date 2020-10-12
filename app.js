var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var router = require('./router/index');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var flash = require('connect-flash')



app.listen(3000, function(){
	console.log("start! express server on port 3000");
});


app.use(express.static('public'))  //static으로 경로 설정
// console.log("e!!nd of server...") //비동기로 되서 이줄이 먼저 출력됨.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))   //바디파서 설정해놓으면 라우터에서도 적용됨.
app.set('view engine', 'ejs')

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}))
app.use(passport.initialize())   //middleware 설정.
app.use(passport.session())
app.use(flash())

app.use(router);



