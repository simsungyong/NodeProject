var express = require('express')
var app = express()
var router = express.Router();
var path = require('path') //상대경로

router.get('/',function(req,res){
	// res.send("hi friend!")
	// res.sendFile(path.join(__dirname,'../../public/main.html'))
	res.render('main.ejs',{'email' : req.user})
})

module.exports = router;