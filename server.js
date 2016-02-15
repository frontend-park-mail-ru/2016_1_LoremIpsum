var express = require('express'),
    errorHandler = require('errorhandler'),
    app = express();

var events = require('events');
var eventEmitter = new events.EventEmitter();

var HOSTNAME = 'localhost',
    PORT = 8080,
    PUBLIC_DIR = __dirname + '/public_html';

var reqCounter = 0;

app.use(function (req, res, cb) {
	// Здесь нужно написать журналирование в формате
	// (журналирование - вывод в консоль)
	// [время] [номер запроса по счету]
	var date = new Date();
	console.log("[" + date + "]" + " | " + "request number " + ++reqCounter)
	cb()
});

app
	.use('/', express.static(PUBLIC_DIR)) 
	.use(errorHandler()); 

app.listen(PORT, function () {
	console.log("Simple static server showing %s listening at http://%s:%s", PUBLIC_DIR, HOSTNAME, PORT);
});

