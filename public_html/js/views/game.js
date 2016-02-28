define([
    'backbone',
    'tmpl/game',
    'models/ball',
    'models/platform',
    'underscore'
], function(
    Backbone,
    tmpl,
    BallModel,
    PlatformModel
){

    var PLATFORM_OFFSET_FACTOR=2;
    var ARROW_LEFT=37;
    var BALL_DEFAULT_VY =-2;
    var BALL_DEFAULT_VX = 3;
    var ARROW_RIGHT=39;
    var ARROW_DOWN=40;
    var GameView = Backbone.View.extend({

        template: tmpl(),
        events:{
            'click .js-back':'hide',
            'keypress':'keydown_handler'
        },
        initialize: function () {
            this.$el=$('#page');
            //Underscore.bindAll(this, 'on_keypress');
           // $(document).bind('keypress', this.on_keypress);
            $(document).on('keydown',this.keydown_handler.bind(this));
            $(document).on('keyup',this.keyup_handler.bind(this));
            this.ball = new BallModel();
            this.platform = new PlatformModel();
        },
        render: function () {
            this.$el.html(tmpl);
           //
            this.canvas = document.getElementById('game__canvas');
            this.contex = this.canvas.getContext('2d');
            //console.log(this.contex);
            this.reset_ball()

            this.platform.x= this.canvas.width/2 - this.platform.width/2;
            this.platform.y= this.canvas.height -
                  PLATFORM_OFFSET_FACTOR*this.platform.height;
            console.log(this.platform.y);
            console.log(this.canvas.height);

            this.draw();

        },
        show: function () {
            this.render();
            //console.log(this.ball )

        },
        hide: function () {
            window.cancelAnimationFrame(this.animationID);
            $(document).off('keyup');
            $(document).off('keydown');
            this.$el.empty();
        },
        keydown_handler:function(event)
        {
            //alert('Event!' + event.keyCode);
            if(event.keyCode == ARROW_LEFT)
            {
                this.platform.go_left();
            }
            else if(event.keyCode == ARROW_RIGHT)
            {
                this.platform.go_right();
            }
            else if(event.keyCode == ARROW_DOWN)
            {
                this.platform.stop();
            }
        },
        keyup_handler:function(event)
        {
            this.platform.stop();
        },
        move_ball:function()
        {
            this.ball.x+=this.ball.vx;
            this.ball.y+=this.ball.vy;
            this.check_colisions();
        },
        move_platform:function()
        {
            var next_pos = this.platform.next_position();
            if (next_pos >= 0 &&
                (next_pos+this.platform.width) <=this.canvas.width )
            {
                this.platform.x=next_pos;
            }
        },
        check_colisions:function()
        {
            if( this.ball.right()+this.ball.vx>this.canvas.width ||
                this.ball.left()+this.ball.vx<0)
            {
                this.ball.vx *= -1;
            }
            if(this.ball.top() +this.ball.vy < 0) //||
                //(this.ball.y + this.ball.radius)+this.ball.vy > this.canvas.height )
            {
                this.ball.vy *= -1;
            }
            else if(this.ball.bottom() >= (this.platform.y) &&
                (this.ball.top()+this.ball.vy<this.canvas.height))
            {
                if(this.ball.left()>=this.platform.left() &&
                    this.ball.right()<=(this.platform.right()))
                {
                    this.ball.vy*= -1;
                    this.ball.vx = 10*(this.ball.x - (this.platform.x + this.platform.width/2))/this.platform.width;
                }
                else
                {
                    //alert('You lose');
                    this.reset_ball();
                    //this.hide();
                    //Backbone.history.navigate('main',true);
                }
            }

        },
        draw_ball:function ()
        {
            this.contex.fillStyle = this.ball.color;
            this.contex.beginPath();
            this.contex.arc(this.ball.x, this.ball.y,this.ball.radius,0,2*Math.PI,true);
            this.contex.closePath();
            this.contex.fill();
        },
        draw_platform:function()
        {
            this.contex.fillStyle = this.platform.color;
            this.contex.beginPath();
            this.contex.fillRect(this.platform.x, this.platform.y,
                        this.platform.width,this.platform.height);
            this.contex.closePath();
        },
        draw:function()
        {

            this.contex.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.move_ball();
            this.draw_ball();
            this.move_platform();
            this.draw_platform();
            this.animationID=window.requestAnimationFrame(this.draw.bind(this));
        },
        reset_ball:function()
        {
            this.ball.x=this.canvas.width/2;
            this.ball.y=this.canvas.height/2;
            this.ball.vx =BALL_DEFAULT_VX;
            this.ball.vy =BALL_DEFAULT_VY;
        }





    });

    return new GameView();
});