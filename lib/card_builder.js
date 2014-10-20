/**
 * Created by ejf3 on 3/18/14.
 */

/**
 * Cards are referred to in the documentation as TimelineItems
 *
 * @constructor
 */
CardBuilder = function () {
    var self = this;
    var card = {};

    var NOTIFICATION = "Notification"
        , DEFAULT = "DEFAULT";


    /**
     * Set the id of the card
     * @param id
     * @returns {CardBuilder}
     */
    this.id = function (id) {
        card["id"] = id;
        return self;
    };

    /**
     * Set a bundleId, useful if you are building a bundle of cards
     * @param bundleId
     * @returns {CardBuilder}
     */
    this.bundleId = function (bundleId) {
        card["bundleId"] = bundleId;
        return self;
    };

    /**
     * Is this the cover for a bundle?
     * @param isBundleCover - true or false
     * @returns {CardBuilder}
     */
    this.isBundleCover = function (isBundleCover) {
        card["isBundleCover"] = !!(isBundleCover);
        return self;
    };

    /**
     * Set the title of the card
     * @param title
     * @returns {CardBuilder}
     */
    this.title = function (title) {
        card["title"] = title;
        return self;
    };

    /**
     * Set the plaintext to be displayed on the card
     * @param text
     * @returns {CardBuilder}
     */
    this.text = function (text) {
        card["speakableText"] = text;
        card["text"] = text;
        return self;
    };

    /**
     * HTML content for this item. If both text and html
     * are provided for an item, the html will be rendered
     * in the timeline.
     * @param htmlText
     * @returns {CardBuilder}
     */
    this.html = function (htmlText) {
        card["html"] = htmlText;
        return self;
    };

    /**
     * The geographic location associated with this item.
     * @param lat latitude
     * @param lng longitude
     * @param name the name of the location
     * @param address address to display
     * @returns {CardBuilder}
     */
    this.buildLocation = function (lat, lng, name, address) {
        card["kind"] = "mirror#location";
        card["latitude"] = lat;
        card["longitude"] = lng;
        card["displayName"] = name;
        card["address"] = address;
        return self;
    };

    /**
     * A list of menu items that will be presented to the user when this item is selected in the timeline.
     * @param menuItems list of menuItems, build this using the MenuBuilder
     * @returns {CardBuilder}
     */
    this.menus = function (menuItems) {
        card["menuItems"] = menuItems;
        return self;
    };

    /**
     *
     * @param canonicalUrl
     * @returns {CardBuilder}
     */
    this.canonicalUrl = function (canonicalUrl) {
        card["canonicalUrl"] = canonicalUrl;
        return self;
    };

    this.addAttachment = function (attachment) {
        if (!!!card.attachments)
            card.attachments = [];

        card.attachments.push(attachment);
        return self;
    };

    this.creator = function (creator) {
        card["creator"] = creator;
        return self;
    };

    this.displayTime = function (displayTime) {
        card["displayTime"] = displayTime;
        return self;
    };

    this.recipients = function (recipients) {
        // list
        // A list of users or groups that this item has been shared with.
        card["recipients"] = recipients;
        return self;
    };

    this.sourceItemId = function (sourceItemId) {
        card["sourceItemId"] = sourceItemId;
        return self;
    };

    this.speakableText = function (speakableText) {
        card["speakableText"] = speakableText;
        return self;
    };

    this.speakableType = function (speakableType) {
        card["speakableType"] = speakableType;
        return self;
    };

    this.custom = function (customName, customValue) {
        card[customName] = customValue;
        return self;
    };

    this.location = function (loc) {
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


    /**
     * Build and return the card
     * @returns {card}
     */
    this.build = function(){
        if (!!!(card.id))
            console.log("WARN - card should provide an 'id' field");

        return card;
    }

};

module.exports = CardBuilder;
