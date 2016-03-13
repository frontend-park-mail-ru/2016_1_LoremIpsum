define([
    'backbone',
    'tmpl/registration',
    'utils/data_validator',
    'utils/error_message',
    'models/session'
], function(
    Backbone,
    tmpl,
    validate,
    error_message,
    session
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


    var RegistrationView = Backbone.View.extend({
        template: tmpl,
        events:
        {
            'submit':'submit_handler'
        },
        error_templates:
        {
            'INVALID':function(field_name)
            {
                return 'Invalid ' + field_name;
            },
            'REQUIRED':function(field_name)
            {
                return  field_name + ' is required';
            },
            'MUST_MATCH':function()
            {
                return "Password don't match"
            },
            'SERVER_ERROR':function() {
                return "Some error on server";
            },
            'TO LONG':function(data){
                return data['field'] +" max length is " + data['max_length'];
            },
            'TO SHORT': function(data){
                return data['field'] +" min length is " + data['min_length'];
            }
        },

        initialize: function () {
            this.render();

        },
        render: function () {
            this.$el.html(this.template());
            return this;
        },
        show: function () {
            $('#page').html(this.$el);
            this.delegateEvents();
            this.form = document.forms['register'];
        },
        hide: function () {
            this.undelegateEvents();
            $('#page').empty();
        },
        submit_handler: function(event)
        {
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