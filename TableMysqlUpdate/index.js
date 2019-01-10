var express = require('express');
var exp = express();
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });
var mysql = require('mysql');

exp.use('/public', express.static('public'));

exp.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

exp.post('/add_data', urlencodeParser, function(req, res) {
  var con = mysql.createConnection({
    host: "82.200.170.122",
    port: "3306",
    user: "testuser",
    password: "qwerty123123",
    database: "test"
  });

  if (req.body.tr_id=='') {
    var sql = "INSERT INTO users (first_name, last_name, age) VALUES (?,?,?)";
    con.query(sql, [req.body.first_name, req.body.last_name, req.body.age], function(err, result, fields) {
      if (err) res.send(err);
      res.send('it`s ok!');
    });
  } else {
    var sql = "UPDATE users SET first_name=?, last_name=?, age=? WHERE id=?";
    con.query(sql, [req.body.first_name, req.body.last_name, req.body.age, parseInt(req.body.tr_id)], function(err, result, fields) {
      if (err) res.send(err);
      res.send('it`s ok!');
    });
  }


})

exp.get('/data', function(req, res) {
  var con = mysql.createConnection({
    host: "82.200.170.122",
    port: "3306",
    user: "testuser",
    password: "qwerty123123",
    database: "test"
  });

  con.query("SELECT * FROM users ORDER BY id DESC LIMIT 20", function(err, result, fields) {
    if (err) throw err;

    data = {
      'data': []
    };
    result.forEach(function(entry) {
      hh = [entry.id, entry.first_name, entry.last_name, entry.age];
      data.data.push(hh);
    });
    res.send(data);
  });

})


exp.listen(3000);
console.log('OK LISTEN 3000 good ok');
