var webhttp = require('./webhttp');
var nodehttp = require('./nodehttp');
var isNode = require('detect-node');

/**
* @param {boolean} isNode
* checks if the module is run on node or the browser
*/
if (isNode) {
  module.exports = nodehttp;
} else {
  module.exports = webhttp;
}


