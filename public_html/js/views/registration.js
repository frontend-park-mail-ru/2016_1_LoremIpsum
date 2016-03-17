define([
    'backbone',
    'tmpl/registration',
    'utils/data_validator',
    'utils/error_message',
    'models/session',
    'views/base'
], function(
    Backbone,
    tmpl,
    validate,
    error_message,
    session,
    BaseView
){
    var PASSWORD_VALIDATE_OPTIONS={'required':true,
        'type':'password', 'min_length':5};
    var EMAIL_VALIDATE_OPTIONS={'required':true,
        'type':'email' };
    var USERNAME_OPTIONS = {'required':true,'type':'username', 'max_length':20};
    var VALIDATED_FIELDS ={'email':EMAIL_VALIDATE_OPTIONS,
        'password':PASSWORD_VALIDATE_OPTIONS, 'username':USERNAME_OPTIONS};
    var MUST_MATCH ={'password':'password2'};
    var DELAY =10;


    var RegistrationView = BaseView.extend({
        el:'#registration',
        template: tmpl,
        events: {
            'submit':'submit_handler'
        },
        error_templates: {//шаблоны соощений об ошибках
            'INVALID':function(data) {
                return 'Invalid ' + data['field_name'];
            },
            'REQUIRED':function(data) {
                return  data['field_name'] + ' is required';
            },
            'MUST_MATCH':function() {
                return "Password don't match"
            },
            'SERVER_ERROR':function() {
                return "Some error on server";
            },
            'TOO LONG':function(data){
                return data['field'] +" max length is " + data['max_length'];
            },
            'TOO SHORT': function(data){
                return data['field'] +" min length is " + data['min_length'];
            }
        },
        initialize: function () {
            BaseView.prototype.initialize.call(this);
        },
        render: function () {
            BaseView.prototype.render.call(this);
        },
        show: function () {
            BaseView.prototype.show.call(this);
            if(!this.form)
                this.form = this.$('.registration__form')[0];
            console.log(this.form);
        },
        hide: function () {
            BaseView.prototype.hide.call(this);
        },
        submit_handler: function(event) {
            event.preventDefault();
            if(!error_message({'validation_result':validate(this.form,VALIDATED_FIELDS, MUST_MATCH),
                                                           'error_templates':this.error_templates}))
            {
                session.register(this.form.elements['username'].value,
                                 this.form.elements['password'].value,
                                 this.form.elements['email'].value);
                window.setTimeout(function(){
                    var login_fail= session.request_error;
                    if(!error_message({'validation_result':login_fail,
                            'error_templates':this.error_templates})){
                        this.hide();
                        Backbone.history.navigate('main',true);
                    }
                }.bind(this),DELAY);// Задержка нужна, так как ajax работает асинхронно
            }
        }
    });
    return new RegistrationView();
});