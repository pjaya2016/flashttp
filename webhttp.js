"use strict";
/**
 * @param {int} status
 * @return {Object} this object contains statusMsg && responseCode 
 * e.g. { statusMsg: "Success", responseCode: 0 }
 */

var checkStatusXHTTPResponse = function(status){
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

var ParseXHTTPJSONRequest = function(res, status, statusMessage){
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

var _get = function(Url = '', Headers = {}) {
    return new Promise(function(resolve, reject){
        if (Url.trim() === '') {
            reject("Please provide a URL");
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                var ResCode = checkStatusXHTTPResponse(this.status);
                if (ResCode.responseCode == 0 || ResCode.responseCode == 1) {
                    resolve(ParseXHTTPJSONRequest(this.responseText, this.status, ResCode.statusMsg));
                } else if (ResCode.responseCode == 2 || ResCode.responseCode == 3) {
                    reject(ParseXHTTPJSONRequest(this.responseText, this.status, ResCode.statusMsg));
                }
            }
        };
        xhttp.open("GET", Url, true);
        if (typeof Headers == 'object') {
            for (var key in Headers) {
                if (Headers.hasOwnProperty(key)) {
                    xhttp.setRequestHeader(key, Headers[key]);
                }
            }
        } else {
            reject("Please Provide an Header object with a format e.g. { 'Content-Type' : 'application/x-www-form-urlencoded' }");
        }
        xhttp.send();
    });
}

/**
 * @param {string ,  Object , Object  } Url, Headers, obj = null
 * POST Request 
 * @return Promise which is resolved or  rejected
 */
var _post = (Url = '', Headers = {}, obj = null) => {
    return new Promise(
        (resolve, reject) => {

            if (Url.trim() === '') {
                reject("Please provide a URL");
            }

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    var ResCode = checkStatusXHTTPResponse(this.status);
                    if (ResCode.responseCode == 0 || ResCode.responseCode == 1) {
                        resolve(ParseXHTTPJSONRequest(this.responseText, this.status, ResCode.statusMsg));
                    } else if (ResCode.responseCode == 2 || ResCode.responseCode == 3) {
                        reject(ParseXHTTPJSONRequest(this.responseText, this.status, ResCode.statusMsg));
                    }
                }
            };
            xhttp.open("POST", Url, true);
            if (typeof Headers == 'object') {
                for (var key in Headers) {
                    if (Headers.hasOwnProperty(key)) {
                        xhttp.setRequestHeader(key, Headers[key]);
                    }
                }
            } else {
                reject("Please Provide an Header object with a format e.g. { 'Content-Type' : 'application/x-www-form-urlencoded' }");
            }
            (obj !== null) ? xhttp.send(JSON.stringify(obj)) : xhttp.send(JSON.stringify({}));
        }
    );
}

/**
 * @param {string ,  Object , Object  } Url, Headers, obj = null
 * PUT Request 
 * @return Promise which is resolved or  rejected
 */
var _put = (Url = '', Headers = {}, obj = null) => {
    return new Promise(
        (resolve, reject) => {
            if (Url.trim() === '') {
                reject("Please provide a URL");
            }

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    var ResCode = checkStatusXHTTPResponse(this.status);
                    if (ResCode.responseCode == 0 || ResCode.responseCode == 1) {
                        resolve(ParseXHTTPJSONRequest(this.responseText, this.status, ResCode.statusMsg));
                    } else if (ResCode.responseCode == 2 || ResCode.responseCode == 3) {
                        reject(ParseXHTTPJSONRequest(this.responseText, this.status, ResCode.statusMsg));
                    }
                }
            };
            xhttp.open("PUT", Url, true);
            if (typeof Headers == 'object') {
                for (var key in Headers) {
                    if (Headers.hasOwnProperty(key)) {
                        xhttp.setRequestHeader(key, Headers[key]);
                    }
                }
            } else {
                reject("Please Provide an Header object with a format e.g. { 'Content-Type' : 'application/x-www-form-urlencoded' }");
            }
            (obj !== null) ? xhttp.send(JSON.stringify(obj)) : xhttp.send(JSON.stringify({}));
        }
    );
}

/**
 * @param {string ,  Object , Object  } Url, Headers, obj = null
 * PATCH Request 
 * @return Promise which is resolved or  rejected
 */
var _patch = (Url = '', Headers = {}, obj = null) => {
    return new Promise(
        (resolve, reject) => {
            if (Url.trim() === '') {
                reject("Please provide a URL");
            }
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    var ResCode = checkStatusXHTTPResponse(this.status);
                    if (ResCode.responseCode == 0 || ResCode.responseCode == 1) {
                        resolve(ParseXHTTPJSONRequest(this.responseText, this.status, ResCode.statusMsg));
                    } else if (ResCode.responseCode == 2 || ResCode.responseCode == 3) {
                        reject(ParseXHTTPJSONRequest(this.responseText, this.status, ResCode.statusMsg));
                    }
                }
            };

            xhttp.open("PATCH", Url, true);
            if (typeof Headers == 'object') {
                for (var key in Headers) {
                    if (Headers.hasOwnProperty(key)) {
                        xhttp.setRequestHeader(key, Headers[key]);
                    }
                }
            } else {
                reject("Please Provide an Header object with a format e.g. { 'Content-Type' : 'application/x-www-form-urlencoded' }");
            }
            (obj !== null) ? xhttp.send(JSON.stringify(obj)) : xhttp.send(JSON.stringify({}));
        }
    );
}

/**
 * @param {string ,  Object } Url, Headers
 * DELETE Request 
 * @return Promise which is resolved or  rejected
 */
var _delete = (Url = '', Headers = {}) => {
    return new Promise(
        (resolve, reject) => {
            if (Url.trim() === '') {
                reject("Please provide a URL");
            }
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    var ResCode = checkStatusXHTTPResponse(this.status);
                    if (ResCode.responseCode == 0 || ResCode.responseCode == 1) {
                        resolve(ParseXHTTPJSONRequest(this.responseText, this.status, ResCode.statusMsg));
                    } else if (ResCode.responseCode == 2 || ResCode.responseCode == 3) {
                        reject(ParseXHTTPJSONRequest(this.responseText, this.status, ResCode.statusMsg));
                    }
                }
            };
            xhttp.open("DELETE", Url, true);
            if (typeof Headers == 'object') {
                for (var key in Headers) {
                    if (Headers.hasOwnProperty(key)) {
                        xhttp.setRequestHeader(key, Headers[key]);
                    }
                }
            } else {
                reject("Please Provide an Header object with a format e.g. { 'Content-Type' : 'application/x-www-form-urlencoded' }");
            }
            xhttp.send();
        }
    );
}

/**
 * Restful API Method being exported 
 */
module.exports = {
    Get: _get,
    Put: _put,
    Patch: _patch,
    Post: _post,
    Delete: _delete
}