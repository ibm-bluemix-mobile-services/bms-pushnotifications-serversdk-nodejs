/*
 *     Copyright 2016 IBM Corp.
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


var request = require("request");
var cfenv = require("cfenv");

/**
 *  Used to send Push notifications via a IBM Cloud Push Notifications service.
 * 
 *  @param {string} bluemixRegion     The IBM Cloud region where the Push Notifications service is hosted.
 *  @param {string} tenantId          The tenant ID for the IBM Cloud application that the Push Notifications service is bound to.
 *  @param {string} secret            The credential required for Push Notifications service authorization.
 */
var PushNotifications = function (bluemixRegion, tenantId, secret) {

    var bluemixHost = null;

    // If user did not supply tenantId or secret, try to retrieve them from Cloud Foundry VCAP
    var cfEnvironment = cfenv.getAppEnv();
    if (tenantId === null) {
        tenantId = (((cfEnvironment.services.imfpush || {})[0] || {}).credentials || {}).appGuid;
    }
    if (secret === null) {
        // Make sure an IMFPush service exists. If there are multiple services, only use the first one.
        secret = (((cfEnvironment.services.imfpush || {})[0] || {}).credentials || {}).appSecret;
    }

    // Initialize HTTP request
    if (PushNotifications.overrideServerHost != null) {
        bluemixHost = PushNotifications.overrideServerHost;
    } else {
        bluemixHost = "https://imfpush" + bluemixRegion;
    }
    var resourceUri = bluemixHost + "/imfpush/v1/apps/" + tenantId + "/messages";
    var headers = {
        "appSecret": secret,
        "Content-type": "application/json"
    };

    /**
     *  Send the Push notification.
     * 
     *  @param {Notification} notificiation  The push notification to send.
     *  @param {function} callback           The callback to be executed when the send request completes.
     */
    this.send = function (notification, callback) {
        var options = {
            uri: resourceUri,
            method: "POST",
            headers: headers,
            body: JSON.stringify(notification.json || {})
        };
        // Sends a POST request to this REST API: https://mobile.ng.bluemix.net/imfpushrestapidocs/#!/messages/post_apps_applicationId_messages
        request(options, callback);
    };
};

/**
 * Overrides default server host with the provided host.
 * It {@code overrideServerHost} can be used for dedicated 
 * service and overrides default host with dedicated service host.
 *  
 */

PushNotifications.overrideServerHost = null;

/**
 *  The IBM Cloud region where the Push Notifications service is hosted.
 *  This should be used for the bluemixRegion parameter in the [PushNotifications.send() method]{@link PushNotifications#send}.
 */
PushNotifications.Region = {
    US_SOUTH: ".ng.bluemix.net",
    UK: ".eu-gb.bluemix.net",
    SYDNEY: ".au-syd.bluemix.net",
    FRANKFURT: ".eu-de.bluemix.net",
    US_EAST: ".us-east.bluemix.net"
};


module.exports = {
    PushNotifications: PushNotifications,
    Notification: require("./Notification.js"),
    PushMessageBuilder: require("./PushMessageBuilder.js")
};
