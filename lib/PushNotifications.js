
var request = require('request');


/**
 *  Used to send Push notifications via a Bluemix Push Notifications service.
 * 
 *  @param {string} bluemixRegion     The Bluemix region where the Push Notifications service is hosted.
 *  @param {string} bluemixAppGuid    The app GUID for the Bluemix application that the Push Notifications service is bound to.
 *  @param {string} bluemixAppSecret  The appSecret credential required for Push Notifications service authorization.
 */
var PushNotifications = function(bluemixRegion, bluemixAppGuid, bluemixAppSecret) {

    var bluemixHost = 'imfpush.' + bluemixRegion;
    var resourceUri = 'https://' + bluemixHost + ':443' + '/imfpush/v1/apps/' + bluemixAppGuid + '/messages';
    var headers = {
        'appSecret': bluemixAppSecret,
        'Content-type': 'application/json'
    };

    /**
     *  Send the Push notification.
     * 
     *  @param {Notification} notificiation  The push notification to send.
     *  @param {function} callback           The callback to be executed when the send request completes.
     */
    this.send = function(notification, callback) {
        var options = {
            uri: resourceUri,
            method: 'POST',
            headers: headers,
            body: JSON.stringify(notification.json)
        };
        // Sends a POST request to this REST API: https://mobile.ng.bluemix.net/imfpushrestapidocs/#!/messages/post_apps_applicationId_messages
        request(options, callback);
    };
};


/**
 *  The Bluemix region where the Push Notifications service is hosted.
 *  This should be used for the bluemixRegion parameter in the [PushNotifications.send() method]{@link PushNotifications#send}.
 */
PushNotifications.Region = {
    US_SOUTH: 'ng.bluemix.net',
    UK: 'eu-gb.bluemix.net',
    SYDNEY: 'au-syd.bluemix.net'
};


module.exports = {
    PushNotifications: PushNotifications,
    Notification: require('./Notification.js')
};
