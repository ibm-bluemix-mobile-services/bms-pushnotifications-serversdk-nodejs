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
var PushMessageBuilder = require('bluemix-push-notifications').PushMessageBuilder;
```
Initialize PushNotifications with details about your Bluemix Push Notifications service. 

```javascript
var myPushNotifications = new PushNotifications(PushNotifications.Region.US_SOUTH, "your-bluemix-app-guid", "your-push-service-appSecret");
```
**Note:** The first parameter in the initializer is the Bluemix region where the Push Notifications service is hosted. The four options are `PushNotifications.Region.US_SOUTH`, `PushNotifications.Region.UK`,  `PushNotifications.Region.SYDNEY` and `PushNotifications.Region.FRANKFURT`. If `null` is supplied for the last 2 parameters, their values will be automatically retrieved from the Bluemix app's environment variables, provided that your Node.js app is bound to the Bluemix app.

**Note:** If you are using dedicated service, use overrideServerHost and add any of the bluemixRegion (bluemix region) value.
```javascript
PushNotifications.overrideServerHost = "YOUR_SERVICE_HOST";
var myPushNotifications = new PushNotifications(PushNotifications.Region.US_SOUTH, "your-bluemix-app-guid", "your-push-service-appSecret");
```

Next, create the push notification that you want to broadcast by supplying the alert message you want to be displayed. 

An optional URL may be supplied with the alert.
```javascript
var message = PushMessageBuilder.Message.alert("20% Off for you")
.url("www.ibm.com").build();
var notificationExample =  Notification.message(message).build();
```
or

You can specify which devices, users, platforms, tag-subscriptions the notification should be sent to and customize the alert they receive.

Create target.

** Note : You can either set deviceIds or userIds or platforms or tagNames.

Below code snippet uses platforms, same way you can do it for deviceIds(...) or userIds(...) or tagNames(...).

```javascript

var target = PushMessageBuilder.Target.platforms(
[Notification.Platform.Apple, Notification.Platform.Google,
 Notification.Platform.WebChrome,Notification.Platform.WebFirefox,
 Notification.Platform.WebSafari,Notification.Platform.AppExtChrome]).build();
```

Next, create message as shown below.
```javascript
var message = PushMessageBuilder.Message.alert("20% Off Offer for you")
.url("www.ibm.com").build();
```
Functionality added for FirefoxWeb, ChromeWeb, SafariWeb, ChromeAppExtension and extra optional settings introduced for Apns and GCM.

Next, set all the optional settings for platforms (apns, gcm, safari etc).
```javascript
// For Apns Settings.
var apns = PushMessageBuilder.Apns.badge(1).interactiveCategory("Accept")
.iosActionKey("PUSH_OFFER").sound("sound.mp3").type(Notification.ApnsType.DEFAULT)
.payload({ "alert" : "20% Off for you" }).titleLocKey("OFFER")
.locKey("REPLYTO")
.launchImage("http://www.iconninja.com/files/689/621/150/ibm-icon.svg")
.titleLocArgs(["Jenna","Frank"]).locArgs(["Jenna","Frank"]).subtitle("Bluemix")
.title("IBM")
.attachmentUrl("http://www.iconninja.com/files/689/621/150/ibm-icon.svg")
.build();

/* Options style and lights are new optional settings added to GCM,
 * If your require lights and style settings you can create style and lights objects as shown below;           
*/

var style = PushMessageBuilder.GcmStyle.type(Notification.GcmStyleTypes
.BIGTEXT_NOTIFICATION).text("IBM Push").title("Big Text Notification").url("http://www.iconninja.com/files/689/621/150/ibm-icon.svg")
.lines(["IBM", "Bluemix", "Big Text Notification"]).build();

var lights = PushMessageBuilder.GcmLights.ledArgb(Notification.GcmLED.BLACK)
.ledOffMs(1).ledOnMs(1).build();
 
// Finally gcm settings creation. Also timetolive setting is provided which specifies how long (in seconds)
// the message should be kept in GCM storage if the device is offline.
var gcm = PushMessageBuilder.Gcm.collapseKey("ping").
interactiveCategory("Accept").delayWhileIdle(true)
.payload({ "alert" : "20% Off for you" })
.priority(Notification.GcmPriority.DEFAULT).sound("sound.mp3").timeToLive(1.0)
.icon("http://www.iconninja.com/files/689/621/150/ibm-icon.svg")
.sync(true).visibility(Notification.Visibility.PUBLIC)
.style(style).lights(lights).build();

// For Safari. All the three settings are mandatory to provide.
var safariWeb = PushMessageBuilder.SafariWeb.title("IBM").urlArgs(["www.IBM.com"])
.action("View").build();

// For Firefox..
var firefoxWeb = PushMessageBuilder.FirefoxWeb.title("IBM")
.iconUrl("http://www.iconninja.com/files/689/621/150/ibm-icon.svg")
.timeToLive(1.0).payload({ "alert" : "20% Off for you" }).build();

//For ChromeAppExtension. You need to provide proper iconUrl or else chromeApp would not work.

var chromeAppExt = PushMessageBuilder.ChromeAppExt.collapseKey("ping")
.delayWhileIdle(true).title("IBM")
.iconUrl("http://www.iconninja.com/files/689/621/150/ibm-icon.svg").timeToLive(1.0)
.payload({ "alert" : "20% Off for you" }).build();


//For Chrome..

var chromeWeb = PushMessageBuilder.ChromeWeb.title("IBM")
.iconUrl("http://www.iconninja.com/files/689/621/150/ibm-icon.svg")
.timeToLive(1.0).payload({ "alert" : "20% Off for you" }).build();
```

Next, create settings with all platforms optional settings.

```javascript

var settings = PushMessageBuilder.Settings.apns(apns).gcm(gcm).safariWeb(safariWeb)
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
