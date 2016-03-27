/**
 * Created by danil on 16.03.16.
 */
define([
    'backbone'
], function(
    Backbone
){

    var BaseView = Backbone.View.extend({
        initialize: function () {
        },
        render: function (data) {
            this.$el.html(this.template(data));
            return this;
        },
        show: function () {
            this.trigger('show');
            this.render();
            this.$el.css('visibility','visible');
            this.delegateEvents();

        },
        hide: function () {
            this.$el.css('visibility','hidden');
            this.undelegateEvents();
        }
    });
    return BaseView;
});
