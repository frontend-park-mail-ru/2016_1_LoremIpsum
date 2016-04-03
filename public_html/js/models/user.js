/**
 * Created by danil on 12.03.16.
 */
define([
    'backbone'
], function(
    Backbone

){

    var USER_URL = 'api/v1/user/';
    var UserModel = Backbone.Model.extend({
         url:function(){
            return (this.id)? (USER_URL+this.id) : USER_URL;
         },
         initialize:function(_id,_email, _nickname)
         {
             this.id=_id;
             this.email =_email;
             this.nickname=_nickname;
         }
    });

    return UserModel;
});