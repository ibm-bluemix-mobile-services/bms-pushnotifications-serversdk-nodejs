function Message() { };

Message.prototype.builder = function builder() {

    this.alert = function (alert) {
        this.alert = alert;
        return this;
    };

    this.url = function (url) {
        this.url = url;
        return this;
    };

    return this;
};

function Target() { };

Target.prototype.builder = function builder() {
    this.deviceIds = function (deviceIds) {
        this.deviceIds = deviceIds;
        return this;
    };

    this.userIds = function (userIds) {
        this.userIds = userIds;
        return this;
    };

    this.platforms = function (platforms) {
        this.platforms = platforms;
        return this;
    };
    this.tagNames = function (tagNames) {
        this.tagNames = tagNames;
        return this;
    };

    return this;
};

function Settings() { };

Settings.prototype.builder = function builder() {

    this.apns = function (apns) {

        this.apns = apns;
        return this;
    };

    this.gcm = function (gcm) {
        this.gcm = gcm;
        return this;
    };

    this.safariWeb = function (safariWeb) {
        this.safariWeb = safariWeb
        return this;
    };

    this.chromeWeb = function (chromeWeb) {
        this.chromeWeb = chromeWeb;
        return this;
    };

    this.chromeAppExt = function (chromeAppExt) {
        this.chromeAppExt = chromeAppExt;
        return this;
    };

    this.firefoxWeb = function (firefoxWeb) {
        this.firefoxWeb = firefoxWeb;
        return this;
    };

    return this;
};

function Apns() { };

Apns.prototype.builder = function builder() {

    this.badge = function (badge) {
        this.badge = badge;
        return this;
    };
    this.interactiveCategory = function (interactiveCategory) {
        this.interactiveCategory = interactiveCategory;
        return this;
    };
    this.sound = function (sound) {
        this.sound = sound;
        return this;
    };
    this.iosActionKey = function (iosActionKey) {
        this.iosActionKey = iosActionKey;
        return this;
    };
    this.payload = function (payload) {
        this.payload = payload;
        return this;
    };

    this.type = function (type) {
        this.type = type;
        return this;
    };
    this.titleLocKey = function (titleLocKey) {
        this.titleLocKey = titleLocKey;
        return this;
    };
    this.locKey = function (locKey) {
        this.locKey = locKey;
        return this;
    };
    this.launchImage = function (launchImage) {
        this.launchImage = launchImage;
        return this;
    };
    this.titleLocArgs = function (titleLocArgs) {
        this.titleLocArgs = titleLocArgs;
        return this;
    };
    this.locArgs = function (locArgs) {
        this.locArgs = locArgs;
        return this;
    };
    this.subtitle = function (subtitle) {
        this.subtitle = subtitle;
        return this;
    };
    this.title = function (title) {
        this.title = title;
        return this;
    };
    this.attachmentUrl = function (attachmentUrl) {
        this.attachmentUrl = attachmentUrl;
        return this;
    };

    return this;
};

function Gcm() { };

Gcm.prototype.builder = function builder() {
    this.delayWhileIdle = function (delayWhileIdle) {
        this.delayWhileIdle = delayWhileIdle;
        return this;
    };
    this.timeToLive = function (timeToLive) {
        this.timeToLive = timeToLive;
        return this;
    };
    this.collapseKey = function (collapseKey) {
        this.collapseKey = collapseKey;
        return this;
    };
    this.payload = function (payload) {
        this.payload = payload;
        return this;
    };
    this.sync = function (sync) {
        this.sync = sync;
        return this;
    };
    this.sound = function (sound) {
        this.sound = sound;
        return this;
    };
    this.interactiveCategory = function (interactiveCategory) {
        this.interactiveCategory = interactiveCategory;
        return this;
    };
    this.priority = function (priority) {
        this.priority = priority;
        return this;
    };
    this.style = function (style) {
        this.style = style;
        return this;
    };
    this.visibility = function (visibility) {
        this.visibility = visibility;
        return this;
    };
    this.icon = function (icon) {
        this.icon = icon;
        return this;
    };
    this.lights = function (lights) {
        this.lights = lights;
        return this;
    };

    return this;
};


function FirefoxWeb() { };

FirefoxWeb.prototype.builder = function builder() {
    this.title = function (title) {
        this.title = title;
        return this;
    };
    this.iconUrl = function (iconUrl) {
        this.iconUrl = iconUrl;
        return this;
    };
    this.timeToLive = function (timeToLive) {
        this.timeToLive = timeToLive;
        return this;
    };
    this.payload = function (payload) {
        this.payload = payload;
        return this;
    };

    return this;
};

function ChromeWeb() { };

ChromeWeb.prototype.builder = function builder() {
    this.title = function (title) {
        this.title = title;
        return this;
    };
    this.iconUrl = function (iconUrl) {
        this.iconUrl = iconUrl;
        return this;
    };
    this.timeToLive = function (timeToLive) {
        this.timeToLive = timeToLive;
        return this;
    };
    this.payload = function (payload) {
        this.payload = payload;
        return this;
    };

    return this;
};

function ChromeAppExt() { };

ChromeAppExt.prototype.builder = function builder() {

    this.collapseKey = function (collapseKey) {
        this.collapseKey = collapseKey;
        return this;
    };
    this.delayWhileIdle = function (delayWhileIdle) {
        this.delayWhileIdle = delayWhileIdle;
        return this;
    };
    this.title = function (title) {
        this.title = title;
        return this;
    };
    this.iconUrl = function (iconUrl) {
        this.iconUrl = iconUrl;
        return this;
    };
    this.timeToLive = function (timeToLive) {
        this.timeToLive = timeToLive;
        return this;
    };
    this.payload = function (payload) {
        this.payload = payload;
        return this;
    };

    return this;
};

function SafariWeb() { };

SafariWeb.prototype.builder = function builder() {

    this.title = function (title) {
        this.title = title;
        return this;
    };

    this.urlArgs = function (urlArgs) {
        this.urlArgs = urlArgs;
        return this;
    };

    this.action = function (action) {
        this.action = action;
        return this;
    };

    return this;

};

function GcmStyle() { };

GcmStyle.prototype.builder = function builder() {

    this.type = function (type) {
        this.type = type;
        return this;
    };

    this.url = function (url) {
        this.url = url;
        return this;
    };

    this.title = function (title) {
        this.title = title;
        return this;
    };

    this.text = function (text) {
        this.text = text;
        return this;
    };

    this.lines = function (lines) {
        this.lines = lines;
        return this;
    };

    return this;
};

function GcmLights() { };

GcmLights.prototype.builder = function builder() {

    this.ledArgb = function (ledArgb) {
        this.ledArgb = ledArgb;
        return this;
    };

    this.ledOnMs = function (ledOnMs) {
        this.ledOnMs = ledOnMs;
        return this;
    };

    this.ledOffMs = function (ledOffMs) {
        this.ledOffMs = ledOffMs;
        return this;
    };

    return this;
};

module.exports = {
    settings: Settings, gcmStyle: GcmStyle, gcmLights: GcmLights, target: Target, message: Message, apns: Apns,
    gcm: Gcm, firefoxWeb: FirefoxWeb, chromeWeb: ChromeWeb, chromeAppExt: ChromeAppExt, safariWeb: SafariWeb
}

