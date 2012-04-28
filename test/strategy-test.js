var vows = require('vows');
var assert = require('assert');
var util = require('util');
var TumblrStrategy = require('passport-tumblr/strategy');


vows.describe('TumblrStrategy').addBatch({
  
  'strategy': {
    topic: function() {
      return new TumblrStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
    },
    
    'should be named tumblr': function (strategy) {
      assert.equal(strategy.name, 'tumblr');
    },
  },
  
  'strategy when loading user profile': {
    topic: function() {
      var strategy = new TumblrStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
      
      // mock
      strategy._oauth.get = function(url, token, tokenSecret, callback) {
        var body = '{ \
           "meta": { \
              "status": 200, \
              "msg": "OK" \
           }, \
           "response": { \
             "user": { \
               "following": 263, \
               "default_post_format": "html", \
               "name": "derekg", \
               "likes": 606, \
               "blogs": [ \
                  { \
                   "name": "derekg", \
                   "title": "Derek Gottfrid", \
                   "url": "http://derekg.org/", \
                   "tweet": "auto", \
                   "primary": true, \
                   "followers": 33004929 \
                  }, \
                  { \
                   "name": "ihatehipstrz", \
                   "title": "I Hate Hipstrz" \
                  } \
                ] \
             } \
          } \
        }';
        
        callback(null, body, undefined);
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('token', 'token-secret', {}, done);
        });
      },
      
      'should not error' : function(err, req) {
        assert.isNull(err);
      },
      'should load profile' : function(err, profile) {
        assert.equal(profile.provider, 'tumblr');
        assert.equal(profile.username, 'derekg');
      },
      'should set raw property' : function(err, profile) {
        assert.isString(profile._raw);
      },
      'should set json property' : function(err, profile) {
        assert.isObject(profile._json);
      },
    },
  },
  
  'strategy when loading user profile and encountering an error': {
    topic: function() {
      var strategy = new TumblrStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
      
      // mock
      strategy._oauth.get = function(url, token, tokenSecret, callback) {
        callback(new Error('something went wrong'));
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('token', 'token-secret', {}, done);
        });
      },
      
      'should error' : function(err, req) {
        assert.isNotNull(err);
      },
      'should wrap error in InternalOAuthError' : function(err, req) {
        assert.equal(err.constructor.name, 'InternalOAuthError');
      },
      'should not load profile' : function(err, profile) {
        assert.isUndefined(profile);
      },
    },
  },

}).export(module);
