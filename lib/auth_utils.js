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
                console.log('tokens', tokens);
                oauth2Client.credentials = tokens;
                googleapis
                    .discover('mirror', 'v1')
                    .execute(function (err, mirrorClient) {
                        if (!!err) {
                            errorCallback(err);
                            return;
                        }
                        client = mirrorClient;
                        console.log('mirror client', client);
                        successCallback(oauth2Client, client);
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
                scope: 'https://www.googleapis.com/auth/glass.timeline https://www.googleapis.com/auth/plus.profile.emails.read'
            });
            res.redirect(url);
        } else {
            self.getToken();
        }
        res.end();

    };

    this.getClient = function(){
        return client;
    }

};

module.exports = AuthUtils;