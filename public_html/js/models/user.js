/**
 * Created by danil on 12.03.16.
 */
define([
    'backbone'
], function(
    Backbone

){

    var UserModel = Backbone.Model.extend({
         initialize:function(_id,_email, _username)
         {
             this.id=_id;
             this.email =_email;
             this.username=_username;
         }
    });

    return UserModel;
});