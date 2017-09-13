var Notification = require("../lib/Notification.js");
var PushMessageBuilder = require("../lib/PushMessageBuilder.js");

var assert = require("chai").assert;
var _ = require("underscore");


 describe("Notification", function () {

    describe("message", function () {
        it("should set all json values correctly", function () {
            var message = PushMessageBuilder.Message.alert("alert").url("url").build();
            var notification = Notification.message(message).build();

            assert.equal(notification.json.message.alert, "alert");
            assert.equal(notification.json.message.url, "url");

            // Need to check differences in both directions to make sure the arrays are exactly the same
            assert.equal("alert", notification.json.message.alert);
            assert.equal("url", notification.json.message.url);

        });
        it("should not set json values when null is input", function () {
            var message = PushMessageBuilder.Message.alert(null).url(null).build();
            var notification = Notification.message(message).build();
            assert.equal(_.isEmpty(notification.message), true);
        });
    });

 describe("target", function () {
        it("should set all json values correctly", function () {

            var target = PushMessageBuilder.Target.deviceIds(["device1", "device2"]).userIds(["user1", "user2"]).
                platforms([Notification.Platform.Apple, Notification.Platform.Google, Notification.Platform.WebChrome, Notification.Platform.WebFirefox
                    , Notification.Platform.WebSafari, Notification.Platform.AppExtChrome]).tagNames(["tag1", "tag2"]).build();
            
            var notification = Notification.target(target).build();

            assert.equal(_.difference(notification.json.target.deviceIds, ["device1", "device2"]).length, 0);
            assert.equal(_.difference(notification.json.target.userIds, ["user1", "user2"]).length, 0);
            assert.equal(_.difference(notification.json.target.platforms, ["A", "G", "WEB_CHROME", "WEB_FIREFOX", "WEB_SAFARI", "APPEXT_CHROME"]).length, 0);
            assert.equal(_.difference(notification.json.target.tagNames, ["tag1", "tag2"]).length, 0);

            // Need to check differences in both directions to make sure the arrays are exactly the same
            assert.equal(_.difference(["device1", "device2"], notification.json.target.deviceIds).length, 0);
            assert.equal(_.difference(["user1", "user2"], notification.json.target.userIds).length, 0);
            assert.equal(_.difference(["A", "G", "WEB_CHROME", "WEB_FIREFOX", "WEB_SAFARI", "APPEXT_CHROME"], notification.json.target.platforms).length, 0);
            assert.equal(_.difference(["tag1", "tag2"], notification.json.target.tagNames).length, 0);
        });
        it("should not set json values when null is input", function () {

            var target = PushMessageBuilder.Target.deviceIds(null).userIds(null).
                platforms(null).tagNames(null).build();
            var notification = Notification.target(target).build();

            assert.equal(_.isEmpty(notification.target), true);
        });
    });

    describe("setApnsSettings", function () {
        it("should set all json values correctly", function () {

            var apns = PushMessageBuilder.APNs.badge(1).interactiveCategory("interactiveCategory").iosActionKey("iosActionKey").sound("sound.mp3").
                type(Notification.APNsType.DEFAULT).payload({ key: "value" }).titleLocKey("titleLocKey").locKey("locKey").launchImage("launchImage")
                .titleLocArgs(["titleLocArgs1", "titleLocArgs2"]).locArgs(["locArgs1", "locArgs2"]).subtitle("subtitle").title("title").attachmentUrl("attachmentUrl").build();

            var settings = PushMessageBuilder.Settings.apns(apns).build();
            var notification = Notification.settings(settings).build();

            assert.equal(notification.json.settings.apns.badge, 1);
            assert.equal(notification.json.settings.apns.interactiveCategory, "interactiveCategory");
            assert.equal(notification.json.settings.apns.iosActionKey, "iosActionKey");
            assert.equal(notification.json.settings.apns.sound, "sound.mp3");
            assert.equal(notification.json.settings.apns.type, "DEFAULT");
            assert.equal(_.keys(notification.json.settings.apns.payload)[0], "key");
            assert.equal(notification.json.settings.apns.payload.key, "value");
            assert.equal(notification.json.settings.apns.titleLocKey, "titleLocKey");
            assert.equal(notification.json.settings.apns.locKey, "locKey");
            assert.equal(notification.json.settings.apns.launchImage, "launchImage");
            assert.equal(_.difference(notification.json.settings.apns.titleLocArgs, ["titleLocArgs1", "titleLocArgs2"]).length, 0);
            assert.equal(_.difference(notification.json.settings.apns.locArgs, ["locArgs1", "locArgs2"]).length, 0);
            assert.equal(notification.json.settings.apns.subtitle, "subtitle");
            assert.equal(notification.json.settings.apns.title, "title");
            assert.equal(notification.json.settings.apns.attachmentUrl, "attachmentUrl");


        });
        it("should not set json values when null is input", function () {
            
            var apns = PushMessageBuilder.APNs.badge(null).interactiveCategory(null).iosActionKey(null).sound(null).
                type(null).payload(null).titleLocKey(null).locKey(null).launchImage(null)
                .titleLocArgs(null).locArgs(null).subtitle(null).title(null).attachmentUrl(null).build();
            var settings = PushMessageBuilder.Settings.apns(apns).build();
            var notification = Notification.settings(settings).build();

            assert.equal(_.isEmpty(notification.settings), true);
        });
    });


    describe("setFCMSettings", function () {
        it("should set all json values correctly", function () {

            var style = PushMessageBuilder.FCMStyle.type(Notification.FCMStyleTypes.BIGTEXT_NOTIFICATION).text("text").title("title").url("url").lines(["line1"]).build();
            var lights = PushMessageBuilder.FCMLights.ledArgb(Notification.FCMLED.BLACK).ledOffMs(1).ledOnMs(1).build();

            var fcm = PushMessageBuilder.FCM.collapseKey("collapseKey").interactiveCategory("interactiveCategory").delayWhileIdle(true).payload({ key: "value" })
                .priority(Notification.FCMPriority.DEFAULT).sound("sound.mp3").timeToLive(1.0).icon("icon").sync(true).visibility(Notification.Visibility.PUBLIC).style(style).lights(lights).build();

            var settings = PushMessageBuilder.Settings.fcm(fcm).build();
            var notification = Notification.settings(settings).build();

            assert.equal(notification.json.settings.gcm.collapseKey, "collapseKey");
            assert.equal(notification.json.settings.gcm.interactiveCategory, "interactiveCategory");
            assert.equal(notification.json.settings.gcm.delayWhileIdle, true);
            assert.equal(_.keys(notification.json.settings.gcm.payload)[0], "key");
            assert.equal(notification.json.settings.gcm.priority, "DEFAULT");
            assert.equal(notification.json.settings.gcm.sound, "sound.mp3");
            assert.equal(notification.json.settings.gcm.timeToLive, 1.0);
            assert.equal(notification.json.settings.gcm.icon, "icon");
            assert.equal(notification.json.settings.gcm.sync, true);
            assert.equal(notification.json.settings.gcm.visibility, "PUBLIC");
            assert.equal(_.keys(notification.json.settings.gcm.style)[0], "type");
            assert.equal(_.values(notification.json.settings.gcm.style)[0], "BIGTEXT_NOTIFICATION");
            assert.equal(_.values(notification.json.settings.gcm.style)[1], "text");
            assert.equal(_.values(notification.json.settings.gcm.style)[2], "title");
            assert.equal(_.values(notification.json.settings.gcm.style)[3], "url");
            assert.equal(_.difference(notification.json.settings.gcm.style[4], ["linw1"]).length, 0);


            assert.equal(_.keys(notification.json.settings.gcm.lights)[0], "ledArgb");
            assert.equal(_.values(notification.json.settings.gcm.lights)[0], "BLACK");
            assert.equal(_.values(notification.json.settings.gcm.lights)[1], "1");
            assert.equal(_.values(notification.json.settings.gcm.lights)[2], "1");
        });
        it("should not set json values when null is input", function () {
            var fcm = PushMessageBuilder.FCM.collapseKey(null).interactiveCategory(null).delayWhileIdle(null).payload(null)
                .priority(null).sound(null).timeToLive(1.0).icon(null).sync(null).visibility(null).style(null).lights(null).build();
            var settings = PushMessageBuilder.Settings.fcm(fcm).build();
            var notification = Notification.settings(settings).build();
            assert.equal(_.isEmpty(notification.settings), true);
        });
    });


    describe("setSafariWebSettings", function () {
        it("should set all json values correctly", function () {

            var safariWeb = PushMessageBuilder.SafariWeb.title("title").urlArgs(["urlArgs1", "urlArgs2"]).action("action").build();
            var settings = PushMessageBuilder.Settings.safariWeb(safariWeb).build();
            var notification = Notification.settings(settings).build();

            assert.equal(notification.json.settings.safariWeb.title, "title");
            assert.equal(_.difference(notification.json.settings.safariWeb.urlArgs, ["urlArgs1", "urlArgs2"]).length, 0);
            assert.equal(notification.json.settings.safariWeb.action, "action");

        });
        it("should not set json values when null is input", function () {
            var safariWeb = PushMessageBuilder.SafariWeb.title(null).urlArgs(null).action(null).build();
            var settings = PushMessageBuilder.Settings.safariWeb(safariWeb).build();
            var notification = Notification.settings(settings).build();
            assert.equal(_.isEmpty(notification.settings), true);
        });
    });

    describe("setFirefoxWebSettings", function () {
        it("should set all json values correctly", function () {

            var firefoxWeb = PushMessageBuilder.FirefoxWeb.title("title").iconUrl("iconUrl").timeToLive(1.0).payload({ key: "value" }).build();
            var settings = PushMessageBuilder.Settings.firefoxWeb(firefoxWeb).build();
            var notification = Notification.settings(settings).build();

            assert.equal(notification.json.settings.firefoxWeb.title, "title");
            assert.equal(notification.json.settings.firefoxWeb.iconUrl, "iconUrl");
            assert.equal(notification.json.settings.firefoxWeb.timeToLive, 1.0);
            assert.equal(_.keys(notification.json.settings.firefoxWeb.payload)[0], "key");

        });
        it("should not set json values when null is input", function () {
            var firefoxWeb = PushMessageBuilder.FirefoxWeb.title(null).iconUrl(null).timeToLive(1.0).payload(null).build();
            var settings = PushMessageBuilder.Settings.firefoxWeb(firefoxWeb).build();
            var notification = Notification.settings(settings).build();
            assert.equal(_.isEmpty(notification.settings), true);
        });
    });

    describe("setChromeAppExtSettings", function () {
        it("should set all json values correctly", function () {

            var chromeAppExt = PushMessageBuilder.ChromeAppExt.collapseKey("collapseKey").delayWhileIdle(true).title("title")
                .iconUrl("iconUrl").timeToLive(1.0).payload({ key: "value" }).build();
            var settings = PushMessageBuilder.Settings.chromeAppExt(chromeAppExt).build();
            var notification = Notification.settings(settings).build();

            assert.equal(notification.json.settings.chromeAppExt.collapseKey, "collapseKey");
            assert.equal(notification.json.settings.chromeAppExt.delayWhileIdle, true);
            assert.equal(notification.json.settings.chromeAppExt.title, "title");
            assert.equal(notification.json.settings.chromeAppExt.iconUrl, "iconUrl");
            assert.equal(notification.json.settings.chromeAppExt.timeToLive, 1.0);
            assert.equal(_.keys(notification.json.settings.chromeAppExt.payload)[0], "key");

        });
        it("should not set json values when null is input", function () {
            var chromeAppExt = PushMessageBuilder.ChromeAppExt.collapseKey(null).delayWhileIdle(true).title(null)
                .iconUrl(null).timeToLive(1.0).payload(null).build();
            var settings = PushMessageBuilder.Settings.chromeAppExt(chromeAppExt).build();
            var notification = Notification.settings(settings).build();
            assert.equal(_.isEmpty(notification.settings), true);
        });
    });


    describe("setChromeSettings", function () {
        it("should set all json values correctly", function () {

            var chromeWeb = PushMessageBuilder.ChromeWeb.title("title").iconUrl("iconUrl").timeToLive(1.0).payload({ key: "value" }).build();
            var settings = PushMessageBuilder.Settings.chromeWeb(chromeWeb).build();
            var notification = Notification.settings(settings).build();

            assert.equal(notification.json.settings.chromeWeb.title, "title");
            assert.equal(notification.json.settings.chromeWeb.iconUrl, "iconUrl");
            assert.equal(notification.json.settings.chromeWeb.timeToLive, 1.0);
            assert.equal(_.keys(notification.json.settings.chromeWeb.payload)[0], "key");

        });
        it("should not set json values when null is input", function () {
            var chromeWeb = PushMessageBuilder.ChromeWeb.title(null).iconUrl(null).timeToLive(1.0).payload(null).build();
            var settings = PushMessageBuilder.Settings.chromeWeb(chromeWeb).build();
            var notification = Notification.settings(settings).build();
            assert.equal(_.isEmpty(notification.settings), true);
        });
    });
});
