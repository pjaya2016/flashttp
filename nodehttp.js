"use strict";
let http       = require('http')       ,
HTTPStatus     = require('http-status'),
/**-------------**
 * ERROR OBJECTS *
 **-------------**/
errors         = {
            EACCES          : "Permission denied"            ,
            EADDRINUSE      : "Address already in use"       ,
            ECONNREFUSED    : "Connection refused"           ,
            ECONNRESET      : "Connection reset by peer"     ,
            EEXIST          : "File exists"                  ,
            EISDIR          : "Is a directory"               ,
            EMFILE          : "Too many open files in system",
            ENOENT          : "No such file or directory"    ,
            ENOTDIR         : "Not a directory"              ,
            ENOTEMPTY       : "Directory not empty"          ,
            EPERM           : "Operation not permitted"      ,
            EPIPE           : "Broken pipe"                  ,
            ETIMEDOUT       : "Operation timed out"          ,
            ENOTFOUND       : "Client was not able to"  + 
                              "connect to the provided" +
                              "address.Please check if" + 
                              "address is correct"
        }

const ERROR = 'error', 
      END   = 'end'  , 
      DATA  = 'data' ;

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
            result = { statusMsg: "Success -> "       + HTTPStatus[status], responseCode: 0       }
            break;
        case status === 300 || status < 400:
            result = { statusMsg: " Redirection -> "  + HTTPStatus[status], responseCode: 1  }
            break;
        case status === 400 || status < 500:
            result = { statusMsg: "Client errors -> " + HTTPStatus[status], responseCode: 2 }
            break;
        case status === 500 || status < 600:
            result = { statusMsg: "Server error -> "  + HTTPStatus[status], responseCode: 3  }
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
let ParseXHTTPJSONRequest = (res, status, statusMessage, headers) => {
    return {
        Response     : JSON.parse(res),
        Status       : status         ,
        StatusMessage: statusMessage  ,
        Headers      : headers
    }
}

/**
 * @param {string ,  Object  } Url, Headers
 * GET Request or GET/ID 
 * @return Promise which is resolved or  rejected
 */
let _get = (Url, Headers = { "Content-Type" : "application/json" }) => {
    return new Promise((resolve, reject) => {
        let res = Url.replace(/(?:http:|https:)\/\//, "")
            .match(/[A-z0-9.]+(?=\/[a-z0-9])|\/(\S)*/g) ,

            options = {
            hostname : res[0],
            port     : 80    ,
            path     : res[1],
            method   : 'GET' ,
            headers  : Headers
        },
            req = http.request(options, (res) => {
            res.setEncoding('utf8');
            let ResCode = checkStatusXHTTPResponse(res.statusCode),
                Body    = '';

            res.on( DATA, (body) => {
                Body += body;
            });

            res.on( END, () => {
                if (ResCode.responseCode === 0 || ResCode.responseCode === 1) {
                    resolve(ParseXHTTPJSONRequest(  Body             , 
                                                    res.statusCode   , 
                                                    ResCode.statusMsg, 
                                                    res.headers
                                                  ));
                } else if (ResCode.responseCode === 2 || ResCode.responseCode === 3) {
                    reject(ParseXHTTPJSONRequest(   Body             , 
                                                    res.statusCode   , 
                                                    ResCode.statusMsg, 
                                                    res.headers
                                                 ));
                }
            });
        });

        req.on( ERROR, (e) => {
            reject("ERROR! Problem with request ->" 
            + e.code + " : " 
            + errors[e.code]);
        });

        req.end();
    });
}

/**
 * @param {string ,  Object , Object  } Url, Headers, obj = null
 * POST Request 
 * @return Promise which is resolved or  rejected
 */
let _post = (Url = '', Headers = { "Content-Type" : "application/json" }, obj = {}) => {
    return new Promise((resolve, reject) => {
        let res = Url
            .replace(/(?:http:|https:)\/\//, "")
            .match(/[A-z0-9.]+(?=\/[a-z0-9])|\/(\S)*/g),

            options  = {
            hostname : res[0],
            port     : 80,
            path     : res[1],
            method   : 'POST',
            headers  : Headers
        },

            req = http.request(options, (res) => {
            res.setEncoding('utf8');
            let ResCode = checkStatusXHTTPResponse(res.statusCode),
                Body    = '';

            res.on( DATA, (body) => {
                Body += body;
            });

            res.on( END, () => {
                if (ResCode.responseCode === 0 || ResCode.responseCode === 1) {
                    resolve(ParseXHTTPJSONRequest(  Body, 
                                                    res.statusCode, 
                                                    ResCode.statusMsg, 
                                                    res.headers
                                                  ));
                } else if (ResCode.responseCode === 2 || ResCode.responseCode === 3) {
                    reject(ParseXHTTPJSONRequest(   Body, 
                                                    res.statusCode, 
                                                    ResCode.statusMsg, 
                                                    res.headers
                                                 ));
                }
            });
        });

        req.on( ERROR, (e) => {
            reject("ERROR! Problem with request ->" 
                   + e.code 
                   + " : " 
                   + errors[e.code]);
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
let _put = (Url = '', Headers = { "Content-Type" : "application/json" }, obj = {}) => {
    return new Promise((resolve, reject) => {
        let res = Url
            .replace(/(?:http:|https:)\/\//, "")
            .match(/[A-z0-9.]+(?=\/[a-z0-9])|\/(\S)*/g),

            options = {
            hostname : res[0],
            port     : 80,
            path     : res[1],
            method   : 'PUT',
            headers  : Headers
        },
            req = http.request(options, (res) => {
            res.setEncoding('utf8');
            let ResCode = checkStatusXHTTPResponse(res.statusCode),
                Body    = '';

            res.on( DATA, (body) => {
                Body += body;
            });

            res.on( END, () => {
                if (ResCode.responseCode === 0 || ResCode.responseCode === 1) {
                    resolve(ParseXHTTPJSONRequest(  Body, 
                                                    res.statusCode,
                                                    ResCode.statusMsg, 
                                                    res.headers
                                                  ));
                } else if (ResCode.responseCode === 2 || ResCode.responseCode === 3) {
                    reject(ParseXHTTPJSONRequest(   Body, 
                                                    res.statusCode, 
                                                    ResCode.statusMsg, 
                                                    res.headers
                                                 ));
                }
            });
        });

        req.on( ERROR, (e) => {
            reject("ERROR! Problem with request ->" 
            + e.code + " : " 
            + errors[e.code]);
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
let _patch = (Url = '', Headers = { "Content-Type" : "application/json" }, obj = {}) => {
    return new Promise((resolve, reject) => {
        let res = Url
            .replace(/(?:http:|https:)\/\//, "")
            .match(/[A-z0-9.]+(?=\/[a-z0-9])|\/(\S)*/g),

           options = {
            hostname : res[0],
            port     : 80,
            path     : res[1],
            method   : 'PATCH',
            headers  : Headers
        },
            req = http.request(options, (res) => {
            res.setEncoding('utf8');
            let ResCode = checkStatusXHTTPResponse(res.statusCode),
                Body    = '';

            res.on( DATA, (body) => {
                Body += body;
            });

            res.on( END, () => {
                if (ResCode.responseCode === 0 || ResCode.responseCode === 1) {
                    resolve(ParseXHTTPJSONRequest(  Body, 
                                                    res.statusCode, 
                                                    ResCode.statusMsg, 
                                                    res.headers
                                                  ));
                } else if (ResCode.responseCode === 2 || ResCode.responseCode === 3) {
                    reject(ParseXHTTPJSONRequest(   Body, 
                                                    res.statusCode, 
                                                    ResCode.statusMsg, 
                                                    res.headers
                                                 ));
                }
            });
        });

        req.on( ERROR, (e) => {
            reject("ERROR! Problem with request ->" 
            + e.code + " : "
            + errors[e.code]);
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
let _delete = (Url = '', Headers = { "Content-Type" : "application/json" }, obj = {}) => {
    return new Promise((resolve, reject) => {
        let res = Url
            .replace(/(?:http:|https:)\/\//, "")
            .match(/[A-z0-9.]+(?=\/[a-z0-9])|\/(\S)*/g),

            options = {
            hostname : res[0],
            port     : 80,
            path     : res[1],
            method   : 'DELETE',
            headers  : Headers
        },
            req = http.request(options, (res) => {
            res.setEncoding('utf8');
            let ResCode = checkStatusXHTTPResponse(res.statusCode),
                Body    = '';

            res.on( DATA, (body) => {
                Body += body;
            });

            res.on( END, () => {
                if (ResCode.responseCode === 0 || ResCode.responseCode === 1) {
                    resolve(ParseXHTTPJSONRequest(  Body, 
                                                    res.statusCode, 
                                                    ResCode.statusMsg, 
                                                    res.headers              
                                                ));
                } else if (ResCode.responseCode === 2 || ResCode.responseCode === 3) {
                    reject(ParseXHTTPJSONRequest(   Body, 
                                                    res.statusCode, 
                                                    ResCode.statusMsg, 
                                                    res.headers
                                                 ));
                }
            });
        });

        req.on( ERROR, (e) => {
            reject("ERROR! Problem with request ->" 
            + e.code + " : " 
            + errors[e.code]);
        });

        req.write(JSON.stringify(obj));
        req.end();
    })
}

/**
 * Restful API Method being exported 
 */
module.exports = {
    Get   : _get  ,
    Post  : _post ,
    Put   : _put  ,
    Patch : _patch,
    Delete: _delete
}