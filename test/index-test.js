var vows = require('vows');
var assert = require('assert');
var util = require('util');
var tumblr = require('passport-tumblr');


vows.describe('passport-tumblr').addBatch({
  
  'module': {
    'should report a version': function (x) {
      assert.isString(tumblr.version);
    },
  },
  
}).export(module);
