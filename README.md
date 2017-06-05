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
var Target = require('bluemix-push-notifications').Target
var Settings = require('bluemix-push-notifications').Settings
var Message = require('bluemix-push-notifications').Mesage
```
These modules required only if optional settings required for each one of them.

```javascript
var Apns = require('bluemix-push-notifications').Apns
var Gcm = require('bluemix-push-notifications').Gcm
var ChromeAppExt = require('bluemix-push-notifications').ChromeAppExt
var ChromeWeb = require('bluemix-push-notifications').ChromeWeb
var FirefoxWeb = require('bluemix-push-notifications').FirefoxWeb
var SafariWeb = require('bluemix-push-notifications').SafariWeb
var GcmLights = require('bluemix-push-notifications').GcmLights
var GcmStyle = require('bluemix-push-notifications').GcmStyle
```
Initialize PushNotifications with details about your Bluemix Push Notifications service. 

```javascript
var myPushNotifications = new PushNotifications(PushNotifications.Region.US_SOUTH, "your-bluemix-app-guid", "your-push-service-appSecret");
```
**Note:** The first parameter in the initializer is the Bluemix region where the Push Notifications service is hosted. The three options are `PushNotifications.Region.US_SOUTH`, `PushNotifications.Region.UK`, and `PushNotifications.Region.SYDNEY`. If `null` is supplied for the last 2 parameters, their values will be automatically retrieved from the Bluemix app's environment variables, provided that your Node.js app is bound to the Bluemix app.

Next, create the push notification that you want to broadcast by supplying the alert message you want to be displayed. 

An optional URL may be supplied with the alert.
```javascript
var message = Message.alert("20% Off for first 100 Bluemix customers")
.url("www.ibm.com").build();
var notificationExample =  Notification.message(message).build();
```
or

You can specify which devices, users, platforms, tag-subscriptions the notification should be sent to and customize the alert they receive.

Create target.

** Note : You can either set deviceIds or userIds or platforms or tagNames.

Below code snippet uses platforms, same way you can do it for deviceIds(...) or userIds(...) or tagNames(...).

```javascript

var target = Target.platforms(
[Notification.TargetPlatform.Apple, Notification.TargetPlatform.Google,
 Notification.TargetPlatform.WebChrome,Notification.TargetPlatform.WebFirefox,
 Notification.TargetPlatform.WebSafari,Notification.TargetPlatform.AppExtChrome]).build();
```

Next, create message as shown below.
```javascript
var message = Message.alert("20% Off for first 100 Bluemix customers")
.url("www.ibm.com").build();
```
Functionality added for FirefoxWeb, ChromeWeb, SafariWeb, ChromeAppExtension and extra optional settings introduced for Apns and GCM.

Next, set all the optional settings for platforms (apns, gcm, safari etc).
```javascript
// For Apns Settings. **Also category is deprecated, we will be using interactiveCategory instead.
var apns = Apns.badge(1).interactiveCategory("First_Button_Group1")
.iosActionKey("My Localized String").sound("sound.mp3").type(Notification.ApnsType.DEFAULT)
.payload({ "alert" : "Message received from Bluemix" }).titleLocKey("My Localized String")
.locKey("My Localized String")
.launchImage("https://s-media-cache-ak0.pinimg.com/236x/da/4f/46/da4f46512233232861d3cada1978c230.jpg")
.titleLocArgs(["IBM","Bluemix"]).locArgs(["IBM","Bluemix"]).subtitle("Bluemix")
.title("IBM")
.attachmentUrl("https://s-media-cache-ak0.pinimg.com/236x/da/4f/46/da4f46512233232861d3cada1978c230.jpg")
.build();

/* Options style and lights are new optional settings added to GCM,
 * If your require lights and style settings you can create style and lights objects as shown below;           
*/

var style = GcmStyle.type(Notification.GcmStyleTypes
.BIGTEXT_NOTIFICATION).text("IBM Push").title("Push Notification").url("https://s-media-cache-ak0.pinimg.com/236x/da/4f/46/da4f46512233232861d3cada1978c230.jpg")
.lines(["IBM", "Bluemix", "Push"]).build();

var lights = GcmLights.ledArgb(Notification.GcmLED.BLACK)
.ledOffMs(1).ledOnMs(1).build();
 
// Finally gcm settings creation
var gcm = Gcm.collapseKey("ping").
interactiveCategory("First_Button_Group1").delayWhileIdle(true)
.payload({ "alert" : "Message received from Bluemix" })
.priority(Notification.GcmPriority.DEFAULT).sound("sound.mp3").timeToLive(1.0)
.icon("https://s-media-cache-ak0.pinimg.com/236x/da/4f/46/da4f46512233232861d3cada1978c230.jpg")
.sync(true).visibility(Notification.Visibility.PUBLIC)
.style(style).lights(lights).build();

// For Safari. All the three settings are mandatory to provide.
var safariWeb = SafariWeb.title("IBM").urlArgs(["www.IBM.com"])
.action("View").build();

// For Firefox..
var firefoxWeb = FirefoxWeb.title("IBM")
.iconUrl("https://s-media-cache-ak0.pinimg.com/236x/da/4f/46/da4f46512233232861d3cada1978c230.jpg")
.timeToLive(1.0).payload({ "alert" : "Message received from Bluemix" }).build();

//For ChromeAppExtension. You need to provide proper iconUrl or else chromeApp would not work.

var chromeAppExt = ChromeAppExt.collapseKey("ping")
.delayWhileIdle(true).title("IBM")
.iconUrl("https://s-media-cache-ak0.pinimg.com/236x/da/4f/46/da4f46512233232861d3cada1978c230.jpg").timeToLive(1.0)
.payload({ "alert" : "Message received from Bluemix" }).build();


//For Chrome..

var chromeWeb = ChromeWeb.title("IBM")
.iconUrl("https://s-media-cache-ak0.pinimg.com/236x/da/4f/46/da4f46512233232861d3cada1978c230.jpg")
.timeToLive(1.0).payload({ "alert" : "Message received from Bluemix" }).build();
```

Next, create settings with all platforms optional settings.

```javascript

var settings = Settings.apns(apns).gcm(gcm).safariWeb(safariWeb)
.firefoxWeb(firefoxWeb).chromeAppExt(chromeAppExt).chromeWeb(chromeWeb).build();       

```
Now create final notification using target, settings, and message.

```javascript
var notificationExample = Notification.message(message).
target(target).settings(settings).build();
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
