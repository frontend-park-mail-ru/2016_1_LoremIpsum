define([
    'backbone',
    'underscore'
], function(
    Backbone,
    _
){
    var on_page ={};
    var ViewManager = Backbone.View.extend({
        initialize: function (views) {
            this.views = {};
            _.bind(this.hide,this);
            _.each(views,function(view,name){
                this.add_view(view,name);
                this.listenTo(this.views[name],
                              'show',
                              this.hide);
            },this);
            //for(view_name in this.views){
            //    this.listenTo(this.views[view_name],
            //        'show',
            //        this.hide.bind(this));
            //}
        },

        add_view:function(view,name){
            this.views[name]= view;

            $('#page').append(view.el);
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
                console.log(view_name);
                this.views[view_name].show();
                //добавляем элемент на страницу, если его ещё там нет
                //if(!on_page[view_name]){
                //    console.log(this.views[view_name].$el.html());
                //    //this.views[view_name].$el.html('<div id="'+ view_name +  '"></div>');
                ////);
                //    this.views[view_name].$el.appendTo($('#page'));
                //    console.log($('#page').html());
                //    on_page[view_name]=true;
                //}
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
