/**
 * Created by ejf3 on 3/18/14.
 */

ContactUtils = function () {
    var acceptCommands = []
        , acceptTypes = [];

    var self = this;

    var REPLY = "REPLY"
        , POST_AN_UPDATE = "POST_AN_UPDATE"
        , TAKE_A_NOTE = "TAKE_A_NOTE"
        , PNG_IMAGE = "image/png"
        , JPG_IMAGE = "image/jpeg"
        , GIF_IMAGE = "image/gif"
        , TEXT = "text/plain";

    this.resetAcceptCommands = function () {
        acceptCommands = [];
        return self;
    };

    this.resetAcceptTypes = function () {
        acceptTypes = [];
        return self;
    };

    this.acceptReply = function () {
        acceptCommands.push({"type": REPLY});
        return self;
    };

    this.acceptPostAnUpdate = function () {
        acceptCommands.push({"type": POST_AN_UPDATE});
        return self;
    };
    this.acceptTakeANote = function () {
        acceptCommands.push({"type": TAKE_A_NOTE});
        return self;
    };

    this.typeImages = function () {
        acceptTypes.push(PNG_IMAGE);
        acceptTypes.push(JPG_IMAGE);
        acceptTypes.push(GIF_IMAGE);
        return self;
    };

    this.typeText = function () {
        acceptTypes.push(TEXT);
        return self;
    };

    this.buildContact = function (id, name, icon) {
        return {
            resource: {"id": id,
                "displayName": name,
                "iconUrl": icon,
                "priority": 7,
                "acceptCommands": acceptCommands,
                "acceptTypes": acceptTypes
            }
        };
    };
};

module.exports = ContactUtils;