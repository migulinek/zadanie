const http = require('http');
const querystring = require('querystring');

var port = 8081;
global.rand = Math.floor(Math.random() * 10000) + 1;

var s = http.createServer();
s.on('request', function(request, response) {
	 response.setHeader('Access-Control-Allow-Origin', '*');
    response.writeHead(200);
    var data = '';
    request.on('data', function(chunk) {
        data += chunk.toString();
    });
    request.on('end', function() {
		  let params = querystring.parse(data);
		  let num = parseInt(params.num);

		  let msg = '';

		  if(global.rand === num){
			  msg = 'ok';
		  }else if(global.rand > num){
			  msg = 'toosmall';
		  }else{
			  msg = 'toobig';
		  }

		  let log = JSON.stringify({
			 send: num,
			 msg: msg
		  });

        response.write(log);
        response.end();
    });

});

s.listen(port);
console.log('Browse to http://127.0.0.1:' + port);
