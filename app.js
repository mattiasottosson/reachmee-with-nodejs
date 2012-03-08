
/**
 * Module dependencies.
 */

var express = require('express'); 

var app = module.exports = express.createServer();
appPath = __dirname;

// Added controller
require(appPath+'/controllers/index.js');

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

// Ejs Helpers
app.helpers({

  daysLeft: function(endDate) { 
    var diff = new Date(endDate) - new Date();
    var days = Math.floor(diff/1000/3600/24+1);

    if(days < 0) { 
      return {className: 'days-0', text: '0 dagar kvar'} 
    }
    
    switch (days) {
      case 0:
        return {className: 'days-0', text: '0 dagar kvar'}
      case 1:
        return {className: 'days-1', text: '1 dag kvar'}
      default:
        return {className: 'days-'+days, text: days+' dagar kvar'}
    }
  }

});


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
