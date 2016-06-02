
var Notification = require('../lib/Notification.js');
var assert = require('chai').assert;
var _ = require('underscore');


describe('Notification', function() {
  
  describe('initializer', function () {
    it('should set up json with required data', function () {
        var notification = new Notification('test');
        
        assert.equal(notification.json.message.alert, 'test');
    });
  });
  
  describe('setUrl', function() {
      it('should set url when supplied', function() {
         var notification = new Notification('test'); 
         notification.setUrl('url');
         
         assert.equal(notification.json.message.url, 'url');
      });
      it('should not set url when null is input', function() {
         var notification = new Notification('test');
         notification.setUrl(null);
         
         assert.equal(notification.json.message.hasOwnProperty('url'), false);
      });
  });
  
  describe('setTarget', function() {
      it('should set all json values correctly', function() {
          var notification = new Notification('test');
          notification.setTarget(0, 1, 2, 3);
          
          assert.equal(notification.json.target.deviceIds, 0);
          assert.equal(notification.json.target.platforms, 1);
          assert.equal(notification.json.target.tagNames, 2);
          assert.equal(notification.json.target.userIds, 3);
      });
      it('should not set json values when null is input', function() {
          var notification = new Notification('test');
          notification.setTarget(null, null, null, null);
          
          assert.equal(_.isEmpty(notification.target), true);
      });
  });
  
  describe('setApnsSettings', function() {
      it('should set all json values correctly', function() {
          var notification = new Notification('test');
          notification.setApnsSettings(0, 1, 2, 3, 4, 5);
          
          assert.equal(notification.json.settings.apns.badge, 0);
          assert.equal(notification.json.settings.apns.category, 1);
          assert.equal(notification.json.settings.apns.iosActionKey, 2);
          assert.equal(notification.json.settings.apns.sound, 3);
          assert.equal(notification.json.settings.apns.type, 4);
          assert.equal(notification.json.settings.apns.payload, 5);
      });
      it('should not set json values when null is input', function() {
          var notification = new Notification('test');
          notification.setApnsSettings(null, null, null, null, null, null);
          
          assert.equal(_.isEmpty(notification.settings), true);
      });
  });
  
  describe('setGcmSettings', function() {
      it('should set all json values correctly', function() {
          var notification = new Notification('test');
          notification.setGcmSettings(0, 1, 2, 3, 4, 5);
          
          assert.equal(notification.json.settings.gcm.collapseKey, 0);
          assert.equal(notification.json.settings.gcm.delayWhileIdle, 1);
          assert.equal(notification.json.settings.gcm.payload, 2);
          assert.equal(notification.json.settings.gcm.priority, 3);
          assert.equal(notification.json.settings.gcm.sound, 4);
          assert.equal(notification.json.settings.gcm.timeToLive, 5);
      });
      it('should not set json values when null is input', function() {
          var notification = new Notification('test');
          notification.setGcmSettings(null, null, null, null, null, null);
          
          assert.equal(_.isEmpty(notification.settings), true);
      });
  });
});