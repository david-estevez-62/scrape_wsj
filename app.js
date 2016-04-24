var request = require('request'),
  cheerio=require('cheerio'),
  express=require('express'),
  jade=require('jade'),
  urls = []


var app = express();


app.set('view engine', 'jade');
app.set('views', __dirname + '/views/');
app.use(express.static(__dirname + '/public'));





app.get('/', function(req, res){

  request('http://www.wsj.com', function(err, resp, body){
    if(!err && resp.statusCode == 200){
      var $ = cheerio.load(body);

      $('a.wsj-headline-link', '.wsj-list').each(function(){

          var url = this.attr('href');

          if(url.indexOf('http://www.wsj.com/articles') != -1){
            url = url.substring(28)

            urls.push(url);
          }

      });

    }
  })


  request('http://www.wsj.com/news/business', function(err, resp, body){
    if(!err && resp.statusCode == 200){
      var $ = cheerio.load(body);

      $('a', 'article').each(function(){
          // console.log(1+'\n')

          var url = this.attr('href');

          if(url.indexOf('http://www.wsj.com/articles') != -1){
            url = url.substring(28)

            urls.push(url);
          }
          
      });

      res.render('index', {urls: urls});
    }
  })


  
})



var server = app.listen(process.env.PORT || 8080, function () {
  console.log('Express server listening on port ' + server.address().port);

});