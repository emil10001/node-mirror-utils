var googleapis = require('googleapis')
    , OAuth2Client = googleapis.OAuth2Client;


AuthUtils = function () {
    var client;

    // Use environment variables to configure oauth client.
    // That way, you never need to ship these values, or worry
    // about accidentally committing them
    var oauth2Client = new OAuth2Client(
        process.env.MIRROR_CLIENT_ID
        , process.env.MIRROR_CLIENT_SECRET
        , process.env.MIRROR_REDIRECT_URL);

    this.getToken = function (errorCallback, successCallback) {
        if (null == client) {
            errorCallback("no client");
            return;
        }

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

};

module.exports = AuthUtils;