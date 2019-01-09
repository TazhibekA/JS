

var express = require('express');
var exp = express();
exp.set('view engine','ejs');
exp.use('/public',express.static('public'));

exp.get('/', function(req,res){
  res.render('index',{lang:req.query.lang})
});

exp.get('/fuck', function(req,res){
  res.sendFile(__dirname + "/index.html");
  console.log('lul aknur zashla');

});

exp.get('/users/:id', function(req,res){
  res.render('users' , {client_id:req.params.id});
})
exp.listen(3000);
