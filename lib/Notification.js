
var Notification = function(alert) {

    this.json = {
        "message": {
            "alert": alert
        },
        "target": {},
        "settings": {}
    };

    this.setUrl = function(url) {
        if (url !== null) {
            this.json.message.url = url;
        }
    };

    this.setTarget = function(deviceIds, platforms, tagNames, userIds) {
        var targetJson = {
            "deviceIds": deviceIds,
            "platforms": platforms,
            "tagNames": tagNames,
            "userIds": userIds
        };
        this.json.target = removeNullValues(targetJson);
    };

    this.setApnsSettings = function(badge, category, iosActionKey, sound, type, payload) {
        var apnsJson = {
            "badge": badge,
            "category": category,
            "iosActionKey": iosActionKey,
            "sound": sound,
            "type": type,
            "payload": payload
        };
        this.json.settings.apns = removeNullValues(apnsJson);
    };

    this.setGcmSettings = function(collapseKey, delayWhileIdle, payload, priority, sound, timeToLive) {
        var gcmJson = {
            "collapseKey": collapseKey,
            "delayWhileIdle": delayWhileIdle,
            "payload": payload,
            "priority": priority,
            "sound": sound,
            "timeToLive": timeToLive
        };
        this.json.settings.gcm = removeNullValues(gcmJson);
    };
};


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
