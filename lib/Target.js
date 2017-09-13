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
 * Target object that specifies the recipient of the notification.
 */
var Target = {

    /**
     *  Encapsulates all data.
     */
    json: {},

    /**
     * @param {string[]} deviceIds  Send notification to the list of specified devices.
     * @return The Builder object for calls to be linked. 
     */
    deviceIds(deviceIds) {
        this.json.deviceIds = deviceIds;
        return this;
    },
    /**
     * @param {string[]} userIds  Send notification to the specified userIds.
     * @return The Builder object for calls to be linked. 
     */
    userIds(userIds) {
        this.json.userIds = userIds;
        return this;
    },
    /**
     * @param {string[]} platforms  Send notification to the devices of the specified platforms.
     *  'A' for apple (iOS) devices, 'G' for google (Android) devices, 'WEB_CHROME' for Chrome Web Browsers,
     *  'WEB_FIREFOX' for Firefox Web Browsers, 'WEB_SAFARI' for Safari Push Notifications and 'APPEXT_CHROME'
     *  for Chrome App Extension.
     * @return The Builder object for calls to be linked. 
     */
    platforms(platforms) {
        this.json.platforms = platforms;
        return this;
    },
    /**
     * @param {string[]} tagNames  Send notification to the devices that have subscribed to any of these tags.
     * @return The Builder object for calls to be linked. 
     */
    tagNames(tagNames) {
        this.json.tagNames = tagNames;
        return this;
    },
    /**
    * Builds Target values.
    */
    build() {
        return this.json;
    }
};


module.exports = Target;