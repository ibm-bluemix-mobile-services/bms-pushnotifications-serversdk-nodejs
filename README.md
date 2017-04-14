# BluemixPushNotifications

[![Build Status](https://travis-ci.org/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs.svg?branch=master)](https://travis-ci.org/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs)
[![Build Status](https://travis-ci.org/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs.svg?branch=development)](https://travis-ci.org/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/cc6dd43d4d6d411cb9a31adff90d2252)](https://www.codacy.com/app/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs/badge.svg?branch=master)](https://coveralls.io/github/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs?branch=master)


## Summary

BluemixPushNotifications is a Node.js SDK for sending push notifications via Bluemix Push Notifications services.


## Installation

```bash
npm install bluemix-push-notifications --save
```


## Usage

```javascript
var PushNotifications = require('bluemix-push-notifications').PushNotifications;
var Notification = require('bluemix-push-notifications').Notification;

//Require this model to use different builder each for Apns (ApnsBuilder), Gcm(GcmBuilder), FirefoxWeb (FirefoxWebBuilder), SafariWeb (SafariWebBuilder), ChromeWeb (ChromeWebBuilder), ChromeAppExt (ChromeAppExtBuilder).
var Model = PushNotifications.PushMessageModel;
```

Initialize PushNotifications with details about your Bluemix Push Notifications service. 

```javascript
var myPushNotifications = new PushNotifications(PushNotifications.Region.US_SOUTH, "your-bluemix-app-guid", "your-push-service-appSecret");
```
**Note:** The first parameter in the initializer is the Bluemix region where the Push Notifications service is hosted. The three options are `PushNotifications.Region.US_SOUTH`, `PushNotifications.Region.UK`, and `PushNotifications.Region.SYDNEY`. If `null` is supplied for the last 2 parameters, their values will be automatically retrieved from the Bluemix app's environment variables, provided that your Node.js app is bound to the Bluemix app.

Next, create the push notification that you want to broadcast by supplying the alert message you want displayed. 

```javascript
var notificationExample = new Notification("Testing BluemixPushNotifications");
```

An optional URL may be supplied with the alert.

```javascript
notificationExample.setUrl("www.example.com");
```

You can specify which devices, users, platforms, tag-subscriptions the notification should be sent to and customize the alert they receive.

Functionality added for FirefoxWeb, ChromeWeb, SafariWeb, ChromeAppExtension and extral optional settings introduced for Apns and GCM. We use Builders to construct optional settings for each one of them.

```javascript

//Older approach. All Older API mentioned below are deprecated.

// setTarget(deviceIds, userIds, platforms, tagNames), you can either set deviceIds or userIds or Platforms or tatNames
notificationExample.setTarget(["device1", "device2"], 
                              ["user1", "user2"], 
                              [Notification.TargetPlatform.Apple, Notification.TargetPlatform.Google], 
                              ["tag1", "tag2"]); 


// setApnsSettings(badge, category, iosActionKey, sound, type, payload)
notificationExample.setApnsSettings(1, "category", "iosActionKey", "sound.mp3", Notification.ApnsType.DEFAULT, {key: "value"}); 


// setGcmSettings(collapseKey, delayWhileIdle, payload, priority, sound, timeToLive)
notificationExample.setGcmSettings("collapseKey", true, "payload", Notification.GcmPriority.DEFAULT, "sound.mp3", 1.0); 


 // New approach below :
var build = new Model.build(); //create build object for creating builders.

// ** Note : You can either set deviceIds or userIds or platforms or tatNames.
var targetBuider = new Model.targetBuilder();
var target = build.builder(targetBuider).platforms([Notification.TargetPlatform.Apple, Notification.TargetPlatform.Google, Notification.TargetPlatform.WebChrome, Notification.TargetPlatform.WebFirefox, Notification.TargetPlatform.WebSafari, Notification.TargetPlatform.AppExtChrome]);
notificationExample.target(target);

// For Apns Settings. **Also category is deprecated, we will be using interactiveCategory instead.
var apnsBuilder = new Model.apnsBuilder();
var apns = build.builder(apnsBuilder).badge(1).interactiveCategory("interactiveCategory").iosActionKey("iosActionKey").sound("sound.mp3").type(Notification.ApnsType.DEFAULT).payload({ key: "value" }).titleLocKey("titleLocKey").locKey("locKey").launchImage("launchImage").titleLocArgs(["titleLocArgs1", "titleLocArgs2"]).locArgs(["locArgs1", "locArgs2"]).subtitle("subtitle").title("title").attachmentUrl("attachmentUrl");

// For GCM , for newly added options style and lights , you need to construct there json first if you want to use them.

// If your require lights and style settings you can create style and lights objects as shown below;           
var style = new Model.gcmStyle().type(Notification.GcmStyleTypes.BIGTEXT_NOTIFICATION).text("text").title("title").url("url").lines(["line1"]);
var lights = new Model.gcmLights().ledArgb(Notification.GcmLED.BLACK).ledOffMs(1).ledOnMs(1);
 
// Finally gcm settings creation
var gcmBuilder = new Model.gcmBuilder();
var gcm = build.builder(gcmBuilder).collapseKey("collapseKey").delayWhileIdle(true).payload({ key: "value" })
.priority(Notification.GcmPriority.DEFAULT).sound("sound.mp3").timeToLive(1.0).icon("icon").sync(true).visibility(Notification.Visibility.PUBLIC).style(style).lights(lights);

// For Safari. All the three settings are mandatory to provide.
var safariWebBuilder = new Model.safariWebBuilder();
var safariWeb = build.builder(safariWebBuilder).title("title").urlArgs(["urlArgs1"]).action("action");

// For Firefox..
var firefoxWebBuilder = new Model.firefoxWebBuilder();
var firefoxWeb = build.builder(firefoxWebBuilder).title("title").iconUrl("iconUrl").timeToLive(1.0).payload({ key: "value" });

//For ChromeAppExtension. You need to provide proper iconUrl or else chromeApp would not work.
var chromeAppExtBuilder = new Model.chromeAppExtBuilder();
var chromeAppExt = build.builder(chromeAppExtBuilder).collapseKey("collapseKey").delayWhileIdle(true).title("title")
.iconUrl("iconUrl").timeToLive(1.0).payload({ key: "value" });


//For Chrome..
var chromeWebBuilder = new Model.chromeWebBuilder();
var chromeWeb = build.builder(chromeWebBuilder).title("title").iconUrl("iconUrl").timeToLive(1.0).payload({ key: "value" });

//Create settingsBuilder object to set all the platform settings.
var settingsBuilder = new Model.settingsBuilder(); //create settingBuilder object.
var settings = build.builder(settingsBuilder).chromeWeb(chromeWeb);
var settings = build.builder(settingsBuilder).apns(apns).gcm(gcm).safariWeb(safariWeb).firefoxWeb(firefoxWeb)
.chromeAppExt(chromeAppExt).chromeWeb(chromeWeb);       
notificationExample.settings(settings);

```

Finally, send the Push notification.

```javascript
myPushNotifications.send(notificationExample, function(error, response, body) {
    console.log("Error: " + error);
    console.log("Response: " + JSON.stringify(response));
    console.log("Body: " + body);
});
```


## License

Copyright 2016 IBM Corp.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
