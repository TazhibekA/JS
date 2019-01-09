// var http = require('http');
// var fs = require('fs');
//
// var server = http.createServer(function(req, res){
//   res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
//   var mread = fs.createReadStream(__dirname + '/olololll.txt', 'utf8');
//   mread.pipe(res);
// });
//
// server.listen(3000, '127.0.0.1');
// console.log('listen 3000');

//
var express= require('express');
var exp=express();
exp.set('view engine','ejs');

exp.get('/my',function(req,res){
res.sendFile(__dirname + '/my.html');
console.log("qwerty");
});
exp.get('/',function(req,res){
res.sendFile(__dirname + '/index.html');
console.log("qwerty");
});

exp.get('/qwer/:id',function(req,res){
res.render('my',{a:123});

});

exp.listen(5000);


// exp.get('/qwer',function(req,res){
// res.send('qwerty');
// console.log("qwerty");
// });
// exp.get('/qwer/:id',function(req,res){
// res.send('qwerty'+ req.params.id);
// console.log("qwerty");
// });

// exp.set('view engine','ejs');
// // exp.use('/public',express.static('public'));
// // exp.get('/client/:client_id',function(req,res){
// // res.render( 'index',{client_id: req.params.client_id});
// // });
// //
// // exp.listen(3000);
//
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

 const mongoose = require('mongoose');
mongoose.connect('mongodb://aknur:Totashka78@ds139883.mlab.com:39883/aknurdb',  {useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (){
  console.log("we're connected!");
});

 exp.get('/login', function(req, res){
   res.render('res');
 });

 exp.post('/login', urlencodedParser, function(req, res){
   db.collection('aknurcoll').insertOne(req.body);
   res.send(req.body);
 });

exp.listen(3000);
