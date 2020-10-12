var express = require('express')
var mysql = require('mysql')
var router = express.Router();
var connection = mysql.createConnection({
	host: 'localhost',
	port : 3306,
	user: 'root',
	password : 'tjddyd3329',
	database : 'jsman'
})

connection.connect();

router.post('/form',function(req,res){
	console.log(req.body.email)
	// res.send("<h1>welcome "+req.body.email+"</h1>")
	res.render("email.ejs",{'email': req.body.email})
})


router.post('/ajax', function(req,res){
	var email = req.body.email;
	var responseData={};

	var query = connection.query('select name from user where email="' + email + '"',function(err,rows){
		if(err) throw err;
		if(rows[0]){
			responseData.result = "ok";
			responseData.name = rows[0].name;
		}else{
			responseData.result = "none";
			responseData.name = "";
		}

		res.json(responseData)
	})

	//check validation about input value => select db
	
})

module.exports = router;