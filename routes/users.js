var express = require('express');
var router = express.Router();
var twitter_client = require('twitter');

var client_twitter = new twitter_client({
  consumer_key: 'RZqXstKtZDV3VRlK3WSHPiiiv',
  consumer_secret: 'LfI9O378XUyey9gh2iOiqmKEFhM9XQ0R81Bb39miZb1MU0hE8S',
  access_token_key: '29156135-4xxWU681aoi10JOSIuOksUTyrJiGSuyt1PAlOtcW',
  access_token_secret: 'p8fjqZ3QQ8PBn8cymJCkxmgMtmnQh6Z0krzoRTMDEW2gS'
});
/* GET users listing. */
router.get('/', function(req, res, next) {
	// client_twitter.get('favorites/list', function(error, tweets, response){
	//   if(error) throw error;
	//   console.log(tweets);  // The favorites. 
	//   console.log(response);  // Raw response object. 
	// });//console.log(req);
  res.send('respond with a resource');
});

module.exports = router;
