import { Template } from 'meteor/templating';
import { my_messages } from '../api/messages.js';

import './body.html';

Template.body.helpers({
    messages(){
        return my_messages.find({});
    },
});

Template.body.events({
    'click #butt'(event) {
        event.preventDefault();
        var target=document.getElementById("text_area");
        const message = target.value;
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        var full_time = h+":"+m+":"+s;
        my_messages.insert({
            name,
            message,
            time: full_time,
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });
        console.log(Meteor.user().mail);
        target.value='';
     },
   
});
 

Meteor.startup(function() {
    $( "scroll_div" ).scrollTop( 300 );

});