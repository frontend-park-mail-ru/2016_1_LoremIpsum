define([
    'backbone',
    '../tmpl/main',
    'jquery'
], function(
    Backbone,
    tmpl,
    jquery
){
    var MainView = Backbone.View.extend({

        events:
        {
            'click a':'hide'
        },
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

    return new MainView();
});