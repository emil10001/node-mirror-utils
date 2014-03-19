/**
 * Created by ejf3 on 3/18/14.
 */

TimelineUtils = function (oauth2Client, client) {

    /**
     * send a timeline card
     *
     * @param card
     * @param errorCallback
     * @param successCallback
     */
    this.insertCard = function (card, errorCallback, successCallback) {
        if (null == client){
            errorCallback("no client");
            return;
        }

        client
            .mirror.timeline.insert(card)
            .withAuthClient(oauth2Client)
            .execute(function (err, data) {
                if (!!err)
                    errorCallback(err);
                else
                    successCallback(data);
            });
    };

    /**
     * insert a contact into the timeline
     *
     * @param contact
     * @param errorCallback
     * @param successCallback
     */
    this.insertContact = function (contact, errorCallback, successCallback) {
        if (null == client){
            errorCallback("no client");
            return;
        }

        client
            .mirror.contacts.insert(contact)
            .withAuthClient(oauth2Client)
            .execute(function (err, data) {
                if (!!err)
                    errorCallback(err);
                else
                    successCallback(data);
            });
    };

    /**
     * get the user's timeline
     *
     * @param errorCallback
     * @param successCallback
     */
    this.listTimeline = function (errorCallback, successCallback) {
        if (null == client){
            errorCallback("no client");
            return;
        }

        client
            .mirror.timeline.list()
            .withAuthClient(oauth2Client)
            .execute(function (err, data) {
                if (!!err)
                    errorCallback(err);
                else
                    successCallback(data);
            });
    };
};

module.exports = TimelineUtils;