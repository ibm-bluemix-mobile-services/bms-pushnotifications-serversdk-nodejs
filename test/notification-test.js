
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
          notification.setTarget(["device1", "device2"], [Notification.TargetPlatform.Apple, Notification.TargetPlatform.Google], ["tag1", "tag2"], ["user1", "user2"]);
          
          assert.equal(_.difference(notification.json.target.deviceIds, ["device1", "device2"]).length, 0);
          assert.equal(_.difference(notification.json.target.platforms, ["A", "G"]).length, 0);
          assert.equal(_.difference(notification.json.target.tagNames, ["tag1", "tag2"]).length, 0);
          assert.equal(_.difference(notification.json.target.userIds, ["user1", "user2"]).length, 0);
          
          assert.equal(_.difference(["device1", "device2"], notification.json.target.deviceIds).length, 0);
          assert.equal(_.difference(["A", "G"], notification.json.target.platforms).length, 0);
          assert.equal(_.difference(["tag1", "tag2"], notification.json.target.tagNames).length, 0);
          assert.equal(_.difference(["user1", "user2"], notification.json.target.userIds).length, 0);
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
          notification.setApnsSettings(1, "category", "iosActionKey", "sound.mp3", Notification.ApnsType.DEFAULT, {key: "value"});
          
          assert.equal(notification.json.settings.apns.badge, 1);
          assert.equal(notification.json.settings.apns.category, "category");
          assert.equal(notification.json.settings.apns.iosActionKey, "iosActionKey");
          assert.equal(notification.json.settings.apns.sound, "sound.mp3");
          assert.equal(notification.json.settings.apns.type, "DEFAULT");
          assert.equal(_.keys(notification.json.settings.apns.payload)[0], "key");
          assert.equal(notification.json.settings.apns.payload.key, "value");
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
          notification.setGcmSettings("collapseKey", true, "payload", Notification.GcmPriority.DEFAULT, "sound.mp3", 1.0);
          
          assert.equal(notification.json.settings.gcm.collapseKey, "collapseKey");
          assert.equal(notification.json.settings.gcm.delayWhileIdle, "true");
          assert.equal(notification.json.settings.gcm.payload, "payload");
          assert.equal(notification.json.settings.gcm.priority, "DEFAULT");
          assert.equal(notification.json.settings.gcm.sound, "sound.mp3");
          assert.equal(notification.json.settings.gcm.timeToLive, 1.0);
      });
      it('should not set json values when null is input', function() {
          var notification = new Notification('test');
          notification.setGcmSettings(null, null, null, null, null, null);
          
          assert.equal(_.isEmpty(notification.settings), true);
      });
  });
});