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

        template: tmpl(),
        initialize: function () {
            this.$el=$('#page');
        },
        render: function () {
            this.$el.html(tmpl());
            return this;

        },
        show: function () {
            this.render()
        },
        hide: function () {
            this.$el.empty()
        }

    });

    return new MainView();
});