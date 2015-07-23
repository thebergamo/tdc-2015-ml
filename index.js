var Promise = require('bluebird');
var natural = require('natural'); // import framework
var Diffbot = require('diffbot-api-client');

var diffbot = new Diffbot({token: process.env.DIFFBOT_TOKEN});
var article = 'http://blog.modulus.io/writing-your-first-npm-module'; //'http://matt-harrison.com/moving-from-express-to-hapi-js/';
var article2 = 'https://nodesource.com/blog/your-first-nodejs-package'; //'https://www.airpair.com/node.js/posts/nodejs-framework-comparison-express-koa-hapi';

var retArticle = function(link){
	return new Promise(function(resolve, reject){
		diffbot.analyze({url: link}, function(err, request, result){
			if(err){
				return reject(err);
			}
			
			result = JSON.parse(result);
			return resolve(result.objects[0].text);
		});
	});
}

Promise.props({
	article: retArticle(article),
	article2: retArticle(article2)
})
.then(function(results){
//var similarity = natural.JaroWinklerDistance(quote, quote3); 
	var similarity = natural.JaroWinklerDistance(results.article, results.article2);
// classification heuristic more than 50% similar
	if(similarity >= 0.5){
		console.log('Text are similar or about the same things');
	}else{
		console.log('Text aren\'t similar!'); 
	}
	console.log('similarity: '+similarity);
});

// classification heuristic more than 58% similar
// if(similarity >= 0.58){
// 	console.log('Text are similar or about the same things');
// }else{
// 	console.log('Text aren\'t similar!'); 
// }
// console.log('similarity: '+similarity);
