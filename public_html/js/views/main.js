define([
    'backbone',
    '../tmpl/main',
    'models/session',
    'views/base'
], function(
    Backbone,
    tmpl,
    session,
    BaseView
){
    var DELAY = 10;
    var MainView = BaseView.extend({
        el:'#main',
        events: {
            'click a':'hide'
        },
        template: tmpl,
        initialize: function () {
            BaseView.prototype.initialize.call(this);
        },
        render: function () {
            session.is_authinficated();
            window.setTimeout(function(){
                this.$el.html(this.template({'isAuth':!session.request_error}) );
                console.log(this.$el.html());
            }.bind(this),DELAY);// Задержка нужна, так как ajax работает асинхронно
            return this;
        },
        show: function () {
            BaseView.prototype.show.call(this);
        },
        hide: function () {
            BaseView.prototype.hide.call(this);
        }
    });
    return new MainView();
});