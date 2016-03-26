define([
    'backbone',
    '../tmpl/main',
    'models/session',
    'views/base',
    'underscore'
], function(
    Backbone,
    tmpl,
    session,
    BaseView,
    _
){
    var MainView = BaseView.extend({
        el:'#main',
        events: {
            'click a':'hide'
        },
        template: tmpl,
        initialize: function () {
            BaseView.prototype.initialize.call(this);
            _.bindAll(this,'is_authinficated','not_authinficated');
        },
        render: function (is_auth) {
            this.$el.html(this.template({'isAuth':is_auth}) );
            return this;
        },
        is_authinficated:function(){
          this.render(true);
        },
        not_authinficated:function(){
            this.render(false);
        },
        show: function () {
            BaseView.prototype.show.call(this);
            session.is_authinficated(this.is_authinficated,
                                     this.not_authinficated);
        },
        hide: function () {
            BaseView.prototype.hide.call(this);
        }
    });
    return new MainView();
});