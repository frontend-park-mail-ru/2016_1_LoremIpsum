/**
 * Created by danil on 12.03.16.
 */
define([
    'backbone',
    'models/validation_error',
    'models/user',
    'underscore'
], function(
    Backbone,
    ValidationError,
    UserModel,
    _
){


    var SessionModel = Backbone.Model.extend({
        defaults:
        {
          //'id':0,
          //'user' : new UserModel('','',''),
          'request_error':null
        },
        initialize:function()
        {
            this.user = new UserModel();
        },
        url:function(){
            return 'api/v1/session'
        },
        login: function(_login, _password, success_cb, error_cb) {
            this.request_error=null;
            this.save({},{
                 method:'PUT',
                 attrs:{'login':_login,'password':_password},
                 success:function(model,response){
                     this.request_error = null;
                     this.user.id = response['id'];
                     success_cb();
                 }.bind(this),
                 error:function(){
                     this.request_error= new ValidationError('SERVER_ERROR',null);
                     error_cb();
                 }.bind(this)
            });

        },
        logout: function(success_cb,error_cb) {
            this.request_error=null;
            this.destroy({
                 success:function(){
                     this.id = null;
                     this.user['id'] =null;
                     if(success_cb)
                        success_cb();
                 }.bind(this),
                 error:function(){
                     if(error_cb)
                        error_cb();
                 }
            });
        },
        register: function(_login, _password, _email, success_cb,error_cb) {
            this.request_error=null;
            this.save({},{
                attrs:{'login':_login,'password':_password, 'email':_email},
                url:'api/v1/user',
                success:function(model,response){
                    this.request_error = null;
                    this.login(_login,_password);
                    success_cb();
                }.bind(this),
                error:function(){
                    this.request_error= new ValidationError('SERVER_ERROR',null);
                    error_cb();
                }.bind(this)
            });
        },
        is_authinficated:function(success_cb,error_cb){
            this.fetch({
                 success:function(){
                     success_cb();
                 },
                 error:function(){
                     error_cb();
                 }
            });
        }
    });
    return new SessionModel();
});