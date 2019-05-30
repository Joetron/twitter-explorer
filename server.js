require('dotenv').config();
var Twit      = require('twit');
var express   = require('express');
var app       = express();

const TWIT_CONSUMER_KEY         = process.env.CONSUMER_KEY;
const TWIT_CONSUMER_SECRET      = process.env.CONSUMER_SECRET;

var T = new Twit({
  consumer_key:         TWIT_CONSUMER_KEY,
  consumer_secret:      TWIT_CONSUMER_SECRET,
  app_only_auth:        true
});

// enable CORS for cross-browser support
app.use(function(_, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

app.get('/query', function (req, res) {
    T.get('search/tweets', req.query)
		.catch(error => {
			res.send(error)
		})
		.then(result =>  {
			res.send(result);
        });
});

app.listen(3001, function () {
    console.log("Listening on 3001...");
});