var webhttp = require('./webhttp');
var nodehttp = require('./nodehttp');
var isNode = require('detect-node');
console.log(isNode)

if (isNode) {
  module.exports = nodehttp;
 
} else {
  
  module.exports = webhttp;
}


