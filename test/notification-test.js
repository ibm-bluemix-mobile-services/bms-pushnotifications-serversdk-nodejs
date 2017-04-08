var Notification = require('../lib/Notification.js');
var Model = require('../lib/PushMessageModel');
var assert = require('chai').assert;
var _ = require('underscore');


describe('Notification', function () {

    describe('initializer', function () {
        it('should set up json with required data', function () {
            var notification = new Notification('test');

            assert.equal(notification.json.message.alert, 'test');
        });
    });

    describe('setUrl', function () {
        it('should set url when supplied', function () {
            var notification = new Notification('test');
            notification.setUrl('url');

            assert.equal(notification.json.message.url, 'url');
        });
        it('should not set url when null is input', function () {
            var notification = new Notification('test');
            notification.setUrl(null);

            assert.equal(notification.json.message.hasOwnProperty('url'), false);
        });
    });

    // Test for deprecated API
    describe('setTarget', function () {
        it('should set all json values correctly', function () {
            var notification = new Notification('test');
            notification.setTarget(["device1", "device2"], ["user1", "user2"], [Notification.TargetPlatform.Apple, Notification.TargetPlatform.Google], ["tag1", "tag2"]);

            assert.equal(_.difference(notification.json.target.deviceIds, ["device1", "device2"]).length, 0);
            assert.equal(_.difference(notification.json.target.userIds, ["user1", "user2"]).length, 0);
            assert.equal(_.difference(notification.json.target.platforms, ["A", "G"]).length, 0);
            assert.equal(_.difference(notification.json.target.tagNames, ["tag1", "tag2"]).length, 0);

            // Need to check differences in both directions to make sure the arrays are exactly the same
            assert.equal(_.difference(["device1", "device2"], notification.json.target.deviceIds).length, 0);
            assert.equal(_.difference(["user1", "user2"], notification.json.target.userIds).length, 0);
            assert.equal(_.difference(["A", "G"], notification.json.target.platforms).length, 0);
            assert.equal(_.difference(["tag1", "tag2"], notification.json.target.tagNames).length, 0);
        });
        it('should not set json values when null is input', function () {
            var notification = new Notification('test');
            notification.setTarget(null, null, null, null);

            assert.equal(_.isEmpty(notification.target), true);
        });
    });

    describe('setTargetValues', function () {
        it('should set all json values correctly', function () {
            var notification = new Notification('test');

            notification.setTargetValues(new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.Target)).deviceIds(["device1", "device2"]).userIds(["user1", "user2"]).
                platforms([Notification.TargetPlatform.Apple, Notification.TargetPlatform.Google, Notification.TargetPlatform.WebChrome, Notification.TargetPlatform.WebFirefox
                    , Notification.TargetPlatform.WebSafari, Notification.TargetPlatform.AppExtChrome]).tagNames(["tag1", "tag2"]));


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
        it('should not set json values when null is input', function () {
            var notification = new Notification('test');
            notification.setTarget(null, null, null, null);

            assert.equal(_.isEmpty(notification.target), true);
        });
    });

    // Test for deprecated API
    describe('setApnsSettings', function () {
        it('should set all json values correctly', function () {
            var notification = new Notification('test');
            notification.setApnsSettings(1, "interactiveCategory", "iosActionKey", "sound.mp3", Notification.ApnsType.DEFAULT, { key: "value" });

            assert.equal(notification.json.settings.apns.badge, 1);
            assert.equal(notification.json.settings.apns.interactiveCategory, "interactiveCategory");
            assert.equal(notification.json.settings.apns.iosActionKey, "iosActionKey");
            assert.equal(notification.json.settings.apns.sound, "sound.mp3");
            assert.equal(notification.json.settings.apns.type, "DEFAULT");
            assert.equal(_.keys(notification.json.settings.apns.payload)[0], "key");
            assert.equal(notification.json.settings.apns.payload.key, "value");
        });
        it('should not set json values when null is input', function () {
            var notification = new Notification('test');
            notification.setApnsSettings(null, null, null, null, null, null);

            assert.equal(_.isEmpty(notification.settings), true);
        });
    });

    describe('setApnsSettingsValues', function () {
        it('should set all json values correctly', function () {
            var notification = new Notification('test');

            notification.setApnsSettingsValues(
                new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.Apns)).badge(1).interactiveCategory("interactiveCategory").iosActionKey("iosActionKey").sound("sound.mp3").
                    type(Notification.ApnsType.DEFAULT).payload({ key: "value" }).titleLocKey("titleLocKey").locKey("locKey").launchImage("launchImage")
                    .titleLocArgs(["titleLocArgs1", "titleLocArgs2"]).locArgs(["locArgs1", "locArgs2"]).subtitle("subtitle").title("title").attachmentUrl("attachmentUrl"));

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
        it('should not set json values when null is input', function () {
            var notification = new Notification('test');
            notification.setApnsSettings(null, null, null, null, null, null, null, null, null, null, null, null, null, null);

            assert.equal(_.isEmpty(notification.settings), true);
        });
    });

    // Test for deprecated API
    describe('setGcmSettings', function () {
        it('should set all json values correctly', function () {
            var notification = new Notification('test');
            notification.setGcmSettings("collapseKey", true, "payload", Notification.GcmPriority.DEFAULT, "sound.mp3", 1.0);

            assert.equal(notification.json.settings.gcm.collapseKey, "collapseKey");
            assert.equal(notification.json.settings.gcm.delayWhileIdle, "true");
            assert.equal(notification.json.settings.gcm.payload, "payload");
            assert.equal(notification.json.settings.gcm.priority, "DEFAULT");
            assert.equal(notification.json.settings.gcm.sound, "sound.mp3");
            assert.equal(notification.json.settings.gcm.timeToLive, 1.0);
        });
        it('should not set json values when null is input', function () {
            var notification = new Notification('test');
            notification.setGcmSettings(null, null, null, null, null, null);

            assert.equal(_.isEmpty(notification.settings), true);
        });
    });


describe('setGcmSettingsValues', function () {
    it('should set all json values correctly', function () {
        var notification = new Notification('test');

        var settings = new Model.settings();

        var style = settings.settingsBuilder(Model.builderFactory(Notification.Builder.GcmStyle)).type(Notification.GcmStyleTypes.BIGTEXT_NOTIFICATION).text("text").title("title").url("url").lines(["line1"]);
        var lights = settings.settingsBuilder(Model.builderFactory(Notification.Builder.GcmLights)).ledArgb(Notification.GcmLED.BLACK).ledOffMs(1).ledOnMs(1);
        notification.setGcmSettingsValues(
            settings.settingsBuilder(Model.builderFactory(Notification.Builder.Gcm)).collapseKey("collapseKey").delayWhileIdle(true).payload({ key: "value" })
                .priority(Notification.GcmPriority.DEFAULT).sound("sound.mp3").timeToLive(1.0).icon("icon").sync(true).visibility(Notification.Visibility.PUBLIC).style(style).lights(lights));

        assert.equal(notification.json.settings.gcm.collapseKey, "collapseKey");
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
        assert.equal(_.values(notification.json.settings.gcm.style)[1], "url");
        assert.equal(_.values(notification.json.settings.gcm.style)[2], "title");
        assert.equal(_.values(notification.json.settings.gcm.style)[3], "text");
        assert.equal(_.difference(notification.json.settings.gcm.style[4], ["linw1"]).length, 0);


        assert.equal(_.keys(notification.json.settings.gcm.lights)[0], "ledArgb");
        assert.equal(_.values(notification.json.settings.gcm.lights)[0], "BLACK");
        assert.equal(_.values(notification.json.settings.gcm.lights)[1], "1");
        assert.equal(_.values(notification.json.settings.gcm.lights)[2], "1");
    })
    it('should not set json values when null is input', function () {
        var notification = new Notification('test');
        notification.setGcmSettings(null, null, null, null, null, null, null, null, null, null);

        assert.equal(_.isEmpty(notification.settings), true);
    });
});


describe('setSafariWebSettings', function () {
    it('should set all json values correctly', function () {
        var notification = new Notification('test');

        notification.setSafariWebSettings(new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.SafariWeb)).title("title").urlArgs(["urlArgs1", "urlArgs2"]).action("action"));

        assert.equal(notification.json.settings.safariWeb.title, "title");
        assert.equal(_.difference(notification.json.settings.safariWeb.urlArgs, ["urlArgs1", "urlArgs2"]).length, 0);
        assert.equal(notification.json.settings.safariWeb.action, "action");

    });
    it('should not set json values when null is input', function () {
        var notification = new Notification('test');
        notification.setSafariWebSettings(null, null, null);

        assert.equal(_.isEmpty(notification.settings), true);
    });
});

describe('setFirefoxWebSettings', function () {
    it('should set all json values correctly', function () {
        var notification = new Notification('test');


        notification.setFirefoxWebSettings(new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.FirefoxWeb)).title("title").iconUrl("iconUrl").timeToLive(1.0).payload({ key: "value" }));

        assert.equal(notification.json.settings.firefoxWeb.title, "title");
        assert.equal(notification.json.settings.firefoxWeb.iconUrl, "iconUrl");
        assert.equal(notification.json.settings.firefoxWeb.timeToLive, 1.0);
        assert.equal(_.keys(notification.json.settings.firefoxWeb.payload)[0], "key");

    });
    it('should not set json values when null is input', function () {
        var notification = new Notification('test');
        notification.setFirefoxWebSettings(null, null, null, null);

        assert.equal(_.isEmpty(notification.settings), true);
    });
});

describe('setChromeAppExtSettings', function () {
    it('should set all json values correctly', function () {
        var notification = new Notification('test');

        notification.setChromeAppExtSettings(
            new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.ChromeAppExt)).collapseKey("collapseKey").delayWhileIdle(true).title("title")
                .iconUrl("iconUrl").timeToLive(1.0).payload({ key: "value" }));
        assert.equal(notification.json.settings.chromeAppExt.collapseKey, "collapseKey");
        assert.equal(notification.json.settings.chromeAppExt.delayWhileIdle, true);
        assert.equal(notification.json.settings.chromeAppExt.title, "title");
        assert.equal(notification.json.settings.chromeAppExt.iconUrl, "iconUrl");
        assert.equal(notification.json.settings.chromeAppExt.timeToLive, 1.0);
        assert.equal(_.keys(notification.json.settings.chromeAppExt.payload)[0], "key");

    });
    it('should not set json values when null is input', function () {
        var notification = new Notification('test');
        notification.setChromeAppExtSettings(null, null, null, null, null, null);

        assert.equal(_.isEmpty(notification.settings), true);
    });
});


describe('setChromeSettings', function () {
    it('should set all json values correctly', function () {
        var notification = new Notification('test');

        notification.setChromeSettings(new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.ChromeWeb)).title("title").iconUrl("iconUrl").timeToLive(1.0).payload({ key: "value" }));
        assert.equal(notification.json.settings.chromeWeb.title, "title");
        assert.equal(notification.json.settings.chromeWeb.iconUrl, "iconUrl");
        assert.equal(notification.json.settings.chromeWeb.timeToLive, 1.0);
        assert.equal(_.keys(notification.json.settings.chromeWeb.payload)[0], "key");

    });
    it('should not set json values when null is input', function () {
        var notification = new Notification('test');
        notification.setChromeSettings(null, null, null, null);

        assert.equal(_.isEmpty(notification.settings), true);
    });
});
});