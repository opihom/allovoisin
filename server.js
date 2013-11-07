<<<<<<< HEAD
var express = require('express'),
    path = require('path'),
    http = require('http'),
    allovoisin = require('./routes/allovoisin');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 5000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/voisin', allovoisin.findAll);
app.post('/voisin', allovoisin.addVoisin);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
=======
var express = require("express");
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.send('AlloVoisin bientôt en ligne !!!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
>>>>>>> 8388a7178061108fac14f7414ef22ea3ee5a1b61
