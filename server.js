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
