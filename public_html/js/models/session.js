/**
 * Created by danil on 12.03.16.
 */
define([
    'backbone',
    'models/validation_error'
], function(
    Backbone,
    ValidationError
){

    var SessionModel = Backbone.Model.extend({

        defaults:
        {
          'user' : null
        },
        login: function(email, password) {
            var result;
            $.ajax({
                method: 'POST',
                url: '/session',
                data: {
                    'email': email,
                    'password': password
                },
                success: function (data) {
                    this.user = new User (data[key],email);
                },
                error: function () {
                    result= new ValidationError('SERVER_ERROR','');
                }

            });
            return result;
        },
        logout: function() {
            $.ajax({
                method: 'DELETE',
                url: '/session',
                success: function() {
                    this.user = null;
                },
                error: function () {
                    //return 'SERVER_ERROR';
                }
            });
        },
        register: function(login, password, email) {
            $.ajax({
                method: 'POST',
                url: '/user',
                success: function () {
                    this.user = new User (data[key],email);
                },
                data: {
                    'login': login,
                    'password': password,
                    'email': email
                },
                error: function () {

                }
            });
        },
        is_authinficated:function(){
            $.ajax({
                method: 'GET',
                url: '/session',
                success: function () {
                    return true;
                },
                error: function () {
                    return false;
                }
            });
        }

    });

    return new SessionModel();
});