
var request = require('request');


var PushNotifications = function(bluemixRegion, bluemixAppGuid, bluemixAppSecret) {

    var bluemixHost = 'imfpush.' + bluemixRegion;
    var resourceUri = 'https://' + bluemixHost + ':443' + '/imfpush/v1/apps/' + bluemixAppGuid + '/messages';
    var headers = {
        'appSecret': bluemixAppSecret,
        'Content-type': 'application/json'
    };

    this.send = function(notification, callback) {
        var options = {
            uri: resourceUri,
            method: 'POST',
            headers: headers,
            body: JSON.stringify(notification.json)
        };
        request(options, callback);
    };
};


PushNotifications.Region = {
    US_SOUTH: 'ng.bluemix.net',
    UK: 'eu-gb.bluemix.net',
    SYDNEY: 'au-syd.bluemix.net'
};


module.exports = {
    PushNotifications: PushNotifications,
    Notification: require("./Notification.js")
};
