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
 * this.json object that specifies the settings specific to the this.json browser.
 */
var SafariWeb = {

    /**
     *  Encapsulates all data.
     */
    json: {},

    /**
     * @param {string} title  Specifies the title to be set for the Safari Push Notifications.
     * @return The Builder object for calls to be linked. 
     */
    title(title) {
        this.json.title = title;
        return this;
    },
    /**
     * @param {string[]}
     * This has to provided in the form of a JSON Array. ,
     * @return The Builder object for calls to be linked. 
     */
    urlArgs(urlArgs) {
        this.json.urlArgs = urlArgs;
        return this;
    },
    /**
     * @param {string} action  The label of the action button.
     * @return The Builder object for calls to be linked. 
     */
    action(action) {
        this.json.action = action;
        return this;
    },
    /**
    * Builds SafariWebs values.
    */
    build() {
        return this.json;
    }
};


module.exports = SafariWeb;