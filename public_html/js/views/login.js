define([
    'backbone',
    'tmpl/login',
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
    var PASSWORD_VALIDATE_OPTIONS={'required':true};
    var USERNAME_VALIDATE_OPTIONS={'required':true};
    var VALIDATED_FIELDS ={'username':USERNAME_VALIDATE_OPTIONS,
                           'password':PASSWORD_VALIDATE_OPTIONS};
    var DELAY =10;


    var LoginView = BaseView.extend({
        el:'#login',
        template: tmpl,
        events: {
            'submit':'submit_handler'
        },
        error_templates: {
            'INVALID':function(field_name) {
                return 'Invalid ' + field_name;
            },
            'REQUIRED':function(data) {
                return  data['field_name'] + ' is required';
            },
            'SERVER_ERROR':function() {
                return "Invalid email or password";
            }
        },
        initialize: function () {
            BaseView.prototype.initialize.call(this);
        },
        render: function () {
            BaseView.prototype.render.call(this);
        },
        show: function () {
            BaseView.prototype.show .call(this);
            this.form = document.forms['login'];
        },
        hide: function () {
            BaseView.prototype.hide.call(this);
        },
        submit_handler: function(event)
        {
            event.preventDefault();
            if(!error_message({'validation_result':validate(this.form,VALIDATED_FIELDS),
                               'error_templates':this.error_templates})) {
                session.login(this.form.elements['username'].value,
                    this.form.elements['password'].value);
                window.setTimeout(function () {
                    var login_fail = session.request_error;
                    if (!error_message({
                            'validation_result': login_fail,
                            'error_templates': this.error_templates
                        })) {
                        this.hide();
                        Backbone.history.navigate('main', true);
                    }
                }.bind(this), DELAY);// Задержка нужна, так как ajax работает асинхронно
            }
        }
    });
    return new LoginView();
});