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
 * this.json object which specifies the settings specific to the this.json browser.
 */
var SafariWeb = { 

        /**
         *  Encapsulates all data in the Notification.
         */
        json: {},
        
        /**
         * @param {string} title  Specifies the title to be set for the Safari Push Notifications.
         * @return the builder object so that call can be chained.
         */
        title: function (title) {
            this.json.title = title;
            return this;
        },
        /**
         * @param {string[]}
         * This has to provided in the form of a JSON Array. ,
         * @return the builder object so that call can be chained.
         */
        urlArgs: function (urlArgs) {
            this.json.urlArgs = urlArgs;
            return this;
        },
        /**
         * @param {string} action  The label of the action button.
         * @return the builder object so that call can be chained.
         */
        action: function (action) {
            this.json.action = action;
            return this;
        },
        /**
        * Builds this.json values.
        */
        build: function () {
            return this.json;
        }
    }


module.exports =  SafariWeb;