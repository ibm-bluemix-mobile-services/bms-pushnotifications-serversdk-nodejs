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
 * Message object that specifies the content of the notification.
 */
var Message = {

    /**
     *  Encapsulates all data.
     */
    json: {},

    /**
     * @param {string} alert  The notification message to be shown to the user.
     * @return The Builder object for calls to be linked. 
     */
    alert(alert) {
        this.json.alert = alert;
        return this;
    },
    /**
     * @param {string} url  An optional URL that can be sent along with the alert.
     * @return The Builder object for calls to be linked. 
     */
    url(url) {
        this.json.url = url;
        return this;
    },
    /**
     * Builds message values.
     */
    build() {
        return this.json;
    }
};


module.exports = Message;