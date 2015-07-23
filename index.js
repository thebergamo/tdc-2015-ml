var natural = require('natural'); // import framework

var quote = 'Node.js are good to create ours api';
var quote2 = 'In a beatiful day my little poney has begun!';
var quote3 = 'Addons can be create in C/C++ to run in Node.js';
var similarity = natural.JaroWinklerDistance(quote, quote3); 


// classification heuristic more than 58% similar
if(similarity >= 0.58){
	console.log('Text are similar or about the same things');
}else{
	console.log('Text aren\'t similar!'); 
}
console.log('similarity: '+similarity);
