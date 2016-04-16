define([
    'backbone'
], function(
    Backbone
){

    var PlatformModel = Backbone.Model.extend({
        initialize: function()
        {
            this.color = "rgba(150,100,150,0.7)";
            this.width =  50;
            this.height = 5;
            this.vx = 5;
            this.direction = 0;
            this.x=0;
            this.y=0;

        },
        go_left:function()
        {
            this.direction=-1;
        },
        go_right:function()
        {
          this.direction=1;
        },
        stop: function()
        {
           this.direction=0;
        },
        next_position:function()
        {
           return (this.x + this.direction*this.vx);
        },
        left:function()
        {
            return this.x;
        },
        right:function()
        {
           return (this.x+this.width);
        }
    });

    return PlatformModel;
});