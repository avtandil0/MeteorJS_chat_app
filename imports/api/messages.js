import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 

export const my_messages = new Mongo.Collection('chat_Room');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('chat_Room', function tasksPublication() {
      return my_messages.find();
  });
  Meteor.publish("userStatus", function() {
      return Meteor.users.find({ "status.online": true });
});
}


Meteor.methods({
    'chat_Room.insert'(text){
        check(text,String);
        if(!this.userId){
            throw new Meteor.error('not-autorized');
        }
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        var full_time = h+":"+m+":"+s;
        my_messages.insert({
            text,
            time: full_time,
            owner: Meteor.userId(),
            username: Meteor.users.findOne(this.userId).username,
        });
    },
});