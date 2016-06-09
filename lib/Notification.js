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
 *  The Push notification to send. Includes the notification message, the targets to receive the message, and the APNS and GCM settings.
 */
var Notification = function(alert) {

    /**
     *  Encapsulates all data in the Notification.
     */
    this.json = {
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
    this.setUrl = function(url) {
        if (url !== null) {
            this.json.message.url = url;
        }
    };

    /**
     *  Specify the recipients of the notification.
     * 
     *  @param {string[]} deviceIds  The list of devices that will receive the notification.
     *  @param {string[]} platforms  The platforms that will receive the notification (iOS or Android).
     *  @param {string[]} tagNames   Devices subscribed to these tags will receive the notification.
     */
    this.setTarget = function(deviceIds, platforms, tagNames) {
        var targetJson = {
            'deviceIds': deviceIds,
            'platforms': platforms,
            'tagNames': tagNames
        };
        this.json.target = removeNullValues(targetJson);
    };

    /**
     *  Specify settings specific to the iOS platform.
     * 
     *  @param {number} badge         The number to display as the badge of the application icon.
     *  @param {string} category      The category identifier to be used for intereactive push notifications.
     *  @param {string} iosActionKey  The title for the Action key.
     *  @param {string} sound         The name of the sound file in the application bunlde. The sound of this file is played as an alert.
     *  @param {string} type          Determines whether an alert is shown or the message is placed in the notification center.
     *  @param {Object} payload       Custom JSON payload that will be sent as part of the notification message.
     */
    this.setApnsSettings = function(badge, category, iosActionKey, sound, type, payload) {
        var apnsJson = {
            'badge': badge,
            'category': category,
            'iosActionKey': iosActionKey,
            'sound': sound,
            'type': type,
            'payload': payload
        };
        this.json.settings.apns = removeNullValues(apnsJson);
    };

    /**
     *  Specify settings specific to the Android platform.
     * 
     *  @param {string} collapseKey      Identifies a group of messages.
     *  @param {boolean} delayWhileIdle  Indicates whether the message should not be sent until the device becomes active.
     *  @param {string} payload          Custom JSON payload that will be sent as part of the notification message.
     *  @param {string} priority         The priority of the message.
     *  @param {string} sound            The sound file (on device) that will be attempted to play when the notification arrives on the device.
     *  @param {number} timeToLive       Specifies how long (in seconds) the message should be kept in GCM storage if the device is offline.
     */
    this.setGcmSettings = function(collapseKey, delayWhileIdle, payload, priority, sound, timeToLive) {
        var delay = delayWhileIdle ? 'true' : 'false';
        var gcmJson = {
            'collapseKey': collapseKey,
            'delayWhileIdle': delay,
            'payload': payload,
            'priority': priority,
            'sound': sound,
            'timeToLive': timeToLive
        };
        this.json.settings.gcm = removeNullValues(gcmJson);
    };
};


/**
 *  The supported platforms for receiving push notifications.
 *  This should be used for the platforms parameter in the [Notification.setTarget() method]{@link Notification#setTarget}. 
 */
Notification.TargetPlatform = {
    Apple: "A",
    Google: "G"
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


// The Bluemix Push service cannot handle null values, so we need to remove them before sending.
var removeNullValues = function(json) {

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
