"use strict";
(function(){
	var http = require("http"),
		fs = require("fs"),
		url = require("url"),
		server = http.createServer(function(req, res){
			var parsedUrl = url.parse(req.url, true);
			res.writeHead(200, {"content-type":"application/json"});
			res.write(parsedUrl.query.callback+"(");
			fs.readFile("/home/piyush/coding/intlAng/recs_MC_148.json","utf8", function(err, data){
				res.write(data);
				res.write(")");
				setTimeout(function(){res.end();}, 3000);
				//res.end();
			});
			//writeJson(res);
		});

	server.listen(8888);
	
})();
