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
 * Gcm object which specifies the settings specific to the Android platform.
 */
var Gcm = { 

        /**
         *  Encapsulates all data.
         */
        json: {},

        /**
         * @param {boolean} delayWhileIdle  When this parameter is set to true, it indicates that the message should not 
         * be sent until the device becomes active.
         * @return the builder object so that call can be chained.
         */
        delayWhileIdle (delayWhileIdle) {
            this.json.delayWhileIdle = delayWhileIdle;
            return this;
        },
        /**
         * @param {number} timeToLive  This parameter specifies how long (in seconds) the message should be kept in GCM storage
         * if the device is offline.
         * @return the builder object so that call can be chained.
         */
        timeToLive (timeToLive) {
            this.json.timeToLive = timeToLive;
            return this;
        },
        /**
         * @param {string} collapseKey  This parameter identifies a group of messages.
         * @return the builder object so that call can be chained.
         */
        collapseKey (collapseKey) {
            this.json.collapseKey = collapseKey;
            return this;
        },
        /**
         * @param {Object} payload  Custom JSON payload that will be sent as part of the notification message.
         * @return the builder object so that call can be chained.
         */
        payload (payload) {
            this.json.payload = payload;
            return this;
        },
        /**
         * @param {boolean} sync  Device group messaging makes it possible for every app instance in a group to 
         * reflect the latest messaging state.
         * @return the builder object so that call can be chained.
         */
        sync (sync) {
            this.json.sync = sync;
            return this;
        },
        /**
         * @param {string} sound  The sound file (on device) that will be attempted to play when the notification arrives on the device.
         * @return the builder object so that call can be chained.
         */
        sound (sound) {
            this.json.sound = sound;
            return this;
        },
        /**
         * @param {string} interactiveCategory  The category identifier to be used for the interactive push notifications.
         * @return the builder object so that call can be chained.
         */
        interactiveCategory (interactiveCategory) {
            this.json.interactiveCategory = interactiveCategory;
            return this;
        },
        /**
         * @param {string} priority  A string value that indicates the priority of this notification.
         * Allowed values are 'max', 'high', 'default', 'low' and 'min'. High/Max priority notifications along with 'sound' 
         * field may be used for Heads up notification in Android 5.0 or higher.sampleval='low'.
         * @return the builder object so that call can be chained.
         */
        priority (priority) {
            this.json.priority = priority;
            return this;
        },
        /**
         * @param {Object} style  Options to specify for Android expandable notifications. The types of expandable notifications
         * are picture_notification, bigtext_notification, inbox_notification.
         * @return the builder object so that call can be chained.
         */
        style (style) {
            this.json.style = style;
            return this;
        },
        /**
         * @param {string} visibility  private/public - Visibility of this notification, which affects how and when the
         * notifications are revealed on a secure locked screen.
         * @return the builder object so that call can be chained.
         */
        visibility (visibility) {
            this.json.visibility = visibility;
            return this;
        },
        /**
         * @param {string} icon  Specify the name of the icon to be displayed for the notification.
         * Make sure the icon is already packaged with the client application.
         * @return the builder object so that call can be chained.
         */
        icon (icon) {
            this.json.icon = icon;
            return this;
        },
        /**
         * @param {Object} lights  Allows setting the notification LED color on receiving push notification.
         * @return the builder object so that call can be chained.
         */
        lights (lights) {
            this.json.lights = lights;
            return this;
        },
        
        /**
        * Builds Gcm values.
        */
        build () {
            return this.json;       
        }
    };


module.exports =  Gcm;
