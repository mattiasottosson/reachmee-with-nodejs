var http = require('http'),
    url = require('url');
    sys = require('util'),
    fs = require('fs'),
    xml2js = require('xml2js-expat');

indexPage = {
  host: 'web102.reachmee.com',
  path: '/I009/blocket/LLPage/RSSFeed/external.ashx?id=5',
  jobData: undefined,
  errorMsg: undefined,
  
  init: function(res,mode) {
    this.res = res;
    this.mode = mode;
    this.mode == 'local' ? this.loadMockXml() : this.makeHttpRequest();
  },
  
  makeHttpRequest: function() {
    var site = http.createClient(80, this.host);
    var request = site.request("GET", this.path, {'host' : this.host})
    request.end();

    request.on('response', function(response) {
      response.setEncoding('utf8');
      if(response.statusCode === 200) {
        response.on('data', function(data) {
          indexPage.parseXml(data);
        });
      } else {
        console.log('Error: '+ response.statusCode);
      }
    });
  },
  
  loadMockXml: function() {
    fs.readFile(appPath+'/test.xml', function(err, data) {
      if(err == null) { indexPage.parseXml(data); }
    });
  },
  
  parseXml: function(data) {
    var parser = new xml2js.Parser(function(result, error) {
      if (!error) {
        indexPage.jobData = result;
        // console.log(sys.inspect(result));
      } else {
        indexPage.errorMsg = error;
        // console.error(error);
      }
    });
    
    if (parser.parseString(data)) {
      console.log('xml2js: successfully parsed file.');
      this.renderTemplate()
    } else {
      console.error('xml2js: parse error: "%s"', parser.getError());
    }

  },
  
  renderTemplate: function() {
    this.res.render('index', { title: 'Express', jobData: this.jobData, errorMsg: this.errorMsg })
  }
  
}

exports.index = function(req, res){
  indexPage.init(res,'local');
};
