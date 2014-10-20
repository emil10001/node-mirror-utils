NodeJS Mirror API Utils
==========================


## About

This library uses environment variables to configure oauth client. That way, you never need to ship
these values, or worry about accidentally committing them to version control. If you're using AWS,
Elastic Beanstalk lets you define environment variables easily, There might be an easy way for EC2
also. If you're doing local development, you can dd the following to your `~/.bashrc` file:

    export MIRROR_CLIENT_ID="<your client id>"
    export MIRROR_CLIENT_SECRET="<your client secret>"
    export MIRROR_REDIRECT_URL="http://localhost:8080/oauth2callback"

This library requires two APIs to be enabled in the Google Developers Console:

* Google Mirror API
* Google+ API

The Google+ API is used to get an id for the user to allow you to easily track them throughout your 
application.

## Usage

Check out the [quick start](https://github.com/emil10001/mirror-quickstart-nodejs) for a full, working example of how to get started. 

More documentation to come.

This is a work in progress.
