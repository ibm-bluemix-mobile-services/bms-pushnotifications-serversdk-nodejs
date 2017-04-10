/**
 *  The Push notification to send. Includes the notification message, the targets to receive the message, and the APNS, GCM, ChromeWeb, FirefoxWeb, ChromeAppExtension and SafariWeb settings.
 */
var deprecate = require('deprecate');

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
     *  @deprecated Since version 1.1,use setTarget(target) instead.
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
     * Configure specific to Target.
     *
     * Accepts an argument of type {@link Target} function which has the
     * following members below:
     *
     * deviceIds(string[]):   an optional array of device
     * ids specified as strings that the push notification will be sent to
     * userIds(string[]):   an optional array of user ids
     * specified as strings for whose devices the push notification will be sent
     * to
     * platforms(string[]):   an optional array of
     * {@link TargetPlatform} enums used to specify which platforms
     * to send to
     * tagNames(string[]):   an optional string array with
     * the list of tags that will receive the notification
     * snippet for usage of this method:
     *
     * Below is the code snippet for usage of this method:
     *
     *
     * var PushNotifications = require('bluemix-push-notifications').PushNotifications;
     * var Notification = require('bluemix-push-notifications').Notification;
     * var Model = PushNotifications.PushMessageModel;
     * var myPushNotifications = new PushNotifications(PushNotifications.Region.US_SOUTH, "your-bluemix-app-guid", "your-push-service-appSecret");
     * var notificationExample = new Notification("Testing BluemixPushNotifications");
     * notificationExample.setUrl("www.example.com");
     * notificationExample.setTarget(new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.Target)).deviceIds(["device1", "device2"]).userIds(["user1", "user2"]).
     * platforms([Notification.TargetPlatform.Apple, Notification.TargetPlatform.Google, Notification.TargetPlatform.WebChrome, Notification.TargetPlatform.WebFirefox
     * , Notification.TargetPlatform.WebSafari, Notification.TargetPlatform.AppExtChrome]).tagNames(["tag1", "tag2"]));// you can either set deviceIds or userIds or platforms or tagNames.
     * myPushNotifications.send(notificationExample, function (error, response, body) {
     * console.log("Error: " + error);
     * console.log("Response: " + JSON.stringify(response));
     * console.log("Body: " + body);});
     * @param {Object} target  The target object with either deviceIds or useIds or platforms or tagNames.
     */
    this.setTargetValues = function (target) {

        this.json.target = removeNullValues(target);
    };
    /**
     * Specify settings specific to the iOS platform.
     *
     * @param {number} badge               The number to display as the badge of the application icon.
     * @param {string} interactiveCategory The category identifier to be used for interactive push notifications.
     * @param {string} iosActionKey        The title for the Action key.
     * @param {string} sound               The name of the sound file in the application bundle. The sound of this file is played as an alert.
     * @param {string} type                Determines whether an alert is shown or the message is placed in the notification center.
     * @param {Object} payload             Custom JSON payload that will be sent as part of the notification message.
     *@deprecated Since version 1.1,use setApnsSettings(apns) instead.
     */

    this.setApnsSettings = function (badge, interactiveCategory, iosActionKey, sound, type, payload) {
        var apnsJson = {
            'badge': badge,
            'interactiveCategory': interactiveCategory,
            'iosActionKey': iosActionKey,
            'sound': sound,
            'type': type,
            'payload': payload

        };
        this.json.settings.apns = removeNullValues(apnsJson);
    };

    /**
     * Configure specific to Apns.
     *
     * Accepts an argument of type {@link Apns} function which has the
     * following members below:
     *
     * title: Specifies the title to be set for the
     * SafariWeb Push Notifications.
     *
     * badge (number): The number to display as the badge
     * of the application icon ,
     * interactiveCategory (string): The category identifier to
     * be used for the interactive push notifications ,
     * iosActionKey (string): The title for the Action key
     * ,
     * payload (object): Custom JSON payload that will be
     * sent as part of the notification message. ,
     * sound (string): The name of the sound file in the
     * application bundle. The sound of this file is played as an alert. ,
     * titleLocKey (string): The key to a title string in
     * the Localizable.strings file for the current localization. The key string
     * can be formatted with %@ and %n$@ specifiers to take the variables
     * specified in the titleLocArgs array. ,
     * locKey (string): A key to an alert-message string in
     * a Localizable.strings file for the current localization (which is set by
     * the user’s language preference). The key string can be formatted with %@
     * and %n$@ specifiers to take the variables specified in the locArgs array.
     * ,
     * launchImage (string): The filename of an image file
     * in the app bundle, with or without the filename extension. The image is
     * used as the launch image when users tap the action button or move the
     * action slider. ,
     * titleLocArgs (string[]): Variable string values
     * to appear in place of the format specifiers in title-loc-key. ,
     * locArgs (string[]): Variable string values to
     * appear in place of the format specifiers in locKey. ,
     * title (string): The title of Rich Push notifications
     * (Supported only on iOS 10 and above) ,
     * subtitle (string): The subtitle of the Rich
     * Notifications. (Supported only on iOS 10 and above) ,
     * attachmentUrl (string): The link to the iOS
     * notifications media (video, audio, GIF, images - Supported only on iOS 10
     * and above) ,
     * type (string) = ['DEFAULT', 'MIXED', 'SILENT'] Below is the code
     * snippet for usage of this method:<br>

     *
     * Below is the code snippet for usage of this method:
     *
     *
     * var PushNotifications = require('bluemix-push-notifications').PushNotifications;
     * var Notification = require('bluemix-push-notifications').Notification;
     * var Model = PushNotifications.PushMessageModel;
     * var myPushNotifications = new PushNotifications(PushNotifications.Region.US_SOUTH, "your-bluemix-app-guid", "your-push-service-appSecret");
     * var notificationExample = new Notification("Testing BluemixPushNotifications");
     * notificationExample.setUrl("www.example.com");
     * notificationExample.setTarget(new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.Target)).platforms([Notification.TargetPlatform.Apple]));
     * notificationExample.setApnsSettings(
     * new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.Apns)).badge(1).interactiveCategory("interactiveCategory").iosActionKey("iosActionKey").sound("sound.mp3").
     * type(Notification.ApnsType.DEFAULT).payload({ key: "value" }).titleLocKey("titleLocKey").locKey("locKey").launchImage("launchImage")
     * titleLocArgs(["titleLocArgs1", "titleLocArgs2"]).locArgs(["locArgs1", "locArgs2"]).subtitle("subtitle").title("title").attachmentUrl("attachmentUrl"));
     * myPushNotifications.send(notificationExample, function (error, response, body) {
     * console.log("Error: " + error);
     * console.log("Response: " + JSON.stringify(response));
     * console.log("Body: " + body);
     * @param {Object} apns The apns object with apns optional settings.
     */
    this.setApnsSettingsValues = function (apns) {

        this.json.settings.apns = removeNullValues(apns);
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
     * @deprecated Since version 1.1,use setGcmSettings(gcm) instead.
     */

    this.setGcmSettings = function (collapseKey, delayWhileIdle, payload, priority, sound, timeToLive) {
        var delay = delayWhileIdle ? 'true' : 'false';

        var gcmJson = {
            'collapseKey': collapseKey,
            'delayWhileIdle': delay,
            'payload': payload,
            'priority': priority,
            'sound': sound,
            'timeToLive': timeToLive,

        };
        this.json.settings.gcm = removeNullValues(gcmJson);
    };


    /**
     * Configure specific to Gcm.
     *
     * Accepts an argument of type {@link Gcm} function which has the
     * following members below:
     *
     * collapseKey (string):  This parameter identifies a
     * group of messages ,
     * interactiveCategory (string):  The category
     * identifier to be used for the interactive push notifications ,
     * icon (string):  Specify the name of the icon to be
     * displayed for the notification. Make sure the icon is already packaged
     * with the client application. ,
     * delayWhileIdle (boolean):  When this parameter is set
     * to true, it indicates that the message should not be sent until the
     * device becomes active. ,
     * sync (boolean):  Device group messaging makes it
     * possible for every app instance in a group to reflect the latest
     * messaging state ,
     * visibility (string):  private/public - Visibility of
     * this notification, which affects how and when the notifications are
     * revealed on a secure locked screen. ,
     * payload (object):  Custom JSON payload that will be
     * sent as part of the notification message. ,
     * priority (string):  A string value that indicates the
     * priority of this notification. Allowed values are 'max', 'high',
     * 'default', 'low' and 'min'. High/Max priority notifications along with
     * 'sound' field may be used for Heads up notification in Android 5.0 or
     * higher.sampleval='low' ,
     * sound (string):  The sound file (on device) that will
     * be attempted to play when the notification arrives on the device ,
     * timeToLive (number):  This parameter specifies how
     * long (in seconds) the message should be kept in GCM storage if the device
     * is offline. ,
     * lights (lights):  Allows setting the notification LED
     * color on receiving push notification . This should be in JSON and should
     * have following keys {{@code} {@liknk GcmLED} ledArgb; number ledOnMs; number
     * ledOffMs;}
     * style (style):  Options to specify for Android
     * expandable notifications. The types of expandable notifications are
     * picture_notification, bigtext_notification, inbox_notification.This
     * should be in JSON and should have following keys {{@code} {@link GcmStyleTypes}  type;
     * string url; string title; string text; string [] lines;} Below is the
     * code snippet for usage of this method:<br>
     *
     * sent as part of the notification message.
     *
     * Below is the code snippet for usage of this method:
     *
     *
     * var PushNotifications = require('bluemix-push-notifications').PushNotifications;
     * var Notification = require('bluemix-push-notifications').Notification;
     * var Model = PushNotifications.PushMessageModel;
     * var myPushNotifications = new PushNotifications(PushNotifications.Region.US_SOUTH, "your-bluemix-app-guid", "your-push-service-appSecret");
     * var notificationExample = new Notification("Testing BluemixPushNotifications");
     * notificationExample.setUrl("www.example.com");
     * notificationExample.setTarget(new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.Target)).platforms([Notification.TargetPlatform.Google]));
     * notificationExample.setGcmSettings(
     * new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.Gcm)).collapseKey("collapseKey").delayWhileIdle(true).payload({ key: "value" })
     * .priority(Notification.GcmPriority.DEFAULT).sound("sound.mp3").timeToLive(1.0).icon("icon").sync(true).visibility(Notification.Visibility.PUBLIC).style({ type: "type" }).lights({ ledArgb: "ledArgb" }));
     * myPushNotifications.send(notificationExample, function (error, response, body) {
     * console.log("Error: " + error);
     * console.log("Response: " + JSON.stringify(response));
     * console.log("Body: " + body);
     * @param {Object} gcm The gcm object with gcm optional settings.
     */

    this.setGcmSettingsValues = function (gcm) {

        this.json.settings.gcm = removeNullValues(gcm);
    };

    /**
     * Configure specific to SafariWeb.
     *
     * Accepts an argument of type {@link SafariWeb} function which has the
     * following members below:
     *
     * title (string): Specifies the title to be set for
     * the SafariWeb Push Notifications.
     *
     * urlArgs (string []): The URL arguments that need to
     * be used with this notification. This has to provided in the form of a
     * JSON Array.
     *
     * action (string): The label of the action
     * button.
     *
     * sent as part of the notification message.
     *
     * Below is the code snippet for usage of this method:
     *
     *
     * var PushNotifications = require('bluemix-push-notifications').PushNotifications;
     * var Notification = require('bluemix-push-notifications').Notification;
     * var Model = PushNotifications.PushMessageModel;
     * var myPushNotifications = new PushNotifications(PushNotifications.Region.US_SOUTH, "your-bluemix-app-guid", "your-push-service-appSecret");
     * var notificationExample = new Notification("Testing BluemixPushNotifications");
     * notificationExample.setUrl("www.example.com");
     * notificationExample.setTarget(new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.Target)).platforms([Notification.TargetPlatform.WebSafari]));
     * notificationExample.setSafariWebSettings(new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.SafariWeb)).title("title").urlArgs(["urlArgs1"]).action("action"));
     * myPushNotifications.send(notificationExample, function (error, response, body) {
     * console.log("Error: " + error);
     * console.log("Response: " + JSON.stringify(response));
     * console.log("Body: " + body);
     * @param {Object} safariWeb The safariWeb object with safariWeb optional settings.
     */
    this.setSafariWebSettings = function (safariWeb) {

        this.json.settings.safariWeb = removeNullValues(safariWeb);
    };


    /**
     * Configure specific to FirefoxWeb.
     *
     * Accepts an argument of type {@link FirefoxWeb} function which has the
     * following members below:
     *
     * title (string): Specifies the title to be set for
     * the FirefoxWeb Push Notifications.
     *
     * iconUrl (string): The URL of the icon to be set for
     * the WebPush Notification.
     *
     * timeToLive (string): This parameter specifies how
     * long (in seconds) the message should be kept in GCM storage if the device
     * is offline.
     *
     * payload (Object): Custom JSON payload that will be
     * sent as part of the notification message.
     *
     * Below is the code snippet for usage of this method:
     *
     *
     * var PushNotifications = require('bluemix-push-notifications').PushNotifications;
     * var Notification = require('bluemix-push-notifications').Notification;
     * var Model = PushNotifications.PushMessageModel;
     * var myPushNotifications = new PushNotifications(PushNotifications.Region.US_SOUTH, "your-bluemix-app-guid", "your-push-service-appSecret");
     * var notificationExample = new Notification("Testing BluemixPushNotifications");
     * notificationExample.setUrl("www.example.com");
     * notificationExample.setTarget(new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.Target)).platforms([Notification.TargetPlatform.WebFirefox]));
     * notificationExample.setFirefoxWebSettings(new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.FirefoxWeb)).title("title").iconUrl("iconUrl").timeToLive(1.0).payload({ key: "value" }));
     * myPushNotifications.send(notificationExample, function (error, response, body) {
     * console.log("Error: " + error);
     * console.log("Response: " + JSON.stringify(response));
     * console.log("Body: " + body);
     * @param {Object} firefoxWeb The firefoxWeb with firefoxWeb optional settings.
     */
    this.setFirefoxWebSettings = function (firefoxWeb) {

        this.json.settings.firefoxWeb = removeNullValues(firefoxWeb);
    };

    /**
     * Configure specific to ChromeAppExt.
     *
     * Accepts an argument of type {@link ChromeAppExt} function which has the
     * following members below:
     *
     * title (string):  Specifies the title to be set for
     * the WebPush Notification ,
     * iconUrl (string):  The URL of the icon to be set for
     * the WebPush Notification. If you set this property, you should provide a proper icon url or else notification will not work for chromAppExtension.
     * timeToLive (number):  This parameter specifies how
     * long (in seconds) the message should be kept in GCM storage if the device
     * is offline. ,
     * payload (Object):  Custom JSON payload that will be
     * sent as part of the notification message. Below is the code snippet for
     * usage of this method:
     *
     * sent as part of the notification message.
     *
     * Below is the code snippet for usage of this method:
     *
     *
     * var PushNotifications = require('bluemix-push-notifications').PushNotifications;
     * var Notification = require('bluemix-push-notifications').Notification;
     * var Model = PushNotifications.PushMessageModel;
     * var myPushNotifications = new PushNotifications(PushNotifications.Region.US_SOUTH, "your-bluemix-app-guid", "your-push-service-appSecret");
     * var notificationExample = new Notification("Testing BluemixPushNotifications");
     * notificationExample.setUrl("www.example.com");
     * notificationExample.setTarget(new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.Target)).platforms([Notification.TargetPlatform.AppExtChrome]));
     * notificationExample.setChromeAppExtSettings(
     * new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.ChromeAppExt)).collapseKey("collapseKey").delayWhileIdle(true).title("title")
     * .iconUrl("iconUrl").timeToLive(1.0).payload({ key: "value" }));
     * myPushNotifications.send(notificationExample, function (error, response, body) {
     * console.log("Error: " + error);
     * console.log("Response: " + JSON.stringify(response));
     * console.log("Body: " + body);
     * @param {Object} chromeAppExt The chromeAppExt object with chromeAppExtension optional settings.
     */
    this.setChromeAppExtSettings = function (chromeAppExt) {

        this.json.settings.chromeAppExt = removeNullValues(chromeAppExt);
    };

    /**
     * Configure specific to ChromeWeb.
     *
     * Accepts an argument of type {@link ChromeWeb} function which has the
     * following members below:
     *
     * title (string)Specifies the title to be set for
     * the WebPush Notification ,
     * iconUrl (string)The URL of the icon to be set for
     * the WebPush Notification ,
     * timeToLive (number)This parameter specifies how
     * long (in seconds) the message should be kept in GCM storage if the device
     * is offline. ,
     * payload (string)Custom JSON payload that will be
     * sent as part of the notification message. Below is the code snippet for
     * usage of this method:
     *
     * snippet for usage of this method:<br>

     *
     * Below is the code snippet for usage of this method:
     *
     *
     * var PushNotifications = require('bluemix-push-notifications').PushNotifications;
     * var Notification = require('bluemix-push-notifications').Notification;
     * var Model = PushNotifications.PushMessageModel;
     * var myPushNotifications = new PushNotifications(PushNotifications.Region.US_SOUTH, "your-bluemix-app-guid", "your-push-service-appSecret");
     * var notificationExample = new Notification("Testing BluemixPushNotifications");
     * notificationExample.setUrl("www.example.com");
     * notificationExample.setTarget(new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.Target)).platforms([Notification.TargetPlatform.WebChrome]));
     * notificationExample.setChromeSettings(new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.ChromeWeb)).title("title").iconUrl("iconUrl").timeToLive(1.0).payload({ key: "value" }));
     * myPushNotifications.send(notificationExample, function (error, response, body) {
     * console.log("Error: " + error);
     * console.log("Response: " + JSON.stringify(response));
     * console.log("Body: " + body);
     * @param {Object} chrome The chrome object with chrome optional settings.
     */
    this.setChromeSettings = function (chrome) {

        this.json.settings.chromeWeb = removeNullValues(chrome);
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
    AppExtChrome: "APPEXT_CHROME"
};
/**
*
*  The supported platform Settings.
*  This should be used for the platforms settings parameter int the [BuilderFactory() method] {@link BuilderFactory} .
*/
Notification.Builder = {
    Apns: "apns",
    Gcm: "gcm",
    ChromeWeb: "chromeWeb",
    FirefoxWeb: "fireFoxWeb",
    SafariWeb: "safariWeb",
    ChromeAppExt: "chromeAppExt",
    Target: "target",
    GcmStyle: "gcmStyle",
    GcmLights: "gcmLights"
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



module.exports = Notification;
