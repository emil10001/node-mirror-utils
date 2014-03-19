/**
 * Created by ejf3 on 3/18/14.
 */

CardUtils = function () {
    var self = this;
    var card = {};

    var NOTIFICATION = "Notification"
        , DEFAULT = "DEFAULT";

    this.buildLocation = function (lat, lng, name, address) {
        return {
            "kind": "mirror#location",
            "latitude": lat,
            "longitude": lng,
            "displayName": name,
            "address": address
        };
    };

    this.reset = function () {
        card = {};
        return self;
    };

    this.id = function (id) {
        card["id"] = id;
        return self;
    };

    this.title = function (title) {
        card["title"] = title;
        return self;
    };

    this.text = function (text) {
        card["speakableText"] = text;
        card["text"] = text;
        return self;
    };

    this.html = function (htmlText) {
        card["html"] = htmlText;
        return self;
    };

    this.callback = function (text, menuItems, callbackUrl) {
        card["callbackUrl"] = callbackUrl;
        return self;
    };

    this.menus = function (menuItems) {
        card["menuItems"] = menuItems;
        return self;
    };

    this.location = function (card, loc) {
        card["location"] = loc;
        return self;
    };

    this.nofification = function () {
        card["speakableType"] = NOTIFICATION;
        card["notification"] = {
            "level": DEFAULT
        };
        return self;
    };

};

module.exports = CardUtils;