var express = require('express'),
    request = require('request'),
    errorHandler = require('errorhandler'),
    app = express(),
	proxy = require('express-http-proxy');

var HOSTNAME = 'localhost',
    PORT = 8080,
    PUBLIC_DIR = __dirname + '/public_html';

var request_counter = 0;

app.use(function (req, res, next) {
	// Здесь нужно написать журналирование в фexормате
	// (журналирование - вывод в консоль)
	// [время] [номер запроса по счету]
	var request_time = new Date();
	console.log('Time: ', request_time.toString());
	console.log("Requests count: ", ++request_counter);
	next();
});
app
	.use('/', express.static(PUBLIC_DIR))
	.use(errorHandler());

app.listen(PORT,HOSTNAME,function () {
	console.log("Simple static server showing %s listening at http://%s:%s", PUBLIC_DIR, HOSTNAME, PORT);
});



