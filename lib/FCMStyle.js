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
 * FCMStyle object.
 */
var FCMStyle = {

    /**
    *  Encapsulates all data.
    */
    json: {},

    /**
     * @param {string} type  Specifies the type of expandable notifications. The possible values are bigtext_notification,
     * picture_notification, inbox_notification.
     * @return The Builder object for calls to be linked. 
     */
    type(type) {
        this.json.type = type;
        return this;
    },
    /**
     * @param {string} url  An URL from which the picture has to be obtained for the notification. 
     * Must be specified for picture_notification.
     * @return The Builder object for calls to be linked. 
     */
    url(url) {
        this.json.url = url;
        return this;
    },
    /**
     * @param {string} title  Specifies the title of the notification. The title is displayed when the notification is expanded. 
     * Title must be specified for all three expandable notification.
     * @return The Builder object for calls to be linked. 
     */
    title(title) {
        this.json.title = title;
        return this;
    },
    /**
     * @param {string} text The big text that needs to be displayed on expanding a bigtext_notification. 
     * Must be specified for bigtext_notification.
     * @return The Builder object for calls to be linked. 
     */
    text(text) {
        this.json.text = text;
        return this;
    },
    /**
     * @param {string[]} lines  An array of strings that is to be displayed in inbox style for inbox_notification.
     * Must be specified for inbox_notification.
     * @return The Builder object for calls to be linked. 
     */
    lines(lines) {
        this.json.lines = lines;
        return this;
    },
    /**
    * Builds FCMStyle values.
    */
    build() {
        return this.json;
    }
};

module.exports = FCMStyle;
