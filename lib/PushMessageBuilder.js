var APNsObj = require("./APNs.js");
var FCMObj = require("./FCM.js");
var ChromeAppExtObj = require("./ChromeAppExt.js");
var ChromeWebObj = require("./ChromeWeb.js");
var FirefoxWebObj = require("./FirefoxWeb.js");
var SafariWebObj = require("./SafariWeb.js");
var FCMLightsObj = require("./FCMLights.js");
var FCMStyleObj = require("./FCMStyle.js");
var SettingsObj = require("./Settings.js");
var TargetObj = require("./Target.js");
var MessageObj = require("./Message.js");

/**
 * Builder to build PushMessage Object for Notification.
 */
var PushMessageBuilder = {

    APNs: APNsObj,
    FCM: FCMObj,
    ChromeAppExt: ChromeAppExtObj,
    ChromeWeb: ChromeWebObj,
    FirefoxWeb: FirefoxWebObj,
    SafariWeb: SafariWebObj,
    FCMLights: FCMLightsObj,
    FCMStyle: FCMStyleObj,
    Target: TargetObj,
    Settings: SettingsObj,
    Message: MessageObj
};

module.exports = PushMessageBuilder;