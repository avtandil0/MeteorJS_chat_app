import { Template } from 'meteor/templating';
import { my_messages } from '../api/messages.js';


import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    Meteor.subscribe('chat_Room');
    Meteor.subscribe('userStatus')
});


Template.body.helpers({
    messages(){
        return my_messages.find({});
    },
    onlineUser(){
        return Meteor.users.find({ _id: {$ne: Meteor.userId()}});   
    },
    onlineUserCount(){
        return Meteor.users.find({ _id: {$ne: Meteor.userId()}}).count();
    }
});

Template.body.events({
    'click #butt'(event) {
        event.preventDefault();
        var target=document.getElementById("text_area");
        const message = target.value;
        Meteor.call('chat_Room.insert',message);
        target.value='';
     },
   
});
 
 Template.input.events({
  'keydown #text_area'(event){
    if (event.keyCode == 13) {
        $("#butt").click();
        return false;
     }
  }
});

Template.message.rendered = function () {
    $( "#scroll_div" ).scrollTop(  20000 );
};

