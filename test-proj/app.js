//dependencies

var express = require('express');
var http = require('http');
//loading mongo.js
var mongojs = require('mongojs');


//middleware stuff

var session = require('express-session'),
    logger = require('morgan'),
    errorHandler = require('errorhandler'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser');
    methodOverride   = require('method-override');



//create express objs
var app = express();
//create db object 
var db = mongojs("testsrv", ["serviceClients"]);
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
//app.use(methodOverride());




//start web server app
app.set('port', process.env.PORT || 3333);
app.use(express.static(__dirname + '/public'));


//routes

//get all 
app.get("/serviceClients", function(req, res ) {
   db.serviceClients.find(function (err, docs){
       res.json(docs);
   });

});


//post add record in database
app.post("/serviceClients", function(req, res ) {
  var svc = req.body;
  console.log(svc);

  //doing db insert
  db.serviceClients.insert(svc, function(err, doc){
       res.json(doc);
   });

});

//delete from database
app.delete("/serviceClients/:id", function(req, res){
   var id = req.params.id;
   console.log(id);
   db.serviceClients.remove({_id: mongojs.ObjectId(id)},
          function(err, doc) {
              res.json(doc);});

});


//get by id
app.get("/serviceClients/:id", function(req, res){
     var id = req.params.id;
     console.log(id);
     //now use db object to find one.
     db.serviceClients.findOne({_id: mongojs.ObjectId(id)},
            function(err, doc) {
              res.json(doc);});
     });

//now doing the update put

app.put("/serviceClients/:id", function(req, res){
    console.log(req.body);
    var id = req.params.id;
    db.serviceClients.findAndModify({ 
      query: {_id: mongojs.ObjectId(id)},
      update: { $set: {name: req.body.name} },
      new: true
    }, function(err,doc) {
            res.json(doc);})
  
  
    });



// telling middleware how to start


var server = http.createServer(app);
var boot = function() {
   server.listen(app.get('port'), function(){
       console.info('Express server listening on port ' + app.get('port'));
   });
}

var shutdown = function() {
   server.close();
}


if (require.main === module)  {
   boot();
}
else {
   console.info('running app as a module')
   exports.boot = boot;
   exports.shutdown = shutdown;
   exports.port = app.get('port');
}


