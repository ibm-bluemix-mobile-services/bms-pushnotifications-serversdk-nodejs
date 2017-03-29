/*
 *     Copyright 2016 IBM Corp.
 *     Licensed under the Apache License, Version 2.0 (the "License");
 *     you may not use this file except in compliance with the License.
 *     You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *     See the License for the specific language governing permissions and
 *     limitations under the License.
 */


/**
 *  The Push notification to send. Includes the notification message, the targets to receive the message, and the APNS, GCM, ChromeWeb, FirefoxWeb, ChromeAppExtension and SafariWeb settings.
 */
var Notification = function (alert) {

    /**
     *  Encapsulates all data in the Notification.
     */
    this.json =
        {
            'message': {
                'alert': alert
            },
            'target': {},
            'settings': {}
        };

    /**
     *  Set the notification url.
     *
     *  @param {string} url  An optional url to be sent along with the alert.
     */
    this.setUrl = function (url) {

        if (url !== null) {
            this.json.message.url = url;
        }
    };

    /**
     *  Specify the recipients of the notification.
     *
     *  @param {string[]} deviceIds  The list of devices that will receive the notification.
     *  @param {string[]} userIds  The list of users that will receive the notification on their registered devices.
     *  @param {string[]} platforms  The platforms that will receive the notification (iOS or Android).
     *  @param {string[]} tagNames   Devices subscribed to these tags will receive the notification.
     */
    this.setTarget = function (deviceIds, userIds, platforms, tagNames) {
        var targetJson = {
            'deviceIds': deviceIds,
            'userIds': userIds,
            'platforms': platforms,
            'tagNames': tagNames
        };
        this.json.target = removeNullValues(targetJson);
    };

    /**
     * Specify settings specific to the iOS platform.
     *
     * @param {number} badge            The number to display as the badge of the application icon.
     * @param {string} category         The category identifier to be used for interactive push notifications.
     * @param {string} iosActionKey     The title for the Action key.
     * @param {string} sound            The name of the sound file in the application bundle. The sound of this file is played as an alert.
     * @param {string} type             Determines whether an alert is shown or the message is placed in the notification center.
     * @param {Object} payload          Custom JSON payload that will be sent as part of the notification message.
     * @param {string} titleLocKey      The key to a title string in the Localizable.strings file for the current localization. The key string can be formatted with %@ and %n$@ specifiers to take the variables specified in the title-loc-args array.
     * @param {string} locKey           A key to an alert-message string in a Localizable.strings file for the current localization (which is set by the user’s language preference). The key string can be formatted with %@ and %n$@ specifiers to take the variables specified in the loc-args array.
     * @param {string} launchImage      The filename of an image file in the app bundle, with or without the filename extension. The image is used as the launch image when users tap the action button or move the action slider.
     * @param {string []} titleLocArgs  Variable string values to appear in place of the format specifiers in title-loc-key.
     * @param {string []} locArgs       Variable string values to appear in place of the format specifiers in loc-key.
     * @param {string} subtitle         The subtitle of the Rich Notifications. (Supported only on iOS 10 and above).
     * @param {string} title            The title of Rich Push notifications (Supported only on iOS 10 and above).
     * @param {string} attachmentUrl    The link to the iOS notifications media (video, audio, GIF, images - Supported only on iOS 10 and above)
     */
    this.setApnsSettings = function (badge, category, iosActionKey, sound, type, payload, titleLocKey, locKey, launchImage, titleLocArgs, locArgs, subtitle, title, attachmentUrl) {

        var apnsJson = {
            'badge': badge,
            'category': category,
            'iosActionKey': iosActionKey,
            'sound': sound,
            'type': type,
            'payload': payload,
            'titleLocKey': titleLocKey,
            'locKey': locKey,
            'launchImage': launchImage,
            'titleLocArgs': titleLocArgs,
            'locArgs': locArgs,
            'subtitle': subtitle,
            'title': title,
            'attachmentUrl': attachmentUrl
        };
        this.json.settings.apns = removeNullValues(apnsJson);
    };

    /**
     * Specify settings specific to the Android platform.
     *
     * @param {string} collapseKey      Identifies a group of messages.
     * @param {boolean} delayWhileIdle  Indicates whether the message should not be sent until the device becomes active.
     * @param {Object} payload          Custom JSON payload that will be sent as part of the notification message.
     * @param {string} priority         The priority of the message.
     * @param {string} sound            The sound file (on device) that will be attempted to play when the notification arrives on the device.
     * @param {number} timeToLive       Specifies how long (in seconds) the message should be kept in GCM storage if the device is offline.
     * @param {string} icon              Specify the name of the icon to be displayed for the notification. Make sure the icon is already packaged with the client application.
     * @param {boolean} sync            Device group messaging makes it possible for every app instance in a group to reflect the latest messaging state.
     * @param {string} visibility       private/public/secret - Visibility of this notification, which affects how and when the notifications are revealed on a secure locked screen.
     * @param {Object} style            Options to specify for Android expandable notifications. The types of expandable notifications are picture_notification,bigtext_notification, inbox_notification; the JSONObject can have the following keys : @type {{type: string, url: string, title: string, text: string, lines: string [] }}
     */
    this.setGcmSettings = function (collapseKey, delayWhileIdle, payload, priority, sound, timeToLive, icon, sync, visibility, style) {
        var delay = delayWhileIdle ? 'true' : 'false';

        var gcmJson = {
            'collapseKey': collapseKey,
            'delayWhileIdle': delay,
            'payload': payload,
            'priority': priority,
            'sound': sound,
            'timeToLive': timeToLive,
            'icon': icon,
            'sync': sync,
            'visibility': visibility,
            'style': style
        };
        this.json.settings.gcm = removeNullValues(gcmJson);
    };

    /**
     *  Specify settings specific to the SafariWeb browser.
     *
     * @param {string} title       Specifies the title to be set for the Safari Push Notifications.
     * @param {string []} urlArgs  The URL arguments that need to be used with this notification.
     * @param {string} action      The label of the action button.
     */
    this.setSafariWebSettings = function (title, urlArgs, action) {

        var safariJson = {
            'title': title,
            'urlArgs': urlArgs,
            'action': action
        };
        this.json.settings.safariWeb = removeNullValues(safariJson);
    };

    /**
     *  Specify settings specific to the FirefoxWeb browser.
     *
     * @param {string} title        Specifies the title to be set for the WebPush Notification.
     * @param {string} iconUrl      The URL of the icon to be set for the WebPush Notification.
     * @param {number} timeToLive  This parameter specifies how long (in seconds) the message should be kept in GCM storage if the device is offline.
     * @param {Object} payload      Custom JSON payload that will be sent as part of the notification message.
     */
    this.setFirefoxWebSettings = function (title, iconUrl, timeToLive, payload) {

        var firefoxJson = {
            'title': title,
            'iconUrl': iconUrl,
            'timeToLive': timeToLive,
            'payload': payload,
        };

        this.json.settings.firefoxWeb = removeNullValues(firefoxJson);
    };

    /**
     * Specify settings specific to the ChromeAppExtension browser.
     *
     * @param {String}  collapseKey This parameter identifies a group of messages
     * @param {boolean} delayWhileIdle       When this parameter is set to true, it indicates that the message should not be sent until the device becomes active.
     * @param {String}  title                Specifies the title to be set for the WebPush Notification.
     * @param {String}  iconUrl              The URL of the icon to be set for the WebPush Notification.
     * @param {number}  timeToLive           This parameter specifies how long (in seconds) the message should be kept in GCM storage if the device is offline.
     * @param {Object}  payload              JSON payload that will be sent as part of the notification message.
     */
    this.setChromeAppExtSettings = function (collapseKey, delayWhileIdle, title, iconUrl, timeToLive, payload) {

        var delay = delayWhileIdle ? 'true' : 'false';

        var chromeAppExtJson = {
            'collapseKey': collapseKey,
            'delayWhileIdle': delay,
            'title': title,
            'iconUrl': iconUrl,
            'timeToLive': timeToLive,
            'payload': payload
        };
        this.json.settings.chromeAppExt = removeNullValues(chromeAppExtJson);
    };

    /**
     * Specify settings specific to the ChromeWeb browser.
     *
     * @param {string} title       Specifies the title to be set for the WebPush Notification.
     * @param {string} iconUrl     The URL of the icon to be set for the WebPush Notification.
     * @param {number} timeToLive  This parameter specifies how long (in seconds) the message should be kept in GCM storage if the device is offline.
     * @param {Object} payload     Custom JSON payload that will be sent as part of the notification message.
     */
    this.setChromeSettings = function (title, iconUrl, timeToLive, payload) {

        var chormeJson = {
            'title': title,
            'iconUrl': iconUrl,
            'timeToLive': timeToLive,
            'payload': payload
        };
        this.json.settings.chromeWeb = removeNullValues(chormeJson);
    };
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
    AppextChrome: "APPEXT_CHROME"
};


/**
 *  Determines whether an alert is shown or the message is placed in the notification center.
 *  This should be used for the type parameter in the [Notification.setApnsSettings() method]{@link Notification#setApnsSettings}.
 */
Notification.ApnsType = {
    DEFAULT: "DEFAULT",
    MIXED: "MIXED",
    SILENT: "SILENT"
}


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
}

/**
 * The available visibility of the notification message.
 * This should be used for the visibility parameter in the [Notification.setGcmSettings() method] {@link Notification#setGcmSettings}.
 * @type {{PUBLIC: string, PRIVATE: string, SECRET: string}}
 */
Notification.Visibility = {
    PUBLIC: "PUBLIC",
    PRIVATE: "PRIVATE",
    SECRET: "SECRET"
}


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


module.exports = Notification;
