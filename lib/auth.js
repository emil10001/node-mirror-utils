var googleapis = require('googleapis')
    , OAuth2Client = googleapis.OAuth2Client;


AuthUtils = function () {
    var client;
    var self = this;

    // Use environment variables to configure oauth client.
    // That way, you never need to ship these values, or worry
    // about accidentally committing them
    var oauth2Client = new OAuth2Client(
        process.env.MIRROR_CLIENT_ID
        , process.env.MIRROR_CLIENT_SECRET
        , process.env.MIRROR_REDIRECT_URL);

    this.getToken = function (code, errorCallback, successCallback) {

        oauth2Client.getToken(code, function (err, tokens) {
            if (!!err) {
                errorCallback(err);
            } else {
                // for some reason, I don't seem to be getting refresher tokens back
                // https://developers.google.com/accounts/docs/OAuth2WebServer#refresh
                console.log('tokens', tokens);

                oauth2Client.credentials = tokens;
                googleapis
                    .discover('mirror', 'v1')
                    .discover('plus', 'v1')
                    .execute(function (err, mirrorClient) {
                        if (!!err) {
                            errorCallback(err);
                            return;
                        }
                        client = mirrorClient;
                        console.log('client', client);

                        // we want some way of tracking logged in users, this is a way to do that
                        // https://developers.google.com/+/api/oauth#profile
                        client.plus.people.get({ userId: 'me'})
                            .withAuthClient(oauth2Client)
                            .execute(function(err, profile) {
                                if (err) {
                                    console.log('An error occurred', err);
                                } else {
                                    console.log(profile.id, ':', profile.displayName);
                                }
                                successCallback(oauth2Client, client, profile);
                            });

                    });
            }
        });
    };

    this.install = function(req,res){
        if (!oauth2Client.credentials){
            // generates a url that allows offline access and asks permissions
            // for Mirror API scope.
            var url = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: 'https://www.googleapis.com/auth/glass.timeline https://www.googleapis.com/auth/glass.location https://www.googleapis.com/auth/plus.login'
            });
            res.redirect(url);
        } else {
            // TODO - replace this with something more useful
            res.redirect('/');
        }
        res.end();

    };

    this.getClient = function(){
        return client;
    }

    /**
     * further reading on auth:
     *
     * https://developers.google.com/api-client-library/javascript/features/authentication
     * https://github.com/google/google-api-nodejs-client/tree/master/apis/oauth2
     * http://dannysu.com/2014/01/16/google-api-service-account/
     * https://github.com/google/google-api-nodejs-client/blob/master/examples/oauth2.js
     *
     */

};

module.exports = AuthUtils;