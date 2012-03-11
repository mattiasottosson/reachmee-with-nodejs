
/**
 * Module dependencies.
 */

var express = require('express'); 

var app = module.exports = express.createServer();
appPath = __dirname;

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(express.static(__dirname + '/public'));
});


// Load helpers
app.helpers(require('./helpers/helpers.js'));

// Load controller
require(appPath+'/controllers/index.js');

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get("/", function(req,res){
  indexPage.init(res,'local');
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Listening on " + port);
});

// Uncomment this if you're not using learboost/up
// app.listen(3000);
// console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
