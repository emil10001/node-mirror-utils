NodeJS Mirror API Utils
==========================

## WARNING

This library does not provide a stable API. It is in development and is very subject to change.

## About

This library uses environment variables to configure oauth client. That way, you never need to ship
these values, or worry about accidentally committing them to version control. If you're using AWS,
Elastic Beanstalk lets you define environment variables easily, There might be an easy way for EC2
also. If you're doing local development, you can dd the following to your `~/.bashrc` file:

    export MIRROR_CLIENT_ID="<your client id>"
    export MIRROR_CLIENT_SECRET="<your client secret>"
    export MIRROR_REDIRECT_URL="http://localhost:8080/oauth2callback"

## Usage

This is a helper utility library for the Google Glass Mirror API. Here is how to a complete example,
which requires express:

    var express = require('express'),
        app = express(),
        http = require('http'),
        mirror = require('mirror-utils'),
        authUtils = new mirror.Auth(),
        cardUtils = new mirror.Card(),
        contactUtils = new mirror.Contacts(),
        menuUtils = new mirror.Menu();

    app.set('port', 8080);

    function failure (data) {
        console.log('falure',data);
    }
    function success (data) {
        console.log('success',data);
    }

    app.get('/', function(req, res){
        console.log('redirecting to install');
        res.end("profit?");
    });
    app.get('/install', authUtils.install);
    app.get('/oauth2callback', function(req, res){
        // if we're able to grab the token, redirect the user back to the main page
        authUtils.getToken(req.query.code, function(data) {
            console.log('failure',data);
            res.end();
        }, function(oauth2Client, client) {
            console.log('success',oauth2Client, client);
            var timelineUtils = new mirror.Timeline(oauth2Client, client);
            var menu = menuUtils.buildSimpleDefault().build();
            var card = cardUtils.reset().id(123).title("test").text("hello").menus(menu).build();
            console.log('try to insert card',card);
            timelineUtils.insertCard(card, failure, success);
            res.redirect('/');
            res.end();
        });
    });


    http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
        console.log('MIRROR_CLIENT_ID', process.env.MIRROR_CLIENT_ID);
        console.log('MIRROR_CLIENT_SECRET', process.env.MIRROR_CLIENT_SECRET);
        console.log('MIRROR_REDIRECT_URL', process.env.MIRROR_REDIRECT_URL);
    });

More documentation to come.

This is a work in progress.
