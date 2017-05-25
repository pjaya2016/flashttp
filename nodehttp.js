var http = require('http');


var _get = function (Url, Headers = {}) {

    return new Promise((resolve, reject) => {
        var res = Url.match(/[A-z0-9.]+(?=\/[a-z0-9])|\/(\S)*/g);
        var options = {
            hostname: res[0],
            port: 80,
            path: res[1],
            method: 'GET',
            headers: Headers
        };
        var req = http.request(options, function (res) {
            //   console.log('Status: ' + res.statusCode);
            //   console.log('Headers: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');

            res.on('data', function (body) {
                resolve(JSON.parse(body));
            });

        });
        req.on('error', function (e) {
            reject('problem with request: ' + e.message);
        });
        req.end();
    });


}

module.exports = {
    Get: _get
}

/* 
var options = {
  hostname: 'jsonplaceholder.typicode.com',
  port: 80,
  path: '/posts/',
  method: 'PATCH',
  headers: {
      'Content-Type': 'application/json',
  }
};
var req = http.request(options, function(res) {
  
  console.log('Status: ' + res.statusCode);
  console.log('Headers: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  
  res.on('data', function (body) {
    console.log('Body: ' + body);
  });


});
req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});
// write data to request body
req.write('{"body": "Hello, World"}');
req.end();

*/


