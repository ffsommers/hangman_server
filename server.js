var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var request = require('request').defaults({ encoding: null });
var port = process.env.PORT || CONFIG.port;
app.listen(port);
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.post('/words', function (req, res) {
	var userDifficulty = req.body.difficulty;
	// var userCount = req.body.rounds;
	var words = [];
	// console.log("difficulty!!!   "+userDifficulty );
	// console.log("ROUNDS!!!  " +userCount);
	request('http://linkedin-reach.hagbpyjegb.us-west-2.elasticbeanstalk.com/words?difficulty='+ userDifficulty, function(err, res, body){
		var requestString = body.toString('utf8').replace(/(\r\n|\n|\r)/gm," ");
		wordsArray = requestString.split(' ');
		if (wordsArray.length >= 1){
			sendArray(wordsArray);
		}

	});

		 function sendArray(input){
	 	res.send(input)
	 }

})
