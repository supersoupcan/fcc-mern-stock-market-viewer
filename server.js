const express = require('express');
const path = require('path');
const config = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methods = require('./methods');

var server = express();
mongoose.connect(config.mongoURL);

const expressWs = require('express-ws')(server);
let wssClients = expressWs.getWss().clients;

server.use(bodyParser.json());
server.use(express.static(path.resolve(__dirname, 'static')));

server.ws('/wss', (ws, req) => {
  methods.getStocks(ws);
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    switch(data.type){
      case "ADD" : {
        methods.addSymbol(data.payload, wssClients);
        break;
      }
      case "REMOVE" : {
        console.log('removing');
        methods.removeSymbol(data.payload, wssClients);
        break;
      }
    }
  });
  ws.on('close', () => {
    
  });
});

module.exports = server;