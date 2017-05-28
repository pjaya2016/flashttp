"use strict";
let HTTPStatus = require('http-status');
/**
 * @param {int} status
 * @return {Object} this object contains statusMsg && responseCode 
 * e.g. { statusMsg: "Success", responseCode: 0 }
 */

let checkStatusXHTTPResponse = (status) => {
    /*
    responseCode  = 0 // codes that are bettween 200 - 299
    responseCode  = 1 // codes that are bettween 300 - 399
    responseCode  = 2 // codes that are bettween 400 - 499
    responseCode  = 2 // codes that are bettween 500 - 599
     */
    let result;
    switch (true) {
        case status === 200 || status < 300:
            result = { statusMsg: "Success -> " + HTTPStatus[status], responseCode: 0 }
            break;
        case status === 300 || status < 400:
            result = { statusMsg: " Redirection -> " + HTTPStatus[status], responseCode: 1 }
            break;
        case status === 400 || status < 500:
            result = { statusMsg: "Client errors -> " + HTTPStatus[status], responseCode: 2 }
            break;
        case status === 500 || status < 600:
            result = { statusMsg: "Server error -> " + HTTPStatus[status], responseCode: 3 }
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

var ParseXHTTPJSONRequest = (res, status, statusMessage, headers = {}) => {
    return {
        Response: res.length <= 0 ? "NO RESPONSE" : JSON.parse(res),
        Status: status,
        StatusMessage: statusMessage,
        Headers: headers
    }
}


let FormatHeader = (header) => {
    if (header.length <= 0) return {};
    header = header.replace(/;/g, "").match(/[^\n:]+/g);
    let str = "{";
    header.map((item, i) => {
        item = item.trim();
        if (i % 2 == 0) {
            str += '"' + item + '"' + ':'
        } else {
            str += '"' + item + '"'
            if (header.length != i + 1) {
                str += ','
            }
        }
    })
    str += "}";
    return JSON.parse(str.trim());
}


/**
 * @param {string ,  Object  } Url, Headers
 * GET Request or GET/ID 
 * @return Promise which is resolved or  rejected
 */

let _get = (Url = '', Headers = { "Content-Type": "application/json" }) => {
    return new Promise((resolve, reject) => {
        if (Url.trim() === '') {
            reject("Please provide a URL");
        }
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.HEADERS_RECEIVED && this.responseText.trim().length > 0) {
                let Headers = FormatHeader(this.getAllResponseHeaders());
                let ResCode = checkStatusXHTTPResponse(this.status);

                if (ResCode.responseCode == 0 || ResCode.responseCode == 1) {
                    resolve(ParseXHTTPJSONRequest(  this.responseText,
                                                    this.status      , 
                                                    ResCode.statusMsg, 
                                                    Headers
                                                  ));
                } else if (ResCode.responseCode == 2 || ResCode.responseCode == 3) {
                    reject(ParseXHTTPJSONRequest(   this.responseText,
                                                    this.status, 
                                                    ResCode.statusMsg, 
                                                    Headers
                                                 ));
                }
            }
        };

        xhttp.addEventListener("load", transferComplete);
        xhttp.addEventListener("error", transferFailed);
        xhttp.addEventListener("abort", transferCanceled);

        function transferComplete(evt) {
            resolve("The transfer is complete.");
        }

        function transferFailed(evt) {
            reject("An error occurred while transferring the file. Please make sure your url is correct");
        }

        function transferCanceled(evt) {
            reject("The transfer has been canceled by the user.");
        }

        xhttp.open("GET", Url, true);
        if (typeof Headers == 'object') {
            for (let key in Headers) {
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
let _post = (Url = '', Headers = { "Content-Type": "application/json" }, obj = null) => {
    return new Promise(
        (resolve, reject) => {

            if (Url.trim() === '') {
                reject("Please provide a URL");
            }

            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.HEADERS_RECEIVED && this.responseText.trim().length > 0) {
                    let Headers = FormatHeader(this.getAllResponseHeaders());
                    let ResCode = checkStatusXHTTPResponse(this.status);

                    if (ResCode.responseCode == 0 || ResCode.responseCode == 1) {
                        resolve(ParseXHTTPJSONRequest(  this.responseText, 
                                                        this.status, 
                                                        ResCode.statusMsg, 
                                                        Headers
                                                     ));
                    } else if (ResCode.responseCode == 2 || ResCode.responseCode == 3) {
                        reject(ParseXHTTPJSONRequest(   this.responseText, 
                                                        this.status, 
                                                        ResCode.statusMsg, 
                                                        Headers
                                                     ));
                    }
                }
            };

            xhttp.addEventListener("load", transferComplete);
            xhttp.addEventListener("error", transferFailed);
            xhttp.addEventListener("abort", transferCanceled);

            function transferComplete(evt) {
                resolve("The transfer is complete.");
            }

            function transferFailed(evt) {
                reject("An error occurred while transferring the file. Please make sure your url is correct");
            }

            function transferCanceled(evt) {
                reject("The transfer has been canceled by the user.");
            }

            xhttp.open("POST", Url, true);
            if (typeof Headers == 'object') {
                for (let key in Headers) {
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
let _put = (Url = '', Headers = { "Content-Type": "application/json" }, obj = null) => {
    return new Promise(
        (resolve, reject) => {
            if (Url.trim() === '') {
                reject("Please provide a URL");
            }

            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.HEADERS_RECEIVED && this.responseText.trim().length > 0) {
                    let Headers = FormatHeader(this.getAllResponseHeaders());
                    let ResCode = checkStatusXHTTPResponse(this.status);

                     if (ResCode.responseCode == 0 || ResCode.responseCode == 1) {
                        resolve(ParseXHTTPJSONRequest(  this.responseText, 
                                                        this.status, 
                                                        ResCode.statusMsg, 
                                                        Headers
                                                     ));
                    } else if (ResCode.responseCode == 2 || ResCode.responseCode == 3) {
                        reject(ParseXHTTPJSONRequest(   this.responseText, 
                                                        this.status, 
                                                        ResCode.statusMsg, 
                                                        Headers
                                                     ));
                    }
                }
            };

            xhttp.addEventListener("load", transferComplete);
            xhttp.addEventListener("error", transferFailed);
            xhttp.addEventListener("abort", transferCanceled);

            function transferComplete(evt) {
                resolve("The transfer is complete.");
            }

            function transferFailed(evt) {
                reject("An error occurred while transferring the file. Please make sure your url is correct");
            }

            function transferCanceled(evt) {
                reject("The transfer has been canceled by the user.");
            }

            xhttp.open("PUT", Url, true);
            if (typeof Headers == 'object') {
                for (let key in Headers) {
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
let _patch = (Url = '', Headers = { "Content-Type": "application/json" }, obj = null) => {
    return new Promise(
        (resolve, reject) => {
            if (Url.trim() === '') {
                reject("Please provide a URL");
            }
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.HEADERS_RECEIVED && this.responseText.trim().length > 0) {
                    let Headers = FormatHeader(this.getAllResponseHeaders());
                    let ResCode = checkStatusXHTTPResponse(this.status);

                    if (ResCode.responseCode == 0 || ResCode.responseCode == 1) {
                        resolve(ParseXHTTPJSONRequest(  this.responseText, 
                                                        this.status, 
                                                        ResCode.statusMsg, 
                                                        Headers
                                                     ));
                    } else if (ResCode.responseCode == 2 || ResCode.responseCode == 3) {
                        reject(ParseXHTTPJSONRequest(   this.responseText, 
                                                        this.status, 
                                                        ResCode.statusMsg, 
                                                        Headers
                                                     ));
                    }
                }
            };

            xhttp.addEventListener("load", transferComplete);
            xhttp.addEventListener("error", transferFailed);
            xhttp.addEventListener("abort", transferCanceled);

            function transferComplete(evt) {
                resolve("The transfer is complete.");
            }

            function transferFailed(evt) {
                reject("An error occurred while transferring the file. Please make sure your url is correct");
            }

            function transferCanceled(evt) {
                reject("The transfer has been canceled by the user.");
            }

            xhttp.open("PATCH", Url, true);
            if (typeof Headers == 'object') {
                for (let key in Headers) {
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
let _delete = (Url = '', Headers = { "Content-Type": "application/json" }) => {
    return new Promise(
        (resolve, reject) => {
            if (Url.trim() === '') {
                reject("Please provide a URL");
            }
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.HEADERS_RECEIVED && this.responseText.trim().length > 0) {
                    let Headers = FormatHeader(this.getAllResponseHeaders());
                    let ResCode = checkStatusXHTTPResponse(this.status);

                     if (ResCode.responseCode == 0 || ResCode.responseCode == 1) {
                        resolve(ParseXHTTPJSONRequest(  this.responseText, 
                                                        this.status, 
                                                        ResCode.statusMsg, 
                                                        Headers
                                                     ));
                    } else if (ResCode.responseCode == 2 || ResCode.responseCode == 3) {
                        reject(ParseXHTTPJSONRequest(   this.responseText, 
                                                        this.status, 
                                                        ResCode.statusMsg, 
                                                        Headers
                                                     ));
                    }
                }
            };

            xhttp.addEventListener("load", transferComplete);
            xhttp.addEventListener("error", transferFailed);
            xhttp.addEventListener("abort", transferCanceled);


            function transferComplete(evt) {
                resolve("The transfer is complete.");
            }

            function transferFailed(evt) {
                reject("An error occurred while transferring the file. Please make sure your url is correct");
            }

            function transferCanceled(evt) {
                reject("The transfer has been canceled by the user.");
            }
            xhttp.open("DELETE", Url, true);
            if (typeof Headers == 'object') {
                for (let key in Headers) {
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