/*
 *     Copyright 2017 IBM Corp.
 *     Licensed under the Apache License, Version 2.0 (the "License");
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
 * Apns object that specifies the iOS platform settings.
 */
var APNs = {

    /**
     *  Encapsulates all data.
     */
    json: {},

    /**
     * @param {number} badge  The number to display as the badge of the application icon.
     * @return The Builder object for calls to be linked. 
     */
    badge(badge) {
        this.json.badge = badge;
        return this;
    },
    /**
     * @param {string} interactiveCategory  The category identifier to be used for the interactive push notifications.
     * @return The Builder object for calls to be linked. 
     */
    interactiveCategory(interactiveCategory) {
        this.json.interactiveCategory = interactiveCategory;
        return this;
    },
    /**
     * @param {string} sound  The name of the sound file in the application bundle.
     *  The sound of this file is played as an alert.
     * @return The Builder object for calls to be linked. 
     */
    sound(sound) {
        this.json.sound = sound;
        return this;
    },
    /**
     * @param {string} iosActionKey  The title for the Action key.
     * @return The Builder object for calls to be linked. 
     */
    iosActionKey(iosActionKey) {
        this.json.iosActionKey = iosActionKey;
        return this;
    },
    /**
     * @param {Object} payload  Custom JSON payload that will be sent as part of the notification message.
     * @return The Builder object for calls to be linked. 
     */
    payload(payload) {
        this.json.payload = payload;
        return this;
    },
    /**
     * @param {string} type  ['DEFAULT', 'MIXED', 'SILENT'].
     * @return The Builder object for calls to be linked. 
     */
    type(type) {
        this.json.type = type;
        return this;
    },
    /**
     * @param {string} titleLocKey  The key to a title string in the Localizable.strings file for the current localization.
     *  The key string can be formatted with %@ and %n$@ specifiers to take the variables specified in the titleLocArgs array. 
     * @return The Builder object for calls to be linked. 
     */
    titleLocKey(titleLocKey) {
        this.json.titleLocKey = titleLocKey;
        return this;
    },
    /**
     * @param {string} locKey  A key to an alert-message string in a Localizable.strings file for the current localization 
     * (which is set by the user’s language preference). The key string can be formatted with %@ and %n$@ specifiers to take 
     * the variables specified in the locArgs array.
     * @return The Builder object for calls to be linked. 
     */
    locKey(locKey) {
        this.json.locKey = locKey;
        return this;
    },
    /**
     * @param {string} launchImage  The filename of an image file in the app bundle, with or without the filename extension. 
     * The image is used as the launch image when users tap the action button or move the action slider.
     * @return The Builder object for calls to be linked. 
     */
    launchImage(launchImage) {
        this.json.launchImage = launchImage;
        return this;
    },
    /**
     * @param {string[]} titleLocArgs  Variable string values to appear in place of the format specifiers in title-loc-key.
     * @return The Builder object for calls to be linked. 
     */
    titleLocArgs(titleLocArgs) {
        this.json.titleLocArgs = titleLocArgs;
        return this;
    },
    /**
     * @param {string[]} locArgs  Variable string values to appear in place of the format specifiers in locKey.
     * @return The Builder object for calls to be linked. 
     */
    locArgs(locArgs) {
        this.json.locArgs = locArgs;
        return this;
    },
    /**
     * @param {string} subtitle  The subtitle of the Rich Notifications. (Supported on iOS 10 or later).
     * @return The Builder object for calls to be linked. 
     */
    subtitle(subtitle) {
        this.json.subtitle = subtitle;
        return this;
    },
    /**
     * @param {string} title    The title of Rich Push notifications (Supported on iOS 10 or later).
     * @return The Builder object for calls to be linked. 
     */
    title(title) {
        this.json.title = title;
        return this;
    },
    /**
     * @param {string} attachmentUrl  The link to the iOS notifications media (video, audio, GIF, 
     * images - Supported only on iOS 10 and above).
     * @return The Builder object for calls to be linked. 
     */
    attachmentUrl(attachmentUrl) {
        this.json.attachmentUrl = attachmentUrl;
        return this;
    },

    /**
    * Builds Apns values.
    */
    build() {
        return this.json;
    }
};


module.exports = APNs;