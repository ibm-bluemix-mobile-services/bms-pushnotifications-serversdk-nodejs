# IBM Cloud Mobile Services - Push Notifications server-side SDK for NodeJs

[![Build Status](https://travis-ci.org/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs.svg?branch=master)](https://travis-ci.org/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs)
[![Build Status](https://travis-ci.org/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs.svg?branch=development)](https://travis-ci.org/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/cc6dd43d4d6d411cb9a31adff90d2252)](https://www.codacy.com/app/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs/badge.svg?branch=master)](https://coveralls.io/github/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs?branch=master)



The [IBM Cloud Push Notifications service](https://cloud.ibm.com/catalog/services/push-notifications) provides a unified push service to send real-time notifications to mobile and web applications. The Node.js SDK is used for sending push notifications through the IBM Cloud Push Notifications service.

Ensure that you go through [IBM Cloud Push Notifications service documentation](https://cloud.ibm.com/docs/services/mobilepush?topic=mobile-pushnotification-gettingstartedtemplate#gettingstartedtemplate) before you start.

## Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Initialize SDK](#initialize-sdk)
- [Simple Notification](#simple-notification)
- [Notification options](#notification-options)
- [Send bulk Push Notifications](#send-bulk-push-notifications)
- [Samples and videos](#samples-and-videos)


## Prerequisites

- `Ensure that the following prerequisites are in place:`

	```javascript
	var PushNotifications = require('ibm-push-notifications').PushNotifications;
	var Notification = require('ibm-push-notifications').Notification;
	var PushMessageBuilder = require('ibm-push-notifications').PushMessageBuilder;
	var PushNotificationsApiKey = require('ibm-push-notifications').PushNotificationsWithApiKey;
	```


## Installation

```bash
npm install ibm-push-notifications --save
```

## Initialize SDK

Initialize PushNotifications with details about your IBM Cloud Push Notifications service. 
	
- Initialize with AppSecret
	```javascript
	var myPushNotifications = new PushNotifications(PushNotifications.Region.US_SOUTH, "your-push-app-guid", "your-push-service-appSecret");
	```

- Initialize with ApiKey

	```javascript
	
	//Initialize
	var myPushNotifications = new PushNotificationsApiKey(PushNotifications.Region.US_SOUTH, "your-push-app-guid", "your-push-push-apikey");
	
	// Get authtoken
	myPushNotifications.getAuthToken(function(hastoken,token){
		console.log(hastoken, token);
	}
	```
>**Note**: If you are using the APIKEY for Initialisation kindly call `getAuthToken()` , bofre sending any notification. This will add an Authorization header for the request.

The first parameter in the initializer is the IBM Cloud region where the Push Notifications service is hosted. 
The four options are :
- `PushNotifications.Region.US_SOUTH`
- `PushNotifications.Region.UK`
- `PushNotifications.Region.SYDNEY` 
- `PushNotifications.Region.JP_TOK` 
- `PushNotifications.Region.FRANKFURT`  
- `PushNotifications.Region.US_EAST`
	
	If `null` is supplied for the last 2 parameters, their values will be automatically retrieved from the IBM Cloud app's environment variables, provided that your Node.js app is bound to the IBM Cloud app.
	If you are using dedicated service, use `overrideServerHost` and add any of the bluemixRegion (IBM Cloud region) value.
	
	```javascript
	PushNotifications.overrideServerHost = "YOUR_SERVICE_HOST";
	var myPushNotifications = new PushNotifications(PushNotifications.Region.US_SOUTH, "your-push-app-guid", "your-push-service-appSecret");
	```


## Simple Notification

 Create the push notification that you want to broadcast by supplying the alert message you want to be displayed. An optional URL may be supplied with the alert.

```javascript
	var message = PushMessageBuilder.Message.alert("20% Off for you")
	.url("www.ibm.com").build();
	var notificationExample =  Notification.message(message).build();
```

## Notification options

You can specify which devices, users, platforms, tag-subscriptions the notification should be sent to and customize the alert they receive.


 1. Create the target. You can either set `deviceIds` or `userIds` or platforms or `tagNames`.

	The following code snippet uses platforms, same way you can do it for deviceIds(...) or userIds(...) or tagNames(...).

	```javascript
	var target = PushMessageBuilder.Target.platforms(
	    [Notification.Platform.Apple, Notification.Platform.Google,
	    Notification.Platform.WebChrome,Notification.Platform.WebFirefox,
	    	Notification.Platform.WebSafari,Notification.Platform.AppExtChrome]).build();
	```

3. Create the message as listed:
	```javascript
	var message = PushMessageBuilder.Message.alert("20% Off Offer for you")
	.url("www.ibm.com").build();
	```
	
	Functionality added for FirefoxWeb, ChromeWeb, SafariWeb, ChromeAppExtension and extra optional settings introduced for Apns and FCM.

3. Set all the optional settings for platforms (APNs, FCM, Safari etc).
	
- APNs
	```javascript
		//For APNs settings
		var apns = PushMessageBuilder.APNs.badge(1).interactiveCategory("Accept")
		    .iosActionKey("PUSH_OFFER").sound("sound.mp3").type(Notification.APNsType.DEFAULT)
		    .payload({ "alert" : "20% Off for you" }).titleLocKey("OFFER")
		    .locKey("REPLYTO")
		    .launchImage("launchImage1.png")
		    .titleLocArgs(["Jenna","Frank"]).locArgs(["Jenna","Frank"]).subtitle("IBM Cloud")
		    .title("IBM")
		    .attachmentUrl("https://developer.blackberry.com/native/files/documentation/images/text_messages_icon.png")
		    .build();
	```
- FCM
	```javascript
		/* Options style and lights are new optional settings added to FCM,
		/ * If your require lights and style settings you can create style and lights objects as listed           
			*/
		var style = PushMessageBuilder.FCMStyle.type(Notification.FCMStyleTypes
		    .BIGTEXT_NOTIFICATION).text("IBM Push").title("Big Text Notification").url("https://developer.blackberry.com/native/files/documentation/images/text_messages_icon.png")
		    .lines(["IBM", "IBM Cloud", "Big Text Notification"]).build();
		var lights = PushMessageBuilder.FCMLights.ledArgb(Notification.FCMLED.BLACK)
		    .ledOffMs(1).ledOnMs(1).build();
		
		
		//Also timetolive setting is provided which specifies how long (in seconds)
		//The message should be kept in FCM storage if the device is offline.
		var fcm = PushMessageBuilder.FCM.collapseKey("ping")
		    .interactiveCategory("Accept").delayWhileIdle(true)
			.payload({ "alert" : "20% Off for you" })
			.androidTitle("Title for Android")
		    .priority(Notification.FCMPriority.DEFAULT).sound("sound.mp3").timeToLive(1.0)
		    .icon("http://www.iconsdb.com/icons/preview/purple/message-2-xxl.png")
		    .sync(true).visibility(Notification.Visibility.PUBLIC)
		    .style(style).lights(lights).build();
	```
- Safari

	```javascript
		//For Safari. 
		//All the three settings are mandatory to provide.
		var safariWeb = PushMessageBuilder.SafariWeb.title("IBM").urlArgs(["www.IBM.com"])
		    .action("View").build();
		
	```
- Firefox

	```javascript
		//For Firefox
		var firefoxWeb = PushMessageBuilder.FirefoxWeb.title("IBM")
		    .iconUrl("http://www.iconsdb.com/icons/preview/purple/message-2-xxl.png")
		    .timeToLive(1.0).payload({ "alert" : "20% Off for you" }).build();
		
	```
- ChromeAppExtension

	```javascript
		//For ChromeAppExtension. 
		//You need to provide proper iconUrl or else chromeApp would not work.
		var chromeAppExt = PushMessageBuilder.ChromeAppExt.collapseKey("ping")
		    .delayWhileIdle(true).title("IBM")
		    .iconUrl("https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTptVxkAVpfhZO0h2KXbnQLg16yvDa7uF-y1t5KGmABDxJ13XoHR1YklGM").timeToLive(1.0)
		    .payload({ "alert" : "20% Off for you" }).build();
	```
- Chrome

	```javascript
		//For Chrome
		var chromeWeb = PushMessageBuilder.ChromeWeb.title("IBM")
		    .iconUrl("http://www.iconsdb.com/icons/preview/purple/message-2-xxl.png")
		    .timeToLive(1.0).payload({ "alert" : "20% Off for you" }).build();
	```

4. Create settings with all platforms optional settings.

	```javascript
	var settings = PushMessageBuilder.Settings.apns(apns).fcm(fcm).safariWeb(safariWeb)
	    .firefoxWeb(firefoxWeb).chromeAppExt(chromeAppExt).chromeWeb(chromeWeb).build();       
	```
5. Create final notification using target, settings, and message.
	
	```javascript
	var notificationExample = Notification.message(message)
	    .target(target).settings(settings).build();
	```
6. Send the Push notification.

	```javascript
	myPushNotifications.send(notificationExample, function(error, response, body) {
	    console.log("Error: " + error);
	    console.log("Response: " + JSON.stringify(response));
	    console.log("Body: " + body);
	});
	```

## Send bulk Push Notifications

To send bulk push notifications do the following,

```javascript
myPushNotifications.sendbulk([notificationExample,notificationExample1,notificationExample2], function(error, response, body) {
	    console.log("Error: " + error);
	    console.log("Response: " + JSON.stringify(response));
	    console.log("Body: " + body);
	});
```

## Samples and videos

* For samples, visit - [Github Sample](https://github.com/ibm-bluemix-mobile-services/bms-samples-swift-hellopush)

* For video tutorials visit - [IBM Cloud Push Notifications](https://www.youtube.com/playlist?list=PLTroxxTPN9dIZYn9IU-IOcQePO-u5r0r4)

### Learning more

* Visit the **[IBM Cloud Developers Community](https://developer.ibm.com/depmodels/cloud/)**.

* [Getting started with IBM MobileFirst Platform for iOS](https://cloud.ibm.com/docs/mobile)

### Connect with IBM Cloud

[Twitter](https://twitter.com/IBMCloud) |
[YouTube](https://www.youtube.com/watch?v=AVPoBWScRQc) |
[Blog](https://developer.ibm.com/depmodels/cloud/) |
[Facebook](https://www.facebook.com/ibmcloud) |


=======================
Copyright 2020-21 IBM Corp.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
