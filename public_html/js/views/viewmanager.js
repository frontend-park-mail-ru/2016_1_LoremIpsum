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

        add_view:function(view,name){
            this.views[name]= view;
        },
        delete_view:function(name){
            delete this.views[name];
        },
        contain_view:function(name){
            return this.views.hasOwnProperty(name);
        },
        page_contain_view:function(name){
            return on_page[name]

        },
        show: function (view_name) {
            if(this.contain_view(view_name)){
                //if(on_page[view_name])
                    this.views[view_name].show();
               // else {
                //    $('#page').append(this.views[view_name]);
                //    on_page[view_name]=true;
                //}
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
