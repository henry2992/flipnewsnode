var path = require('path');
var express = require('express');
var router = express.Router();

/*
 * This function will retrieve news from twitter (or from a dummy file)
 */
function getNews(req) {
	var filename = path.join(__dirname, '..', 'dummyData', 'news1.json');
	var url = 'http://' + req.headers.host;
	var fs = require('fs');
	var dummyData = JSON.parse(fs.readFileSync(filename));

	var len = dummyData.news.length;
	for (var i=0; i<len; i++) {
		var curr = dummyData.news[i];
		curr.image = curr.image.replace('#url', url);
		curr.source.image = curr.source.image.replace('#url', url);
	}
	
	return dummyData;
}

router.get('/', function(req, res, next) {
	//Remember to send the json object if using the EJS template engine
	//res.render('news', {news: getNews(req) });
	res.render('news');
});

router.get('/data', function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
    res.send(getNews(req));
});

module.exports = router;
