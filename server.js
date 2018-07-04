var express = require('express');
var app = express();

var mongoClient = require('mongodb').MongoClient; 
var url = "mongodb://localhost:27017/userdetails";
var bodyParser = require('body-parser'); //var db = mongoClient('contactlist',['contactlist']);
/*app.get('/',function(req, res){
res.send("Heloo from server.js");
});*/

app.use(express.static(__dirname + "/public")); app.use(bodyParser.json());

app.post('/loginuser', function(req, res){
    console.log("I received a POST request!!");

    mongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("userdetails");
            var query = { email: req.body.email, password: req.body.password};
            dbo.collection("userdetails").find(query).toArray(function(err,result) {
                if (err) throw err;
                res.send(result);
            });
    });

});


app.post('/registeruser', function(req, res){
    console.log("I received a POST request!!!!");
    //console.log(req.body);
    mongoClient.connect(url, function(err, db){
    	if (err) throw err;
    	var dbo = db.db("userdetails");
    	var myObj = {
    		name: req.body.name,
    		email:req.body.email,
            password:req.body.password,
    		phone:req.body.phone
    	};
    	dbo.collection("userdetails").insertOne(myObj,function(err, result){
    		if (err) throw err;
    		console.log("1 document inserted"+res);
    		res.send(result);
    	});
    });

});

app.listen(3000);
console.log("Server running on port 3000");
