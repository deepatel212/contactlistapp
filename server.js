var express = require('express');
var app = express();
var mongo = require('mongojs');
var db = mongo('contactlist',['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist',function(req,res){
	console.log("I recieved GET request...");
								
	db.contactlist.find(function(err,docs){
		
		console.log(docs);
		res.json(docs);
	});
});
app.post('/contactlist',function(req,res){
	
	var count = db.contactlist.find(req.body.name);
	console.log(count);
		db.contactlist.insert(req.body,function(err,doc){
			res.json(doc);
		});

});

app.delete('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongo.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.get('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongo.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.put('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({query:{_id: mongo.ObjectId(id)},update:{$set:{name: req.body.name, email: req.body.email, number: req.body.number}},new:true},function(err,docs){
		res.json(docs);
	});
});

app.listen(3000);
console.log("server running on port 3000");