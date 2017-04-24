/*
 *     Copyright 2017 IBM Corp.
 *     Licensed under the Apache License, Version 2.0 (the "License") 
 *     you may not use this file except in compliance with the License.
 *     You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *     See the License for the specific language governing permissions and
 *     limitations under the License.
 */

/**
 * Message object which specifies the content of the notification.
 */
function Message() {} 

/**
 * Builder to build {@link Message} object with alert and url.
 * @return Message object.
 */
Message.prototype.builder = function builder() {
    /**
     * @param {string} alert  The notification message to be shown to the user.
     * @return the builder object so that call can be chained.
     */
    this.alert = function (alert) {
        this.alert = alert 
        return this 
    } 
    /**
     * @param {string} url  An optional URL that can be sent along with the alert.
     * @return the builder object so that call can be chained.
     */
    this.url = function (url) {
        this.url = url 
        return this 
    } 

    return this 
} 

/**
 * Target object which specifies the recipient of the notification.
 */
function Target() {} 

/**
 * Builder to build {@link Target} object with deviceIds or userIds or platforms or tagNames.
 * @return Target object.
 */
Target.prototype.builder = function builder() {
    /**
     * @param {string[]} deviceIds  Send notification to the list of specified devices.
     * @return the builder object so that call can be chained.
     */
    this.deviceIds = function (deviceIds) {
        this.deviceIds = deviceIds 
        return this 
    } 
    /**
     * @param {string[]} userIds  Send notification to the specified userIds.
     * @return the builder object so that call can be chained.
     */
    this.userIds = function (userIds) {
        this.userIds = userIds 
        return this 
    } 
    /**
     * @param {string[]} platforms  Send notification to the devices of the specified platforms.
     *  'A' for apple (iOS) devices, 'G' for google (Android) devices, 'WEB_CHROME' for Chrome Web Browsers,
     *  'WEB_FIREFOX' for Firefox Web Browsers, 'WEB_SAFARI' for Safari Push Notifications and 'APPEXT_CHROME'
     *  for Chrome App Extension.
     * @return the builder object so that call can be chained.
     */
    this.platforms = function (platforms) {
        this.platforms = platforms 
        return this 
    } 
    /**
     * @param {string[]} tagNames  Send notification to the devices that have subscribed to any of these tags.
     * @return the builder object so that call can be chained.
     */
    this.tagNames = function (tagNames) {
        this.tagNames = tagNames 
        return this 
    } 

    return this 
} 

/**
 * Settings object which specifies the additional properties that can be configured for the notification.
 */
function Settings() {} 

/**
 * Builder to build {@link Settings} object, contains all platforms optional settings like apns , gcm , safari etc.
 * @return Settings object.
 */
Settings.prototype.builder = function builder() {
    /**
     * @param {Object} apns  Apns object with optional settings.
     * @return the builder object so that call can be chained.
     */
    this.apns = function (apns) {

        this.apns = apns 
        return this 
    } 
    /**
     * @param {Object} gcm  Gcm object with optional settings.
     * @return the builder object so that call can be chained.
     */
    this.gcm = function (gcm) {
        this.gcm = gcm 
        return this 
    } 
    /**
     * @param {Object} safariWeb  SafariWeb object with optional settings.
     * @return the builder object so that call can be chained.
     */
    this.safariWeb = function (safariWeb) {
        this.safariWeb = safariWeb
        return this 
    } 
    /**
     * @param {Object} chromeWeb  ChromeWeb object with optional settings.
     * @return the builder object so that call can be chained.
     */
    this.chromeWeb = function (chromeWeb) {
        this.chromeWeb = chromeWeb 
        return this 
    } 
    /**
     * @param {Object} chromeAppExt ChromeAppExt object with optional settings.
     * @return the builder object so that call can be chained.
     */
    this.chromeAppExt = function (chromeAppExt) {
        this.chromeAppExt = chromeAppExt 
        return this 
    } 
    /**
     * @param {Object} firefoxWeb FirefoxWeb object with optional settings.
     * @return the builder object so that call can be chained.
     */
    this.firefoxWeb = function (firefoxWeb) {
        this.firefoxWeb = firefoxWeb 
        return this 
    } 

    return this 
} 

/**
 * Apns object which specifies the settings specific to the IOS platform.
 */
function Apns() {} 

/**
 * Builder to build optional settings for {@link Apns} platform.
 * @return Apns object.
 */
Apns.prototype.builder = function builder() {
    /**
     * @param {number} badge  The number to display as the badge of the application icon.
     * @return the builder object so that call can be chained.
     */
    this.badge = function (badge) {
        this.badge = badge 
        return this 
    } 
    /**
     * @param {string} interactiveCategory  The category identifier to be used for the interactive push notifications.
     * @return the builder object so that call can be chained.
     */
    this.interactiveCategory = function (interactiveCategory) {
        this.interactiveCategory = interactiveCategory 
        return this 
    } 
    /**
     * @param {string} sound  The name of the sound file in the application bundle.
     *  The sound of this file is played as an alert. 
     * @return the builder object so that call can be chained.
     */
    this.sound = function (sound) {
        this.sound = sound 
        return this 
    } 
    /**
     * @param {string} iosActionKey  The title for the Action key.
     * @return the builder object so that call can be chained.
     */
    this.iosActionKey = function (iosActionKey) {
        this.iosActionKey = iosActionKey 
        return this 
    } 
    /**
     * @param {Object} payload  Custom JSON payload that will be sent as part of the notification message.
     * @return the builder object so that call can be chained.
     */
    this.payload = function (payload) {
        this.payload = payload 
        return this 
    } 
    /**
     * @param {string} type  ['DEFAULT', 'MIXED', 'SILENT'].
     * @return the builder object so that call can be chained.
     */
    this.type = function (type) {
        this.type = type 
        return this 
    } 
    /**
     * @param {string} titleLocKey  The key to a title string in the Localizable.strings file for the current localization.
     *  The key string can be formatted with %@ and %n$@ specifiers to take the variables specified in the titleLocArgs array. 
     * @return the builder object so that call can be chained.
     */
    this.titleLocKey = function (titleLocKey) {
        this.titleLocKey = titleLocKey 
        return this 
    } 
    /**
     * @param {string} locKey  A key to an alert-message string in a Localizable.strings file for the current localization 
     * (which is set by the user’s language preference). The key string can be formatted with %@ and %n$@ specifiers to take 
     * the variables specified in the locArgs array.
     * @return the builder object so that call can be chained.
     */
    this.locKey = function (locKey) {
        this.locKey = locKey 
        return this 
    } 
    /**
     * @param {string} launchImage  The filename of an image file in the app bundle, with or without the filename extension. 
     * The image is used as the launch image when users tap the action button or move the action slider.
     * @return the builder object so that call can be chained.
     */
    this.launchImage = function (launchImage) {
        this.launchImage = launchImage 
        return this 
    } 
    /**
     * @param {string[]} titleLocArgs  Variable string values to appear in place of the format specifiers in title-loc-key.
     * @return the builder object so that call can be chained.
     */
    this.titleLocArgs = function (titleLocArgs) {
        this.titleLocArgs = titleLocArgs 
        return this 
    } 
    /**
     * @param {string[]} locArgs  Variable string values to appear in place of the format specifiers in locKey.
     * @return the builder object so that call can be chained.
     */
    this.locArgs = function (locArgs) {
        this.locArgs = locArgs 
        return this 
    } 
    /**
     * @param {string} subtitle  The subtitle of the Rich Notifications. (Supported only on iOS 10 and above).
     * @return the builder object so that call can be chained.
     */
    this.subtitle = function (subtitle) {
        this.subtitle = subtitle 
        return this 
    } 
    /**
     * @param {string} title  The title of Rich Push notifications (Supported only on iOS 10 and above).
     * @return the builder object so that call can be chained.
     */
    this.title = function (title) {
        this.title = title 
        return this 
    } 
    /**
     * @param {string} attachmentUrl  The link to the iOS notifications media (video, audio, GIF, 
     * images - Supported only on iOS 10 and above).
     * @return the builder object so that call can be chained.
     */
    this.attachmentUrl = function (attachmentUrl) {
        this.attachmentUrl = attachmentUrl 
        return this 
    } 

    return this 
} 

/**
 * Gcm object which specifies the settings specific to the Android platform.
 */
function Gcm() {} 

/**
 * Builder to build optional settings for {@link Gcm} platform.
 * @return Gcm object,
 */
Gcm.prototype.builder = function builder() {
    /**
     * @param {boolean} delayWhileIdle  When this parameter is set to true, it indicates that the message should not 
     * be sent until the device becomes active.
     * @return the builder object so that call can be chained.
     */
    this.delayWhileIdle = function (delayWhileIdle) {
        this.delayWhileIdle = delayWhileIdle 
        return this 
    } 
    /**
     * @param {number} timeToLive  This parameter specifies how long (in seconds) the message should be kept in GCM storage
     * if the device is offline.
     * @return the builder object so that call can be chained.
     */
    this.timeToLive = function (timeToLive) {
        this.timeToLive = timeToLive 
        return this 
    } 
    /**
     * @param {string} collapseKey  This parameter identifies a group of messages.
     * @return the builder object so that call can be chained.
     */
    this.collapseKey = function (collapseKey) {
        this.collapseKey = collapseKey 
        return this 
    } 
    /**
     * @param {Object} payload  Custom JSON payload that will be sent as part of the notification message.
     * @return the builder object so that call can be chained.
     */
    this.payload = function (payload) {
        this.payload = payload 
        return this 
    } 
    /**
     * @param {boolean} sync  Device group messaging makes it possible for every app instance in a group to 
     * reflect the latest messaging state.
     * @return the builder object so that call can be chained.
     */
    this.sync = function (sync) {
        this.sync = sync 
        return this 
    } 
    /**
     * @param {string} sound  The sound file (on device) that will be attempted to play when the notification arrives on the device.
     * @return the builder object so that call can be chained.
     */
    this.sound = function (sound) {
        this.sound = sound 
        return this 
    } 
    /**
     * @param {string} interactiveCategory  The category identifier to be used for the interactive push notifications.
     * @return the builder object so that call can be chained.
     */
    this.interactiveCategory = function (interactiveCategory) {
        this.interactiveCategory = interactiveCategory 
        return this 
    } 
    /**
     * @param {string} priority  A string value that indicates the priority of this notification.
     * Allowed values are 'max', 'high', 'default', 'low' and 'min'. High/Max priority notifications along with 'sound' 
     * field may be used for Heads up notification in Android 5.0 or higher.sampleval='low'.
     * @return the builder object so that call can be chained.
     */
    this.priority = function (priority) {
        this.priority = priority 
        return this 
    } 
    /**
     * @param {Object} style  Options to specify for Android expandable notifications. The types of expandable notifications
     * are picture_notification, bigtext_notification, inbox_notification.
     * @return the builder object so that call can be chained.
     */
    this.style = function (style) {
        this.style = style 
        return this 
    } 
    /**
     * @param {string} visibility  private/public - Visibility of this notification, which affects how and when the
     * notifications are revealed on a secure locked screen.
     * @return the builder object so that call can be chained.
     */
    this.visibility = function (visibility) {
        this.visibility = visibility 
        return this 
    } 
    /**
     * @param {string} icon  Specify the name of the icon to be displayed for the notification.
     * Make sure the icon is already packaged with the client application.
     * @return the builder object so that call can be chained.
     */
    this.icon = function (icon) {
        this.icon = icon 
        return this 
    } 
    /**
     * @param {Object} lights  Allows setting the notification LED color on receiving push notification.
     * @return the builder object so that call can be chained.
     */
    this.lights = function (lights) {
        this.lights = lights 
        return this 
    } 

    return this 
} 

/**
 * FirefoxWeb object which specifies the settings specific to the FirefoxWeb platform.
 */
function FirefoxWeb() {} 

/**
 * Builder to build optional settings for {@link FirefoxWeb} platform.
 * @return FirefoxWeb object.
 */
FirefoxWeb.prototype.builder = function builder() {
    /**
     * @param {string} title  Specifies the title to be set for the WebPush Notification.
     * @return the builder object so that call can be chained.
     */
    this.title = function (title) {
        this.title = title 
        return this 
    } 
    /**
     * @param {string} iconUrl  The URL of the icon to be set for the WebPush Notification.
     * @return the builder object so that call can be chained.
     */
    this.iconUrl = function (iconUrl) {
        this.iconUrl = iconUrl 
        return this 
    } 
    /**
     * @param {number} timeToLive  This parameter specifies how long (in seconds) the message should be kept in GCM storage 
     * if the device is offline.
     * @return the builder object so that call can be chained.
     */
    this.timeToLive = function (timeToLive) {
        this.timeToLive = timeToLive 
        return this 
    } 
    /**
     * @param {Object} payload Custom JSON payload that will be sent as part of the notification message.
     * @return the builder object so that call can be chained.
     */
    this.payload = function (payload) {
        this.payload = payload 
        return this 
    } 

    return this 
} 

/**
 * ChromeWeb object which specifies the settings specific to the ChromeWeb browser.
 */
function ChromeWeb() {} 

/**
 * Builder to build optional settings for {@link ChromeWeb} platform.
 * @return ChromeWeb object.
 */
ChromeWeb.prototype.builder = function builder() {
    /**
     * @param {string} title  Specifies the title to be set for the WebPush Notification.
     * @return the builder object so that call can be chained.
     */
    this.title = function (title) {
        this.title = title 
        return this 
    } 
    /**
     * @param {string} iconUrl  The URL of the icon to be set for the WebPush Notification.
     * @return the builder object so that call can be chained.
     */
    this.iconUrl = function (iconUrl) {
        this.iconUrl = iconUrl 
        return this 
    } 
    /**
     * @param {number} timeToLive  his parameter specifies how long (in seconds) the message should 
     * be kept in GCM storage if the device is offline. 
     * @return the builder object so that call can be chained.
     */
    this.timeToLive = function (timeToLive) {
        this.timeToLive = timeToLive 
        return this 
    } 
    /**
     * @param {Object} payload  Custom JSON payload that will be sent as part of the notification message.
     * @return the builder object so that call can be chained.
     */
    this.payload = function (payload) {
        this.payload = payload 
        return this 
    } 

    return this 
} 

/**
 * ChromeAppExt object which specifies the settings specific to the ChromeAppExtension browser.
 */
function ChromeAppExt() {} 

/**
 * Builder to build optional settings for {@link ChromeAppExt} platform.
 * @return ChromeAppExt object.
 */
ChromeAppExt.prototype.builder = function builder() {
    /**
     * @param {string} collapseKey  This parameter identifies a group of messages.
     * @return the builder object so that call can be chained.
     */
    this.collapseKey = function (collapseKey) {
        this.collapseKey = collapseKey 
        return this 
    } 
    /**
     * @param {boolean} delayWhileIdle  When this parameter is set to true, it indicates that 
     * the message should not be sent until the device becomes active.  
     * @return the builder object so that call can be chained.
     */
    this.delayWhileIdle = function (delayWhileIdle) {
        this.delayWhileIdle = delayWhileIdle 
        return this 
    } 
    /**
     * @param {string} title  Specifies the title to be set for the WebPush Notification.
     * @return the builder object so that call can be chained.
     */
    this.title = function (title) {
        this.title = title 
        return this 
    } 
    /**
     * @param {string} iconUrl The URL of the icon to be set for the WebPush Notification.
     * @return the builder object so that call can be chained.
     */
    this.iconUrl = function (iconUrl) {
        this.iconUrl = iconUrl 
        return this 
    } 
    /**
     * @param {number} timeToLive This parameter specifies how long (in seconds) the message should 
     * be kept in GCM storage if the device is offline.
     * @return the builder object so that call can be chained.
     */
    this.timeToLive = function (timeToLive) {
        this.timeToLive = timeToLive 
        return this 
    } 
    /**
     * @param {Object} payload Custom JSON payload that will be sent as part of the notification message.
     * @return the builder object so that call can be chained.
     */
    this.payload = function (payload) {
        this.payload = payload 
        return this 
    } 

    return this 
} 

/**
 * SafariWeb object which specifies the settings specific to the SafariWeb browser.
 */
function SafariWeb() {} 

/**
 * Builder to build optional settings for {@link SafariWeb} platform.
 * @return SafariWeb object.
 */
SafariWeb.prototype.builder = function builder() {
    /**
     * @param {string} title  Specifies the title to be set for the Safari Push Notifications.
     * @return the builder object so that call can be chained.
     */
    this.title = function (title) {
        this.title = title 
        return this 
    } 
    /**
     * @param {string[]} urlArgs  The URL arguments that need to be used with this notification. 
     * This has to provided in the form of a JSON Array. ,
     * @return the builder object so that call can be chained.
     */
    this.urlArgs = function (urlArgs) {
        this.urlArgs = urlArgs 
        return this 
    } 
    /**
     * @param {string} action  The label of the action button.
     * @return the builder object so that call can be chained.
     */
    this.action = function (action) {
        this.action = action 
        return this 
    } 

    return this 

} 

/**
 * GcmStyle object.
 */
function GcmStyle() {} 

/**
 * Builder to build {@link GcmStyle}.
 * @return GcmStyle object.
 */
GcmStyle.prototype.builder = function builder() {
    /**
     * @param {string} type  Specifies the type of expandable notifications. The possible values are bigtext_notification,
     * picture_notification, inbox_notification.
     * @return the builder object so that call can be chained.
     */
    this.type = function (type) {
        this.type = type 
        return this 
    } 
    /**
     * @param {string} url  An URL from which the picture has to be obtained for the notification. 
     * Must be specified for picture_notification.
     * @return the builder object so that call can be chained.
     */
    this.url = function (url) {
        this.url = url 
        return this 
    } 
    /**
     * @param {string} title  Specifies the title of the notification. The title is displayed when the notification is expanded. 
     * Title must be specified for all three expandable notification.
     * @return the builder object so that call can be chained.
     */
    this.title = function (title) {
        this.title = title 
        return this 
    } 
    /**
     * @param {string} text The big text that needs to be displayed on expanding a bigtext_notification. 
     * Must be specified for bigtext_notification.
     * @return the builder object so that call can be chained.
     */
    this.text = function (text) {
        this.text = text 
        return this 
    } 
    /**
     * @param {string[]} lines  An array of strings that is to be displayed in inbox style for inbox_notification.
     * Must be specified for inbox_notification.
     * @return the builder object so that call can be chained.
     */
    this.lines = function (lines) {
        this.lines = lines 
        return this 
    } 

    return this 
} 

/**
 * GcmLights object.
 */
function GcmLights() {} 

/**
 * Builder to build {@link GcmLights}.
 * @return GcmLights object.
 */
GcmLights.prototype.builder = function builder() {
    /**
     * @param {string} ledArgb  The color of the led. The hardware will do its best approximation.
     * @return the builder object so that call can be chained.
     */
    this.ledArgb = function (ledArgb) {
        this.ledArgb = ledArgb 
        return this 
    } 
    /**
     * @param {number} ledOnMs  The number of milliseconds for the LED to be on while it's flashing. 
     * The hardware will do its best approximation.
     * @return the builder object so that call can be chained.
     */
    this.ledOnMs = function (ledOnMs) {
        this.ledOnMs = ledOnMs 
        return this 
    } 
    /**
     * @param {number} ledOffMs  The number of milliseconds for the LED to be off while it's flashing. 
     * The hardware will do its best approximation.
     * @return the builder object so that call can be chained.
     */
    this.ledOffMs = function (ledOffMs) {
        this.ledOffMs = ledOffMs 
        return this 
    } 

    return this 
} 

module.exports = {
    settings: Settings, gcmStyle: GcmStyle, gcmLights: GcmLights, target: Target, message: Message, apns: Apns,
    gcm: Gcm, firefoxWeb: FirefoxWeb, chromeWeb: ChromeWeb, chromeAppExt: ChromeAppExt, safariWeb: SafariWeb
}

