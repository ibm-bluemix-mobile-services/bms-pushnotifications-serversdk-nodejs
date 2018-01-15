# IBM Cloud Mobile Services - Push Notifications server-side SDK for NodeJs

[![Build Status](https://travis-ci.org/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs.svg?branch=master)](https://travis-ci.org/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs)
[![Build Status](https://travis-ci.org/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs.svg?branch=development)](https://travis-ci.org/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/cc6dd43d4d6d411cb9a31adff90d2252)](https://www.codacy.com/app/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs/badge.svg?branch=master)](https://coveralls.io/github/ibm-bluemix-mobile-services/bms-pushnotifications-serversdk-nodejs?branch=master)


## Summary

IBMPushNotifications is a Node.js SDK for sending push notifications through the IBM Cloud Push Notifications service.


## Installation

```bash
npm install ibm-push-notifications --save
```

## Prerequisite

- `Ensure that the following prerequisites are in place:`

	```javascript
	var PushNotifications = require('ibm-push-notifications').PushNotifications;
	var Notification = require('ibm-push-notifications').Notification;
	var PushMessageBuilder = require('ibm-push-notifications').PushMessageBuilder;
	```


## Usage

	
1. Initialize PushNotifications with details about your IBM Cloud Push Notifications service. 
	```javascript
	var myPushNotifications = new PushNotifications(PushNotifications.Region.US_SOUTH, "your-bluemix-app-guid", "your-push-service-appSecret");
	```

	The first parameter in the initializer is the IBM Cloud region where the Push Notifications service is hosted. 
	The four options are :
	- `PushNotifications.Region.US_SOUTH`
	- `PushNotifications.Region.UK`
	- `PushNotifications.Region.SYDNEY` 
	- `PushNotifications.Region.FRANKFURT` and 
	- `PushNotifications.Region.US_EAST`
	
	If `null` is supplied for the last 2 parameters, their values will be automatically retrieved from the IBM Cloud app's environment variables, provided that your Node.js app is bound to the IBM Cloud app.

	If you are using dedicated service, use `overrideServerHost` and add any of the bluemixRegion (IBM Cloud region) value.
	
	```javascript
	PushNotifications.overrideServerHost = "YOUR_SERVICE_HOST";
	var myPushNotifications = new PushNotifications(PushNotifications.Region.US_SOUTH, "your-bluemix-app-guid", "your-push-service-appSecret");
	```

2. Create the push notification that you want to broadcast by supplying the alert message you want to be displayed. An optional URL may be supplied with the alert.
	```javascript
	var message = PushMessageBuilder.Message.alert("20% Off for you")
	.url("www.ibm.com").build();
	var notificationExample =  Notification.message(message).build();
	```
	Or

	You can specify which devices, users, platforms, tag-subscriptions the notification should be sent to and customize the alert they receive.

3. Create the target. You can either set `deviceIds` or `userIds` or platforms or `tagNames`.

	The following code snippet uses platforms, same way you can do it for deviceIds(...) or userIds(...) or tagNames(...).

	```javascript
	var target = PushMessageBuilder.Target.platforms(
	    [Notification.Platform.Apple, Notification.Platform.Google,
	    Notification.Platform.WebChrome,Notification.Platform.WebFirefox,
	    	Notification.Platform.WebSafari,Notification.Platform.AppExtChrome]).build();
	```

4. Create the message as listed:
	```javascript
	var message = PushMessageBuilder.Message.alert("20% Off Offer for you")
	.url("www.ibm.com").build();
	```
	
	Functionality added for FirefoxWeb, ChromeWeb, SafariWeb, ChromeAppExtension and extra optional settings introduced for Apns and FCM.

5. Set all the optional settings for platforms (APNs, FCM, Safari etc).
	
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
		
		/* Options style and lights are new optional settings added to FCM,
		/ * If your require lights and style settings you can create style and lights objects as listed           
			*/
		var style = PushMessageBuilder.FCMStyle.type(Notification.FCMStyleTypes
		    .BIGTEXT_NOTIFICATION).text("IBM Push").title("Big Text Notification").url("https://developer.blackberry.com/native/files/documentation/images/text_messages_icon.png")
		    .lines(["IBM", "IBM Cloud", "Big Text Notification"]).build();
		var lights = PushMessageBuilder.FCMLights.ledArgb(Notification.FCMLED.BLACK)
		    .ledOffMs(1).ledOnMs(1).build();
		
		//For FCM settings.
		//Also timetolive setting is provided which specifies how long (in seconds)
		//The message should be kept in FCM storage if the device is offline.
		var fcm = PushMessageBuilder.FCM.collapseKey("ping")
		    .interactiveCategory("Accept").delayWhileIdle(true)
		    .payload({ "alert" : "20% Off for you" })
		    .priority(Notification.FCMPriority.DEFAULT).sound("sound.mp3").timeToLive(1.0)
		    .icon("http://www.iconsdb.com/icons/preview/purple/message-2-xxl.png")
		    .sync(true).visibility(Notification.Visibility.PUBLIC)
		    .style(style).lights(lights).build();
		
		//For Safari. 
		//All the three settings are mandatory to provide.
		var safariWeb = PushMessageBuilder.SafariWeb.title("IBM").urlArgs(["www.IBM.com"])
		    .action("View").build();
		
		//For Firefox
		var firefoxWeb = PushMessageBuilder.FirefoxWeb.title("IBM")
		    .iconUrl("http://www.iconsdb.com/icons/preview/purple/message-2-xxl.png")
		    .timeToLive(1.0).payload({ "alert" : "20% Off for you" }).build();
		
		//For ChromeAppExtension. 
		//You need to provide proper iconUrl or else chromeApp would not work.
		var chromeAppExt = PushMessageBuilder.ChromeAppExt.collapseKey("ping")
		    .delayWhileIdle(true).title("IBM")
		    .iconUrl("https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTptVxkAVpfhZO0h2KXbnQLg16yvDa7uF-y1t5KGmABDxJ13XoHR1YklGM").timeToLive(1.0)
		    .payload({ "alert" : "20% Off for you" }).build();
		
		//For Chrome
		var chromeWeb = PushMessageBuilder.ChromeWeb.title("IBM")
		    .iconUrl("http://www.iconsdb.com/icons/preview/purple/message-2-xxl.png")
		    .timeToLive(1.0).payload({ "alert" : "20% Off for you" }).build();
	```

6. Create settings with all platforms optional settings.

	```javascript
	var settings = PushMessageBuilder.Settings.apns(apns).fcm(fcm).safariWeb(safariWeb)
	    .firefoxWeb(firefoxWeb).chromeAppExt(chromeAppExt).chromeWeb(chromeWeb).build();       
	```
7. Create final notification using target, settings, and message.
	
	```javascript
	var notificationExample = Notification.message(message)
	    .target(target).settings(settings).build();
	```
8. Send the Push notification.

	```javascript
	myPushNotifications.send(notificationExample, function(error, response, body) {
	    console.log("Error: " + error);
	    console.log("Response: " + JSON.stringify(response));
	    console.log("Body: " + body);
	});
	```


## License

Copyright 2017 IBM Corp.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
