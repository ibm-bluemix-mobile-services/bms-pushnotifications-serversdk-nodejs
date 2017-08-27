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
 * this.json object which specifies the additional properties that can be configured for the notification.
 */
var Settings = { 

        /**
         *  Encapsulates all data.
         */
        json: {},
        
        /**
         * @param {Object} apns  Apns object with optional this.json.
         * @return the builder object so that call can be chained.
         */
        apns (apns) {
            this.json.apns = apns;
            return this;
        },
        /**
         * @param {Object} gcm  Gcm object with optional this.json.
         * @return the builder object so that call can be chained.
         */
        gcm (gcm) {
            this.json.gcm = gcm;
            return this;
        },
        /**
         * @param {Object} safariWeb  SafariWeb object with optional this.json.
         * @return the builder object so that call can be chained.
         */
        safariWeb (safariWeb) {
            this.json.safariWeb = safariWeb;
            return this;
        },
        /**
         * @param {Object} chromeWeb  ChromeWeb object with optional this.json.
         * @return the builder object so that call can be chained.
         */
        chromeWeb (chromeWeb) {
            this.json.chromeWeb = chromeWeb;
            return this;
        },
        /**
         * @param {Object} chromeAppExt ChromeAppExt object with optional this.json.
         * @return the builder object so that call can be chained.
         */
        chromeAppExt (chromeAppExt) {
            this.json.chromeAppExt = chromeAppExt;
            return this;
        },
        /**
         * @param {Object} firefoxWeb FirefoxWeb object with optional this.json.
         * @return the builder object so that call can be chained.
         */
        firefoxWeb (firefoxWeb) {
            this.json.firefoxWeb = firefoxWeb;
            return this;
        },
        /**
        * Builds Settings values.
        */
        build () {
            return this.json;
        }
    };


module.exports =  Settings;