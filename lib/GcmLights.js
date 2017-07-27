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
 * GcmLights object.
 */
var GcmLights = { 
    
        /**
         *  Encapsulates all data.
         */
        json: {},

        /**
         * @param {string} ledArgb  The color of the led. The hardware will do its best approximation.
         * @return the builder object so that call can be chained.
         */
        ledArgb: function (ledArgb) {
            this.json.ledArgb = ledArgb;
            return this;
        },
        /**
         * @param {number} ledOnMs  The number of milliseconds for the LED to be on while it's flashing. 
         * The hardware will do its best approximation.
         * @return the builder object so that call can be chained.
         */
        ledOnMs: function (ledOnMs) {
            this.json.ledOnMs = ledOnMs;
            return this;
        },
        /**
         * @param {number} ledOffMs  The number of milliseconds for the LED to be off while it's flashing. 
         * The hardware will do its best approximation.
         * @return the builder object so that call can be chained.
         */
        ledOffMs: function (ledOffMs) {
            this.json.ledOffMs = ledOffMs;
            return this;
        },
        /**
         * Builds GcmLights values.
        */
        build: function () {
            return this.json;
        }
    };


module.exports =  GcmLights;