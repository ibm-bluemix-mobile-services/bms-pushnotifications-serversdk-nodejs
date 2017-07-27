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
 * FirefoxWeb object which specifies the settings specific to the FirefoxWeb platform.
 */
var FirefoxWeb = {
        
        /**
         *  Encapsulates all data.
         */
        json: {},

        /**
         * @param {string} title  Specifies the title to be set for the WebPush Notification.
         * @return the builder object so that call can be chained.
         */
        title: function (title) {
            this.json.title = title;
            return this;
        },
        /**
         * @param {string} iconUrl  The URL of the icon to be set for the WebPush Notification.
         * @return the builder object so that call can be chained.
         */
        iconUrl: function (iconUrl) {
            this.json.iconUrl = iconUrl;
            return this;
        },
        /**
         * @param {number} timeToLive  This parameter specifies how long (in seconds) the message should be kept in GCM storage 
         * if the device is offline.
         * @return the builder object so that call can be chained.
         */
        timeToLive: function (timeToLive) {
            this.json.timeToLive = timeToLive;
            return this;
        },
        /**
         * @param {Object} payload Custom JSON payload that will be sent as part of the notification message.
         * @return the builder object so that call can be chained.
         */
        payload: function (payload) {
            this.json.payload = payload;
            return this;
        },
        /**
        * Builds FirefoxWeb values.
        */
        build: function () {
            return this.json;
        }    
    };

module.exports =  FirefoxWeb;
