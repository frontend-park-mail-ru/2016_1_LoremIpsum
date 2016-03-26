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
          'user' : null,
          'request_error':null
        },
        initialize:function()
        {
            _.bindAll(this,'login_error', 'login_success');
        },
        login: function(login, password, success_cb, error_cb) {
            this.request_error=null;
            $.ajax({
                method: 'PUT',
                url: 'api/v1/session',
                data: {
                    'login': login,
                    'password': password
                },
                success: function(data){
                    this.request_error = null;
                    this.user = new UserModel(data['id'],'',login);
                    success_cb();
                }.bind(this),
                error:function(){
                    this.login_error();
                    error_cb();
                }.bind(this)
            });

        },
        logout: function(success,error) {
            this.request_error=null;
            $.ajax({
                method: 'DELETE',
                url: 'api/v1/session',
                success: function() {
                    this.user = null;
                    success();
                }.bind(this),
                error: function(){
                    error();
                }.bind(this)
            });
        },
        register: function(login, password, email, success,error) {
            this.request_error=null;
            $.ajax({
                method: 'PUT',
                url: 'api/v1/user',
                dataType: "json",
                success: function(data){
                    this.request_error = null;
                    this.user = new UserModel(data['id'],email,login);
                    success();
                }.bind(this),
                error:function() {
                    this.login_error();
                    error();
                },
                data: {
                    'login': login,
                    'password': password,
                    'email': email
                }
            });
        },
        is_authinficated:function(success,error){
            this.request_error=null;
            $.ajax({
                method: 'GET',
                url: 'api/v1/session',
                success: function () {
                    this.request_error = null;
                    success();
                }.bind(this),
                error: function () {
                    this.request_error = new ValidationError();
                    error();
                }.bind(this)
            });
        },
        login_success:function(data) {
            this.request_error = null;
            this.user = new UserModel (data['id']);
        },
        login_error:function() {
            this.request_error= new ValidationError('SERVER_ERROR',null);
        }


    });

    return new SessionModel();
});