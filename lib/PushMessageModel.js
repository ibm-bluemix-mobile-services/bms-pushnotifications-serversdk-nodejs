
function Settings() {

    this.settingsBuilder = function (builder) {
        builder.init();

        return builder.get();

    };
}

function Apns() {

    this.badge = function(badge) {
        this.badge = badge;
        return this;
    };
    this.interactiveCategory = function(interactiveCategory){
        this.interactiveCategory = interactiveCategory;
        return this;
    };
    this.sound = function(sound){
        this.sound = sound;
        return this;
    };
    this.iosActionKey = function(iosActionKey){
        this.iosActionKey = iosActionKey;
        return this;
    };
    this.payload = function(payload){
        this.payload = payload;
        return this;
    };
    this.interactiveCategory = function(interactiveCategory){
        this.interactiveCategory = interactiveCategory;
        return this;
    };
    this.type = function(type){
        this.type = type;
        return this;
    };
    this.titleLocKey = function(titleLocKey){
        this.titleLocKey = titleLocKey;
        return this;
    };
    this.locKey = function(locKey){
        this.locKey = locKey;
        return this;
    };
    this.launchImage = function(launchImage){
        this.launchImage = launchImage;
        return this;
    };
    this.titleLocArgs = function(titleLocArgs){
        this.titleLocArgs = titleLocArgs;
        return this;
    };
    this.locArgs = function(locArgs){
        this.locArgs = locArgs;
        return this;
    };
    this.subtitle = function(subtitle){
        this.subtitle = subtitle;
        return this;
    };
    this.title = function(title){
        this.title = title;
        return this;
    };
    this.attachmentUrl = function(attachmentUrl){
        this.attachmentUrl = attachmentUrl;
        return this;
    };

};

function ApnsBuilder() {
    this.Apns = null;
    this.init = function () {
        this.Apns = new Apns();
    };
    this.get = function () {
        return this.Apns;
    };
};

function Gcm(){
    this.delayWhileIdle = function(delayWhileIdle){
        this.delayWhileIdle = delayWhileIdle;
        return this;
    };
    this.timeToLive = function(timeToLive){
        this.timeToLive = timeToLive;
        return this;
    };
    this.collapseKey = function (collapseKey) {
        this.collapseKey = collapseKey;
        return this;
    };
    this.payload = function(payload){
        this.payload = payload;
        return this;
    };
    this.sync = function(sync){
        this.sync = sync;
        return this;
    };
    this.sound = function(sound){
        this.sound = sound;
        return this;
    };
    this.interactiveCategory = function(interactiveCategory){
        this.interactiveCategory= interactiveCategory;
        return this;
    };
    this.priority = function(priority){
        this.priority= priority;
        return this;
    };
    this.style = function(style){
        this.style=style;
        return this;
    };
    this.visibility= function(visibility){
        this.visibility=visibility;
        return this;
    };
    this.icon=function(icon){
        this.icon=icon;
        return this;
    };
    this.lights= function(lights){
        this.lights=lights;
        return this;
    };
};

function GcmBuilder() {
    this.Gcm= null;
    this.init = function () {
        this.Gcm = new Gcm();
    };
    this.get = function () {
        return this.Gcm;
    };
};


function FirefoxWeb(){
    this.title= function (title) {
        this.title=title;
        return this;
    };
    this.iconUrl= function (iconUrl) {
        this.iconUrl=iconUrl;
        return this;
    };
    this.timeToLive = function (timeToLive) {
        this.timeToLive=timeToLive;
        return this;
    };
    this.payload= function (payload) {
        this.payload=payload;
        return this;
    };

};


function FirefoxWebBuilder() {
    this.FirefoxWeb = null;
    this.init = function () {
        this.FirefoxWeb = new FirefoxWeb();
    };
    this.get = function () {
        return this.FirefoxWeb;
    };
};


function ChromeWeb(){
    this.title= function (title) {
        this.title=title;
        return this;
    };
    this.iconUrl= function (iconUrl) {
        this.iconUrl=iconUrl;
        return this;
    };
    this.timeToLive= function (timeToLive) {
        this.timeToLive=timeToLive;
        return this;
    };
    this.payload= function (payload) {
        this.payload=payload;
        return this;
    };
};

function ChromeWebBuilder() {
    this.ChromeWeb = null;
    this.init = function () {
        this.ChromeWeb = new ChromeWeb();
    };
    this.get = function () {
        return this.ChromeWeb;
    };
};

function ChromeAppExt(){

   this.collapseKey= function (collapseKey) {
       this.collapseKey=collapseKey;
       return this;
   };
    this.delayWhileIdle= function (delayWhileIdle) {
        this.delayWhileIdle=delayWhileIdle;
        return this;
    };
    this.title= function (title) {
        this.title=title;
        return this;
    };
    this.iconUrl= function (iconUrl) {
        this.iconUrl=iconUrl;
        return this;
    };
    this.timeToLive= function (timeToLive) {
        this.timeToLive=timeToLive;
        return this;
    };
    this.payload= function (payload) {
        this.payload=payload;
        return this;
    };
};

function ChromeAppExtBuilder() {
    this.ChromeAppExt = null;
    this.init = function () {
        this.ChromeAppExt = new ChromeAppExt();
    };
    this.get = function () {
        return this.ChromeAppExt;
    };
};

function SafariWeb() {
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
};

function SafariWebBuilder() {
    this.SafariWeb = null;
    this.init = function () {
        this.SafariWeb = new SafariWeb();
    };
    this.get = function () {
        return this.SafariWeb;
    };
};


function Target(){
    this.deviceIds = function(deviceIds){
        this.deviceIds = deviceIds;
        return this;
    };

    this.userIds = function(userIds){
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
};

function TargetBuilder() {
    this.Target = null;
    this.init = function () {
        this.Target = new Target();
    };
    this.get = function () {
        return this.Target;
    };
};


function GcmStyle(){

    this.type = function(type){
        this.type = type;
        return this;
    };

    this.url = function(url){
        this.url = url;
        return this;
    };

    this.title = function(title){
        this.title = title;
        return this;
    };

    this.text = function (text) {
        this.text = text;
        return this;
    };

    this.lines = function(lines){
        this.lines = lines;
    };
};

function GcmStyleBuilder() {
    this.GcmStyle = null;
    this.init = function () {
        this.GcmStyle = new GcmStyle();
    };
    this.get = function () {
        return this.GcmStyle;
    };
};



function GcmLights() {

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
};

function GcmLightsBuilder() {
    this.GcmLights = null;
    this.init = function () {
        this.GcmLights = new GcmLights();
    };
    this.get = function () {
        return this.GcmLights;
    };
};

function BuilderFactory(notification){
    if(notification === "apns"){
        return new ApnsBuilder();
    }else if(notification === "gcm"){
        return new GcmBuilder();
    }else if( notification ==="chromeWeb"){
        return new ChromeWebBuilder();
    }else if(notification ==="fireFoxWeb"){
        return new FirefoxWebBuilder();
    }else if(notification ==="safariWeb"){
        return new SafariWebBuilder();
    }else if(notification ==="chromeAppExt"){
        return new ChromeAppExtBuilder();
    }else if(notification ==="target"){
        return new TargetBuilder();
    }else if(notification ==="gcmStyle"){
        return new GcmStyleBuilder();
    }else if(notification ==="gcmLights"){
        return new GcmLightsBuilder();
    };

};

module.exports = {gcmStyle:GcmStyle,gcmStyleBuilder:GcmStyleBuilder,gcmLights:GcmLights,gcmLightsBuilder:GcmLightsBuilder,target:Target,targetBuilder:TargetBuilder,builderFactory:BuilderFactory, settings: Settings, apns: Apns,apnsBuilder:ApnsBuilder,
    gcm:Gcm,gcmBuilder:GcmBuilder,firefoxWeb:FirefoxWeb,firefoxWebBuilder:FirefoxWebBuilder,chromeWeb:ChromeWeb,chromeWebBuilder:ChromeWebBuilder,
    chromeAppExt:ChromeAppExt,chromeAppExtBuilder:ChromeAppExtBuilder, safariWeb: SafariWeb, safariWebBuilder: SafariWebBuilder}

