/**
 * Created by ejf3 on 3/18/14.
 */

MenuUtils = function () {
    var self = this;
    var menus = [];

    var READ_ALOUD = "READ_ALOUD"
        , REPLY = "REPLY"
        , REPLY_ALL = "REPLY_ALL"
        , DELETE = "DELETE"
        , SHARE = "SHARE"
        , VOICE_CALL = "VOICE_CALL"
        , NAVIGATE = "NAVIGATE"
        , TOGGLE_PINNED = "TOGGLE_PINNED"
        , OPEN_URI = "OPEN_URI"
        , PLAY_VIDEO = "PLAY_VIDEO";

    this.build = function () {
        return menus;
    };

    this.hasContent = function () {
        return (menus.length > 0);
    };

    this.buildSimpleDefault = function () {
        menus = [
            {"action": "REPLY"},
            {"action": "DELETE"}
        ];
        return self;
    };

    /**
     * READ_ALOUD - Read the timeline item's speakableText aloud; if this field is
     * not set, read the text field; if none of those fields are set, this menu item
     * is ignored.
     *
     * @param payload - the text to read aloud
     */
    this.readAloud = function (payload) {
        menus.push({ "action": READ_ALOUD, "payload": payload });
        return self;
    };

    /**
     * REPLY - Initiate a reply to the timeline item using the voice recording UI.
     * The creator attribute must be set in the timeline item for this menu to be
     * available.
     */
    this.reply = function () {
        menus.push({ "action": REPLY });
        return self;
    };

    /**
     * REPLY_ALL - Same behavior as REPLY. The original timeline item's recipients
     * will be added to the reply item.
     */
    this.replyAll = function () {
        menus.push({ "action": REPLY_ALL });
        return self;
    };

    /**
     * DELETE - Delete the timeline item.
     */
    this.delete = function () {
        menus.push({ "action": DELETE });
        return self;
    };

    /**
     * SHARE - Share the timeline item with the available contacts.
     */
    this.share = function () {
        menus.push({ "action": SHARE });
        return self;
    };

    /**
     * VOICE_CALL - Initiate a phone call using the timeline item's creator.phone_number
     * attribute as recipient.
     */
    this.voiceCall = function () {
        menus.push({ "action": VOICE_CALL });
        return self;
    };

    /**
     * NAVIGATE - Navigate to the timeline item's location.
     */
    this.navigate = function () {
        menus.push({ "action": NAVIGATE });
        return self;
    };

    /**
     * TOGGLE_PINNED - Toggle the isPinned state of the timeline item.
     */
    this.togglePinned = function () {
        menus.push({ "action": TOGGLE_PINNED });
        return self;
    };

    /**
     * OPEN_URI - Open the payload of the menu item in the browser.
     *
     * @param payload - URI to open
     */
    this.openUri = function (payload) {
        menus.push({ "action": OPEN_URI, "payload": payload });
        return self;
    };

    /**
     * PLAY_VIDEO - Open the payload of the menu item in the Glass video player.
     *
     * @param payload - address of the video
     */
    this.playVideo = function (payload) {
        menus.push({ "action": PLAY_VIDEO, "payload": payload });
        return self;
    };

};

module.exports = MenuUtils;