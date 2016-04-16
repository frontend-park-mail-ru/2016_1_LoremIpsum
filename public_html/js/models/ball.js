define([
    'backbone'
], function(
    Backbone
){

    var BallModel = Backbone.Model.extend({
        initialize: function()
        {

          this.x=0;
          this.y=0;
          this.vx=4;
          this.vy=-2;
          this.ay=0.99;
          this.radius=4;
          this.color='rgba(255,255,255,0.7)';
          //Backbone.Model.apply(this, arguments);

        },
        //Верх,низ, левая и правая части шара
        top:function()
        {
            return (this.y - this.radius);
        },
        bottom:function()
        {
            return (this.y + this.radius);
        },
        left:function()
        {
            return (this.x - this.radius);
        },
        right:function()
        {
            return (this.x + this.radius);
        }
    });

    return BallModel;
});