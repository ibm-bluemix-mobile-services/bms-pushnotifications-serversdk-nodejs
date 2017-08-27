var ApnsObj = require("./Apns.js");
var GcmObj = require("./Gcm.js");
var ChromeAppExtObj = require("./ChromeAppExt.js");
var ChromeWebObj = require("./ChromeWeb.js");
var FirefoxWebObj = require("./FirefoxWeb.js");
var SafariWebObj = require("./SafariWeb.js");
var GcmLightsObj = require("./GcmLights.js");
var GcmStyleObj = require("./GcmStyle.js");
var SettingsObj = require("./Settings.js");
var TargetObj = require("./Target.js");
var MessageObj = require("./Message.js");

/**
 * Builder to build PushMessage Object for Notification.
 */
var PushMessageBuilder = {

    Apns: ApnsObj,
    Gcm: GcmObj,
    ChromeAppExt: ChromeAppExtObj,
    ChromeWeb: ChromeWebObj,
    FirefoxWeb: FirefoxWebObj,
    SafariWeb: SafariWebObj,
    GcmLights: GcmLightsObj,
    GcmStyle: GcmStyleObj,
    Target: TargetObj,
    Settings: SettingsObj,
    Message: MessageObj
};

module.exports = PushMessageBuilder;