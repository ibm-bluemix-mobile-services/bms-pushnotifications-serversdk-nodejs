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
// setTarget(deviceIds, userIds, platforms, tagNames), you can either set deviceIds or userIds or Platforms or tatNames
notificationExample.setTarget(["device1", "device2"], 
                              ["user1", "user2"], 
                              [Notification.TargetPlatform.Apple, Notification.TargetPlatform.Google], 
                              ["tag1", "tag2"]); // This approach is deprecated


 // New approach below, you only need to set attributes which are required :
 // ** Note : You can either set deviceIds or userIds or Platforms or tatNames.
notificationExample.setTargetValues(new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.Target)).deviceIds(["device1", "device2"]).userIds(["user1", "user2"]). platforms([Notification.TargetPlatform.Apple, Notification.TargetPlatform.Google, Notification.TargetPlatform.WebChrome, Notification.TargetPlatform.WebFirefox
, Notification.TargetPlatform.WebSafari, Notification.TargetPlatform.AppExtChrome]).tagNames(["tag1", "tag2"]));


// setApnsSettings(badge, category, iosActionKey, sound, type, payload)
notificationExample.setApnsSettings(1, "category", "iosActionKey", "sound.mp3", Notification.ApnsType.DEFAULT, {key: "value"}); // This is deprecated

// New approach below, you only need to set attributes which are required :
// for Apns Settings. **Also category is deprecated, we will be using interactiveCategory instead.

notificationExample.setApnsSettingsValues(
new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.Apns)).badge(1).interactiveCategory("interactiveCategory").iosActionKey("iosActionKey").sound("sound.mp3").
type(Notification.ApnsType.DEFAULT).payload({ key: "value" }).titleLocKey("titleLocKey").locKey("locKey").launchImage("launchImage")
.titleLocArgs(["titleLocArgs1", "titleLocArgs2"]).locArgs(["locArgs1", "locArgs2"]).subtitle("subtitle").title("title").attachmentUrl("attachmentUrl"));


// setGcmSettings(collapseKey, delayWhileIdle, payload, priority, sound, timeToLive)
notificationExample.setGcmSettings("collapseKey", true, "payload", Notification.GcmPriority.DEFAULT, "sound.mp3", 1.0); // This is deprecated

// New approach for GCM , for newly added options style and lights , you need to construct there json first if you want to use them.


var settings = new Model.settings();

// If your require style settings you can create style json as shown below;           
var style = settings.settingsBuilder(Model.builderFactory(Notification.Builder.GcmStyle)).type(Notification.GcmStyleTypes.BIGTEST_NOTIFICATION).text("text").title("title").url("url").lines(["lines"]);
var lights = settings.settingsBuilder(Model.builderFactory(Notification.Builder.GcmLights)).ledArgb(Notification.GcmLED.BLACK).ledOffMs(1).ledOnMs(1);

// If you require lights settings you can create lights json as shown below:
var lights = settings.settingsBuilder(Model.builderFactory(Notification.Builder.GcmLights)).ledArgb(Notification.GcmLED.BLACK);

// Finally gcm settings creation
notificationExample.setGcmSettingsValues(
settings    .settingsBuilder(Model.builderFactory(Notification.Builder.Gcm)).collapseKey("collapseKey").delayWhileIdle(true).payload({ key: "value" })
.priority(Notification.GcmPriority.DEFAULT).sound("sound.mp3").timeToLive(1.0).icon("icon").sync(true).visibility(Notification.Visibility.PUBLIC).style(style).lights(lights));

// For Safari. All the three settings are mandatory to provide.
notificationExample.setSafariWebSettings(new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.SafariWeb)).title("title").urlArgs(["urlArgs1"]).action("action"));

// For Firefox..
notificationExample.setFirefoxWebSettings(new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.FirefoxWeb)).title("title").iconUrl("iconUrl").timeToLive(1.0).payload({ key: "value" }));

//For ChromeAppExtension. You need to provide proper iconUrl or else chromeApp would not work.
notificationExample.setChromeAppExtSettings(
new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.ChromeAppExt)).collapseKey("collapseKey").delayWhileIdle(true).title("title")
.iconUrl("iconUrl").timeToLive(1.0).payload({ key: "value" }));


//For Chrome..
notificationExample.setChromeSettings(new Model.settings().settingsBuilder(Model.builderFactory(Notification.Builder.ChromeWeb)).title("title").iconUrl("iconUrl").timeToLive(1.0).payload({ key: "value" }));

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
