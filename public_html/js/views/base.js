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
            this.is_rendered = true;
            return this;
        },
        show: function () {
            this.trigger('show', {},{'view_name':this.name});
            if(!this.is_rendered) {
                this.render();
            }
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
