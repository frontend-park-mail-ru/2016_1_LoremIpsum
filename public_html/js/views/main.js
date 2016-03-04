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

        //el:'#page',
        events:
        {
            'click a':'hide'
        },
        template: tmpl(),
        initialize: function () {
            //this.el='#page';
            this.render();
        },
        render: function () {
            this.$el.html(tmpl());

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