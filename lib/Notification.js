/*
 *     Copyright 2017 IBM Corp.
 *     Licensed under the Apache License, Version 2.0 (the "License");
 *     you may not use this file except in compliance with the License.
 *     You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *     See the License for the specific language governing permissions and
 *     limitations under the License.
 */

/**
 *  The Push notification to send. Includes the notification message, the targets to receive the message, 
 *  and the APNs, FCM, ChromeWeb, FirefoxWeb, ChromeAppExtension and SafariWeb settings.
 */

var Notification = {

    /**
     *  Encapsulates all data in the Notification.
     */
    json: {},

    /**
     * Sets the message json.
     * @param {Object} message Object contains message attributes like alert and url for the notification.
     * @return The Builder object for calls to be linked. 
     */
    message(message) {
        this.json.message = removeNullValues(message);
        return this;
    },

    /**
     * Sets the target json.
     * @param {Object} target target object contains target attributes like deviceId or platforms etc. for the notification.
     * @return The Builder object for calls to be linked. 
     */
    target(target) {
        this.json.target = removeNullValues(target);
        return this;
    },

    /**
     * Sets the settings json.
     * @param {Object} settings object contains settings attributes like APNs, FCM, firefox settings for the notification.
     * @return The Builder object for calls to be linked. 
     */
    settings(settings) {
        this.json.settings = removeNullValues(settings);
        return this;
    },
    /**
     * Return notitication. Thi really not required to be called.
     * Its just to be consistent with other builders.
     */
    build() {
        return Notification;
    }
}



/**
 *  The supported platforms for receiving push notifications.
 *  
 */
Notification.Platform = {
    Apple: "A",
    Google: "G",
    WebChrome: "WEB_CHROME",
    WebFirefox: "WEB_FIREFOX",
    WebSafari: "WEB_SAFARI",
    AppExtChrome: "APPEXT_CHROME"
};

/**
 *  Determines whether an alert is shown or the message is placed in the notification center.
 *  
 */
Notification.APNsType = {
    DEFAULT: "DEFAULT",
    MIXED: "MIXED",
    SILENT: "SILENT"
};


/**
 *  The available priorities of the notification message.
 *  
 */
Notification.FCMPriority = {
    DEFAULT: "DEFAULT",
    MIN: "MIN",
    LOW: "LOW",
    HIGH: "HIGH",
    MAX: "MAX"
};

/**
 * The available visibility of the notification message.
 * @type {{PUBLIC: string, PRIVATE: string, SECRET: string}}
 */
Notification.Visibility = {
    PUBLIC: "PUBLIC",
    PRIVATE: "PRIVATE",
    SECRET: "SECRET"
};

/**
 Determines the LED value in the notifications.
 */
Notification.FCMLED = {

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
 * The available style type of the FCM notification message.
 */
Notification.FCMStyleTypes = {

    BIGTEXT_NOTIFICATION: "BIGTEXT_NOTIFICATION",
    INBOX_NOTIFICATION: "INBOX_NOTIFICATION",
    PICTURE_NOTIFICATION: "PICTURE_NOTIFICATION"

};


// The IBM Cloud Push service cannot handle null values, so we need to remove them before sending.
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

module.exports = Notification;
