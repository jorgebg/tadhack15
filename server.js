#!/bin/env node

var tropowebapi = require('tropo-webapi'),
  express = require('express'),
  bodyParser = require('body-parser'),
  _ = require('underscore');

// SIP phono operators registered
var operators = [];

// Config from env vars
var publicConfig = _.pick(process.env, 'PHONO_APIKEY')

// Create an express application
var app = express();

// Configure
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

// Client
app.get('/', function(req, res) {
  res.render('index.ejs', {
    "config": publicConfig
  });
});


app.get('/operators', function(req, res) {
  res.json(operators);
})

app.post('/operators', function(req, res) {
  var sip = req.body.sip;
  if (sip) {
    if (operators.indexOf(sip) == -1) {
      operators.push(sip);
    }
    res.sendStatus(200)
  } else {
    res.sendStatus(400)
  }
});

app.delete('/operators', function(req, res) {
  operators = [];
  res.sendStatus(200);
})

// Tropo API endpoint
app.post('/call', function(req, res) {
  var cmd = {
    "tropo": [{
      "say": [{
        "value": "There are " + operators.length + " available operators. Transferring you now."
      }]
    }, {
      "transfer": {
        "to": operators,
        "choices": {
          "terminator": "#"
        },
        "on": {
          "say": {
            "value": "http://www.phono.com/audio/holdmusic.mp3"
          },
          "event": "ring"
        }
      }
    }]
  };
  res.json(cmd);
});


var ip = process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;
app.listen(port, ip);
console.log('Visit http://' + ip + ':' + port + '/ to accept inbound calls!');
