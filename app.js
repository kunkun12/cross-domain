
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('port1', process.env.PORT || 3002);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')))
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
function add(a,b){
	return a+b;
} 

function multiply(a,b){
		return a*b;
}
app.get('/add', function(req,res){
	var callbackname=req.query.callback||"callback";
	var a=parseInt(req.query.a);
	var b=parseInt(req.query.b);
 	res.send(callbackname+"("+add(a,b)+")");
});

app.get("/multiply",function(req,res){
	var a=parseInt(req.query.c);
	var b=parseInt(req.query.d);
	console.log(a);
	console.log(b);
	res.set({
	  'Access-Control-Allow-Origin': req.headers.origin,
	  'Access-Control-Allow-Credentials': true,
	  'Access-Control-Allow-Methods':'POST, GET, PUT, DELETE, OPTIONS'
	});
	var sum=multiply(a,b)
	res.status(200).send(sum.toString());
});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
http.createServer(app).listen(app.get('port1'), function(){
  console.log('Express server listening on port ' + app.get('port1'));
});
