var express= require('express');
var exp=express();
var WebSocket = require('ws');
var wsServer = new WebSocket.Server({ port: 3333 });

exp.get('/',function(req,res){
res.sendFile(__dirname + '/index.html');
console.log("qwerty");
});

wsServer.on('connection', ws => {
   console.dir(ws);


   ws.on('message', message => {
     // console.log(message);
     // ws.send(message);
     // console.log(wsServer.clients);
     wsServer.clients.forEach(client => {
        if (client.readyState == WebSocket.OPEN) {
          client.send(message);
        }
       })
      })


 })
