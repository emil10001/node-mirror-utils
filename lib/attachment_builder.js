/**
 * Created by ejf3 on 10/18/14.
 */

/**
 * https://developers.google.com/glass/v1/reference/timeline/attachments
 * @constructor
 */
AttachmentBuilder = function () {
    var self = this;
    var attachment = {};

    /**
     * The ID of the attachment
     * @param id
     * @returns {AttachmentBuilder}
     */
    this.id = function (id) {
        attachment["id"] = id;
        return self;
    };

    /**
     * The MIME type of the attachment
     * @param contentType
     * @returns {AttachmentBuilder}
     */
    this.contentType = function (contentType) {
        attachment["contentType"] = contentType;
        return self;
    };

    /**
     * The URL for the content
     * @param contentUrl
     * @returns {AttachmentBuilder}
     */
    this.contentUrl = function (contentUrl) {
        attachment["contentUrl"] = contentUrl;
        return self;
    };

    /**
     * Indicates that the contentUrl is not available because the attachment
     * content is still being processed. If the caller wishes to retrieve the
     * content, it should try again later
     * @param isProcessingContent
     * @returns {AttachmentBuilder}
     */
    this.isProcessingContent = function (isProcessingContent) {
        attachment["isProcessingContent"] = !!(isProcessingContent);
        return self;
    };

    this.build = function(){
        return attachment;
    }

};

module.exports = AttachmentBuilder;
