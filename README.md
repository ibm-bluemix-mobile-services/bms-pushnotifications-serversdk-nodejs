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
```
Require PushMessageModel to use builder each for Apns, Gcm, FirefoxWeb, SafariWeb, ChromeWeb, ChromeAppExt.

```javascript
var PushMessageModel = PushNotifications.PushMessageModel;
```

Initialize PushNotifications with details about your Bluemix Push Notifications service. 

```javascript
var myPushNotifications = new PushNotifications(PushNotifications.Region.US_SOUTH, "your-bluemix-app-guid", "your-push-service-appSecret");
```
**Note:** The first parameter in the initializer is the Bluemix region where the Push Notifications service is hosted. The three options are `PushNotifications.Region.US_SOUTH`, `PushNotifications.Region.UK`, and `PushNotifications.Region.SYDNEY`. If `null` is supplied for the last 2 parameters, their values will be automatically retrieved from the Bluemix app's environment variables, provided that your Node.js app is bound to the Bluemix app.

Next, create the push notification that you want to broadcast by supplying the alert message you want to be displayed. 

An optional URL may be supplied with the alert.
```javascript
var message = new PushMessageModel.message().builder().alert("Testing BluemixPushNotifications")
.url("www.example.com");
var notificationExample =  new Notification.notification().builder().message(message);
```
or

You can specify which devices, users, platforms, tag-subscriptions the notification should be sent to and customize the alert they receive.

Next, create target.

** Note : You can either set deviceIds or userIds or platforms or tagNames.

Below code snippet uses platforms, same way you can do it for deviceIds(...) or userIds(...) or tagNames(...).

```javascript

var target = new PushMessageModel.target().builder().platforms(
[Notification.notification.TargetPlatform.Apple, Notification.notification.TargetPlatform.Google,
 Notification.notification.TargetPlatform.WebChrome,Notification.notification.TargetPlatform.WebFirefox,
 Notification.notification.TargetPlatform.WebSafari,Notification.notification.TargetPlatform.AppExtChrome]);
```

Next, create message as shown below.
```javascript
var message = new PushMessageModel.message().builder().alert("Testing BluemixPushNotifications")
.url("www.example.com");
```
Functionality added for FirefoxWeb, ChromeWeb, SafariWeb, ChromeAppExtension and extra optional settings introduced for Apns and GCM. We use Builders to construct optional settings for each one of them.

Next, set all the optional settings for platforms (apns, gcm, safari etc) using builders.
```javascript
// For Apns Settings. **Also category is deprecated, we will be using interactiveCategory instead.
var apns = new PushMessageModel.apns().builder().badge(1).interactiveCategory("interactiveCategory")
.iosActionKey("iosActionKey").sound("sound.mp3").type(Notification.notification.ApnsType.DEFAULT)
.payload({ key: "value" }).titleLocKey("titleLocKey").locKey("locKey").launchImage("launchImage")
.titleLocArgs(["titleLocArgs1", "titleLocArgs2"]).locArgs(["locArgs1", "locArgs2"]).subtitle("subtitle")
.title("title").attachmentUrl("attachmentUrl");

/* Options style and lights are new optional settings added to GCM,
 * If your require lights and style settings you can create style and lights objects as shown below;           
*/

var style = new PushMessageModel.gcmStyle().builder().type(Notification.notification.GcmStyleTypes
.BIGTEXT_NOTIFICATION).text("text").title("title").url("url").lines(["line1"]);
var lights = new PushMessageModel.gcmLights().builder().ledArgb(Notification.notification.GcmLED.BLACK)
.ledOffMs(1).ledOnMs(1);
 
// Finally gcm settings creation
var gcm = new PushMessageModel.gcm().builder().collapseKey("collapseKey").
interactiveCategory("interactiveCategory").delayWhileIdle(true).payload({ key: "value" })
.priority(Notification.notification.GcmPriority.DEFAULT).sound("sound.mp3").timeToLive(1.0)
.icon("icon").sync(true).visibility(Notification.notification.Visibility.PUBLIC)
.style(style).lights(lights);

// For Safari. All the three settings are mandatory to provide.
var safariWeb = new PushMessageModel.safariWeb().builder().title("title").urlArgs(["urlArgs1"])
.action("action");

// For Firefox..
var firefoxWeb = new PushMessageModel.firefoxWeb().builder().title("title").iconUrl("iconUrl")
.timeToLive(1.0).payload({ key: "value" });

//For ChromeAppExtension. You need to provide proper iconUrl or else chromeApp would not work.

var chromeAppExt = new PushMessageModel.chromeAppExt().builder().collapseKey("collapseKey")
.delayWhileIdle(true).title("title").iconUrl("iconUrl").timeToLive(1.0).payload({ key: "value" });


//For Chrome..

var chromeWeb = new PushMessageModel.chromeWeb().builder().title("title").iconUrl("iconUrl")
.timeToLive(1.0).payload({ key: "value" });
```

Next, create settings with all platforms optional settings.

```javascript

var settings = new PushMessageModel.settings().builder().apns(apns).gcm(gcm).safariWeb(safariWeb)
.firefoxWeb(firefoxWeb).chromeAppExt(chromeAppExt).chromeWeb(chromeWeb);       

```
Now create final notification using target, settings, and message.

```javascript
var notificationExample = new Notification.notification().builder().message(message).
target(target).settings(settings);
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
