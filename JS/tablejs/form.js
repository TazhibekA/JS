var express = require('express');
var exp = express();
var urlencodeParser = bodyParser.urlencoded({ extended: false });
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "82.200.170.122",
  user: "testuser",
  password: "qwerty123123",
  database: "test"
});

con.connect(function(err) {
  if (err) throw err;
});

exp.use('/public', express.static('public'));

exp.get('/', function(req, res) {
  res.sendFile(__dirname + '/form.html');
});

exp.get('/table', function(req, res) {
  res.sendFile(__dirname + '/table.html');
});

exp.get('/data', function(req, res) {
    con.query("SELECT * FROM users ORDER BY id ASC", function(err, result, fields) {
    if (err) throw err;
    data = {
      'data': []
    };
    result.forEach(function(entry) {
      hh = [entry.first_name, entry.last_name, entry.first_name, entry.last_name, entry.first_name, entry.last_name];
      data.data.push(hh);
      console.log(data);
    });
    res.send(data);
  })
});

/*
exp.post('/', urlencodeParser, function(req, res) {
  if ((req.body.name == '123123') && (req.body.password == '123123'))
    res.send(md5(req.body.name));
  else {
    res.send('0');
  }
});
*/

exp.listen(3000);
