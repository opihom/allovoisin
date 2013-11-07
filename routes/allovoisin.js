var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('allovoisindb', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'allovoisindb' database");
        db.collection('voisins', {safe:true}, function(err, collection) {
            //if (err) {
                console.log("La collection 'allovoisins' n'existe pas. Création d'un jeu de données en cours...");
                populateDB();
           // }
        });
    }
});


exports.findAll = function(req, res) {
    db.collection('voisins', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addVoisin = function(req, res) {
    var voisin = req.body;
    console.log('Adding voisin: ' + JSON.stringify(voisin));
    db.collection('voisins', function(err, collection) {
        collection.insert(voisin, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'Une erreur est survenue'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}


/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var voisins = [

    {
        email: "n.bekaert@gmail.com",
        login: "n.bekaert",
        pwd: "amelie"
    },
    {
        email: "amelie.caillarec@gmail.com",
        login: "amelie.caillarec",
        pwd: "nicolas"
    }];

    db.collection('voisins', function(err, collection) {
        collection.insert(voisins, {safe:true}, function(err, result) {});
    });

};