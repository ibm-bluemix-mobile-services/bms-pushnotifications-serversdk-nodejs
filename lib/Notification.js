/**
 *  The Push notification to send. Includes the notification message, the targets to receive the message, and the APNS, GCM, ChromeWeb, FirefoxWeb, ChromeAppExtension and SafariWeb settings.
 */

/**
 * Set the notification alert
 * @param {String} alert 
 * 
 */
function Notification () {};

Notification.prototype.builder = function builder () {

    /**
     *  Encapsulates all data in the Notification.
     */
    this.json = {};

    /**
     * Sets the message json.
     * @param {Object} message object contains message attributes like alert and url for the notification.
     */
    this.message = function (message) {
        this.json.message = removeNullValues(message);
        return this;
    };

    /**
     * Sets the target json.
     * @param {Object} target target object contains target attributes like deviceId or platforms etc. for the notification.
     */
    this.target = function (target) {
        this.json.target = removeNullValues(target);
        return this;
    };

    /**
     * Sets the settings json.
     * @param {Object} settings object contains settings attributes like apns, gcm, firefox settings for the notification.
     */
    this.settings = function (settings) {
        this.json.settings = removeNullValues(settings);
        return this;
    };

    return this;
};

/**
 *  The supported platforms for receiving push notifications.
 *  This should be used for the platforms parameter in the [Notification.setTarget() method]{@link Notification#setTarget}.
 */
Notification.TargetPlatform = {
    Apple: "A",
    Google: "G",
    WebChrome: "WEB_CHROME",
    WebFirefox: "WEB_FIREFOX",
    WebSafari: "WEB_SAFARI",
    AppExtChrome: "APPEXT_CHROME"
};

/**
 *  Determines whether an alert is shown or the message is placed in the notification center.
 *  This should be used for the type parameter in the [Notification.setApnsSettings() method]{@link Notification#setApnsSettings}.
 */
Notification.ApnsType = {
    DEFAULT: "DEFAULT",
    MIXED: "MIXED",
    SILENT: "SILENT"
};


/**
 *  The available priorities of the notification message.
 *  This should be used for the priority parameter in the [Notification.setGcmSettings() method]{@link Notification#setGcmSettings}.
 */
Notification.GcmPriority = {
    DEFAULT: "DEFAULT",
    MIN: "MIN",
    LOW: "LOW",
    HIGH: "HIGH",
    MAX: "MAX"
};

/**
 * The available visibility of the notification message.
 * This should be used for the visibility parameter in the [Notification.setGcmSettings() method] {@link Notification#setGcmSettings}.
 * @type {{PUBLIC: string, PRIVATE: string, SECRET: string}}
 */
Notification.Visibility = {
    PUBLIC: "PUBLIC",
    PRIVATE: "PRIVATE",
    SECRET: "SECRET"
};

/**
 Determines the LED value in the notifications
 */
Notification.GcmLED = {

    BLACK: "BLACK",
    DARKGRAY: "DARKGRAY",
    GRAY: "GRAY",
    LIGHTGRAY: "LIGHTGRAY",
    WHITE: "WHITE",
    RED: "RED",
    GREEN: "GREEN",
    BLUE: "BLUE",
    YELLOW: "YELLOW",
    CYAN: "CYAN",
    MAGENTA: "MAGENTA",
    TRANSPARENT: "TRANSPARENT"


};

/**
 * The available style type of the gcm notification message.
 */
Notification.GcmStyleTypes = {

    BIGTEXT_NOTIFICATION: "BIGTEXT_NOTIFICATION",
    INBOX_NOTIFICATION: "INBOX_NOTIFICATION",
    PICTURE_NOTIFICATION: "PICTURE_NOTIFICATION"

};


// The Bluemix Push service cannot handle null values, so we need to remove them before sending.
var removeNullValues = function (json) {

    for (var key in json) {
        if (json.hasOwnProperty(key)) {
            if (json[key] === null) {
                delete json[key];
            }
        }
    }
    return json;
};



module.exports = {notification: Notification};
