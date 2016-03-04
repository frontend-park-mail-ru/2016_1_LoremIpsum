define([
    'backbone',
    'tmpl/login'
], function(
    Backbone,
    tmpl
){


    var LoginView = Backbone.View.extend({

        template: tmpl,
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template());
            return this;

        },
        show: function () {
            $('#page').html(this.$el);
        },
        hide: function () {
            $('#page').empty();
        }

    });

    return new LoginView();
});