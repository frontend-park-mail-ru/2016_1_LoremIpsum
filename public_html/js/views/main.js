define([
    'backbone',
    '../tmpl/main',
    'models/session'
], function(
    Backbone,
    tmpl,
    session
){
    var DELAY = 10;
    var MainView = Backbone.View.extend({

        events:
        {
            'click a':'hide',
            'click .js-logout':'logout'
        },
        template: tmpl,
        initialize: function () {
            this.render();
        },
        render: function (is_auth) {
            session.is_authinficated();
            window.setTimeout(function(){
                this.$el.html(this.template({'isAuth':!session.request_error}) );

            }.bind(this),DELAY);// Задержка нужна, так как ajax работает асинхронно
            return this;
        },
        show: function () {

            this.render();
            this.delegateEvents();
            $('#page').html(this.$el);
        },
        hide: function () {
            this.undelegateEvents();
            $('#page').empty();
        },
        logout: function(event){
            event.preventDefault();
            session.logout();
            window.setTimeout(function(){
                this.show();
            }.bind(this),DELAY);
        }

    });

    return new MainView();
});