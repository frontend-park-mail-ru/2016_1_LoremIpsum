/**
 * Created by danil on 12.03.16.
 */
define([
    'backbone',
    'models/validation_error',
    'underscore'
], function(
    Backbone,
    ValidationError,
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
            _.bindAll(this,'login_error');
        }
        ,
        login: function(email, password) {

            $.ajax({
                method: 'POST',
                url: '/session',
                data: {
                    'email': email,
                    'password': password
                },
                success: this.login_success,
                error:this.login_error
            });

        },
        logout: function() {
            $.ajax({
                method: 'DELETE',
                url: '/session',
                success: function() {
                    this.user = null;
                }
            });
        },
        register: function(login, password, email) {
            $.ajax({
                method: 'POST',
                url: '/user',
                success: this.login_success,
                error:this.login_error,
                data: {
                    'login': login,
                    'password': password,
                    'email': email
                }
            });
        },
        is_authinficated:function(){
            $.ajax({
                method: 'GET',
                url: '/session',
                success: function () {
                    this.request_error = null;
                },
                error: function () {
                    this.request_error = new ValidationError();
                }
            });
        },
        login_success:function()
        {
            this.request_error = null;
            this.user = new User (data['id'],email);
        },
        login_error:function()
        {
            this.request_error= new ValidationError('SERVER_ERROR',null);
        }

    });

    return new SessionModel();
});