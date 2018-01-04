# Passport-Tumblr

[Passport](http://passportjs.org/) strategy for authenticating with [Tumblr](https://www.tumblr.com/)
using the OAuth 1.0a API.

This module lets you authenticate using Tumblr in your Node.js applications.
By plugging into Passport, Tumblr authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-tumblr

## Usage

#### Configure Strategy

The Tumblr authentication strategy authenticates users using a Tumblr account
and OAuth tokens.  The strategy requires a `verify` callback, which accepts
these credentials and calls `done` providing a user, as well as `options`
specifying a consumer key, consumer secret, and callback URL.

    passport.use(new TumblrStrategy({
        consumerKey: TUMBLR_CONSUMER_KEY,
        consumerSecret: TUMBLR_SECRET_KEY,
        callbackURL: "http://127.0.0.1:3000/auth/tumblr/callback"
      },
      function(token, tokenSecret, profile, done) {
        User.findOrCreate({ tumblrId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'tumblr'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/tumblr',
      passport.authenticate('tumblr'));
    
    app.get('/auth/tumblr/callback', 
      passport.authenticate('tumblr', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Examples

For a complete, working example, refer to the [login example](https://github.com/jaredhanson/passport-tumblr/tree/master/examples/login).

## Tests

    $ npm install --dev
    $ make test

[![Build Status](https://secure.travis-ci.org/jaredhanson/passport-tumblr.png)](http://travis-ci.org/jaredhanson/passport-tumblr)

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>


