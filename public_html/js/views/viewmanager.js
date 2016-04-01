define([
    'backbone',
    'underscore'
], function(
    Backbone,
    _
){

    var ViewManager = Backbone.View.extend({
        initialize: function (views) {
            this.views = views;
            _.bind(this.hide,this);
            for(view_name in this.views){
                this.listenTo(this.views[view_name],
                    'show',
                    this.hide.bind(this));
            }
        },
        show: function (view_name) {
            if(this.views[view_name]){
                this.views[view_name].show();
            }
            else{

            }
        },
        hide: function (event, view_name) {
            //Скрываем все вью, кроме того откуда пришло событие
            for(key in _.omit(this.views,view_name) ){
                this.views[key].hide();
            }
        }
    });
    return ViewManager;
});
