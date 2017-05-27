"use strict";
var http = require('http');

/**
 * @param {int} status
 * @return {Object} this object contains statusMsg && responseCode 
 * e.g. { statusMsg: "Success", responseCode: 0 }
 */
var checkStatusXHTTPResponse = function (status) {
    /*
    responseCode  = 0 // codes that are bettween 200 - 299
    responseCode  = 1 // codes that are bettween 300 - 399
    responseCode  = 2 // codes that are bettween 400 - 499
    responseCode  = 2 // codes that are bettween 500 - 599
     */
    var result;
    switch (true) {
        case status == 200 || status < 300:
            result = { statusMsg: "Success", responseCode: 0 }
            break;
        case status == 300 || status < 400:
            result = { statusMsg: " Redirection", responseCode: 1 }
            break;
        case status == 400 || status < 500:
            result = { statusMsg: "Client errors", responseCode: 2 }
            break;
        case status == 500 || status < 600:
            result = { statusMsg: "Server error", responseCode: 3 }
            break;
    }
    return result;
}

/**
 * @param {string ,  int , string  } res, status, statusMessage
 * @return {Object} this object contains Response && Status &&  StatusMessage
 * e.g. {
        Response: { statusMsg: "Client errors", responseCode: 2 },
        Status: 400,
        StatusMessage: Client errors
    }
 */
var ParseXHTTPJSONRequest = function (res, status, statusMessage) {
    return {
        Response: JSON.parse(res),
        Status: status,
        StatusMessage: statusMessage
    }
}

/**
 * @param {string ,  Object  } Url, Headers
 * GET Request or GET/ID 
 * @return Promise which is resolved or  rejected
 */
var _get = function (Url, Headers = {}) {

    return new Promise((resolve, reject) => {
        var res = Url.replace(/(?:http:|https:)\/\//, "").match(/[A-z0-9.]+(?=\/[a-z0-9])|\/(\S)*/g);
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
            var ResCode = checkStatusXHTTPResponse(res.statusCode);
            res.on('data', function (body) {

                if (ResCode.responseCode == 0 || ResCode.responseCode == 1) {
                    resolve(ParseXHTTPJSONRequest(body, res.statusCode, ResCode.statusMsg));
                } else if (ResCode.responseCode == 2 || ResCode.responseCode == 3) {
                    reject(ParseXHTTPJSONRequest(body, res.statusCode, ResCode.statusMsg));
                }

            });

        });
        req.on('error', function (e) {
            reject('problem with request: ' + e.message);
        });
        req.end();
    });
}

/**
 * @param {string ,  Object , Object  } Url, Headers, obj = null
 * POST Request 
 * @return Promise which is resolved or  rejected
 */
var _post = function (Url = '', Headers = {}, obj = {}) {

    var res = Url
        .replace(/(?:http:|https:)\/\//, "")
        .match(/[A-z0-9.]+(?=\/[a-z0-9])|\/(\S)*/g);

    var options = {
        hostname: res[0],
        port: 80,
        path: res[1],
        method: 'POST',
        headers: Headers
    };
    return new Promise((resolve, reject) => {
        var req = http.request(options, function (res) {
            res.setEncoding('utf8');
            var ResCode = checkStatusXHTTPResponse(res.statusCode);
            res.on('data', function (body) {
                if (ResCode.responseCode == 0 || ResCode.responseCode == 1) {
                    resolve(ParseXHTTPJSONRequest(body, res.statusCode, ResCode.statusMsg));
                } else if (ResCode.responseCode == 2 || ResCode.responseCode == 3) {
                    reject(ParseXHTTPJSONRequest(body, res.statusCode, ResCode.statusMsg));
                }
            });
        });
        req.on('error', function (e) {
            reject('problem with request: ' + e.message);
        });
        req.write(JSON.stringify(obj));
        req.end();
    })

}

/**
 * @param {string ,  Object , Object  } Url, Headers, obj = null
 * PUT Request 
 * @return Promise which is resolved or  rejected
 */
var _put = function (Url = '', Headers = {}, obj = {}) {

    var res = Url
        .replace(/(?:http:|https:)\/\//, "")
        .match(/[A-z0-9.]+(?=\/[a-z0-9])|\/(\S)*/g);

    var options = {
        hostname: res[0],
        port: 80,
        path: res[1],
        method: 'PUT',
        headers: Headers
    };
    return new Promise((resolve, reject) => {
        var req = http.request(options, function (res) {
            res.setEncoding('utf8');
            var ResCode = checkStatusXHTTPResponse(res.statusCode);
            res.on('data', function (body) {
                if (ResCode.responseCode == 0 || ResCode.responseCode == 1) {
                    resolve(ParseXHTTPJSONRequest(body, res.statusCode, ResCode.statusMsg));
                } else if (ResCode.responseCode == 2 || ResCode.responseCode == 3) {
                    reject(ParseXHTTPJSONRequest(body, res.statusCode, ResCode.statusMsg));
                }
            });
        });
        req.on('error', function (e) {
            reject('problem with request: ' + e.message);
        });
        req.write(JSON.stringify(obj));
        req.end();
    })
}

/**
 * @param {string ,  Object , Object  } Url, Headers, obj = null
 * PATCH Request 
 * @return Promise which is resolved or  rejected
 */
var _patch = function (Url = '', Headers = {}, obj = {}) {

    var res = Url
        .replace(/(?:http:|https:)\/\//, "")
        .match(/[A-z0-9.]+(?=\/[a-z0-9])|\/(\S)*/g);

    var options = {
        hostname: res[0],
        port: 80,
        path: res[1],
        method: 'PATCH',
        headers: Headers
    };
    return new Promise((resolve, reject) => {
        var req = http.request(options, function (res) {
            res.setEncoding('utf8');
            var ResCode = checkStatusXHTTPResponse(res.statusCode);
            res.on('data', function (body) {
                if (ResCode.responseCode == 0 || ResCode.responseCode == 1) {
                    resolve(ParseXHTTPJSONRequest(body, res.statusCode, ResCode.statusMsg));
                } else if (ResCode.responseCode == 2 || ResCode.responseCode == 3) {
                    reject(ParseXHTTPJSONRequest(body, res.statusCode, ResCode.statusMsg));
                }
            });
        });
        req.on('error', function (e) {
            reject('problem with request: ' + e.message);
        });
        req.write(JSON.stringify(obj));
        req.end();
    })
}

/**
 * @param {string ,  Headers , Object } Url, Headers
 * DELETE Request 
 * @return Promise which is resolved or  rejected
 */
var _delete = function (Url = '', Headers = {}, obj = {}) {
    var res = Url
        .replace(/(?:http:|https:)\/\//, "")
        .match(/[A-z0-9.]+(?=\/[a-z0-9])|\/(\S)*/g);

    var options = {
        hostname: res[0],
        port: 80,
        path: res[1],
        method: 'DELETE',
        headers: Headers
    };
    return new Promise((resolve, reject) => {
        var req = http.request(options, function (res) {
            res.setEncoding('utf8');
            var ResCode = checkStatusXHTTPResponse(res.statusCode);
            res.on('data', function (body) {
                if (ResCode.responseCode == 0 || ResCode.responseCode == 1) {
                    resolve(ParseXHTTPJSONRequest(body, res.statusCode, ResCode.statusMsg));
                } else if (ResCode.responseCode == 2 || ResCode.responseCode == 3) {
                    reject(ParseXHTTPJSONRequest(body, res.statusCode, ResCode.statusMsg));
                }
            });
        });
        req.on('error', function (e) {
            reject('problem with request: ' + e.message);
        });
        req.write(JSON.stringify(obj));
        req.end();
    })
}

module.exports = {
    Get: _get,
    Post: _post,
    Put: _put,
    Patch: _patch,
    Delete: _delete
}