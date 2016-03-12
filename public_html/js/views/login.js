define([
    'backbone',
    'tmpl/login',
    'jquery',
    'utils/data_validator'
], function(
    Backbone,
    tmpl,
    $,
    validate
){


    var PASSWORD_VALIDATE_OPTIONS={'required':true,
                                     'type':'password'};
    var EMAIL_VALIDATE_OPTIONS={'required':true,
                                   'type':'email'};
    var VALIDATED_FIELDS ={'email':EMAIL_VALIDATE_OPTIONS,
                           'password':PASSWORD_VALIDATE_OPTIONS};



    var LoginView = Backbone.View.extend({
        template: tmpl,
        events:
        {
            'submit':'submit_handler'
        },
        error_templates:
        {
            'Invalid':function(field_name)
            {
                return 'Invalid ' + field_name;
            },
            'Required':function(field_name)
            {
                return  field_name + ' is required';
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
            this.form = document.forms['login'];
            //$("#login__form").on('submit',this.submit_handler.bind(this));
        },
        hide: function () {
            $('#page').empty();
            //$("#login__form").off('click',this.submit_handler.bind(this));
        },
        submit_handler: function(event)
        {
            event.preventDefault();
            if(!this.error_message(validate(this.form,VALIDATED_FIELDS)))
            {
                //отправка формы
            }

        },
        error_message: function(validation_result)
        {
            if(validation_result)
            {
                var data = validation_result.data;
                var error_type = validation_result.type;
                $("#form__error-block").fadeIn()
                    .css('visibility', 'visible')
                    .text(this.error_templates[error_type](data));
                window.setTimeout(function(){
                    $("#form__error-block").fadeOut();
                }, 3000);
                return true;
            }

        }



    });

    return new LoginView();
});