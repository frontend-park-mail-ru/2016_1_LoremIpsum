define([
    'backbone',
    'tmpl/game',
    'models/ball',
    'models/platform',
    'models/blocks',
    'views/base',
    'underscore'

], function(
    Backbone,
    tmpl,
    BallModel,
    PlatformModel,
    BlocksModel,
    BaseView,
    _
){

    var PLATFORM_OFFSET_FACTOR=2;
    var BALL_DEFAULT_VY =-2;
    var BALL_DEFAULT_VX = 3;
    var ARROW_LEFT=37;
    var ARROW_RIGHT=39;

    var GameView = BaseView.extend({
        el: '#game',
        template: tmpl,
        events:{
            'click .js-back':'hide',
        },
        name:'game',
        initialize: function () {
            BaseView.prototype.initialize.call(this);
            this.ball = new BallModel();
            this.platform = new PlatformModel();
            this.blocks = new BlocksModel(6,20);
            _.bindAll(this,'draw','keyup_handler','keydown_handler');
        },
        render: function () {
            this.$el.html(this.template());

            this.canvas = this.$('#game__canvas')[0];
            this.contex = this.canvas.getContext('2d');

            this.platform.x= this.canvas.width/2 - this.platform.width/2;
            this.platform.y= this.canvas.height -
                  PLATFORM_OFFSET_FACTOR*this.platform.height;
            this.blocks.width = (this.canvas.width/20)-2;
            this.blocks.height = 5;
        },
        show: function () {
            BaseView.prototype.show.call(this);
            $(document).on('keydown',this.keydown_handler);
            $(document).on('keyup',this.keyup_handler);
            this.reset_ball();
            this.reset_blocks();
            this.game_is_running=true;
            this.animationID=window.requestAnimationFrame(this.draw);
        },
        hide: function () {
            window.cancelAnimationFrame(this.animationID);
            $(document).off('keyup',this.keydown_handler);
            $(document).off('keydown',this.keyup_handler);
            this.game_is_running=false;
            BaseView.prototype.hide.call(this);
        },
        keydown_handler:function(event) {
            if(event.keyCode == ARROW_LEFT) {
                this.platform.go_left();
            }
            else if(event.keyCode == ARROW_RIGHT) {
                this.platform.go_right();
            }
        },
        keyup_handler:function(event) {
            this.platform.stop();
        },
        move_ball:function() {
            this.ball.x+=this.ball.vx;
            this.ball.y+=this.ball.vy;
            this.check_colisions();
        },
        move_platform:function()
        {
            var next_pos = this.platform.next_position();
            if (next_pos >= 0 && (next_pos+this.platform.width) <= this.canvas.width ) {
                this.platform.x=next_pos;
            }
        },
        check_colisions:function() {
            if( this.ball.right()+this.ball.vx>this.canvas.width ||
                this.ball.left()+this.ball.vx<0)
            {
                this.ball.vx *= -1;
            }
            if(this.ball.top() +this.ball.vy < 0) {
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
                else {
                    this.reset_ball();
                }
            }


            var rowHeight = this.blocks.height + this.blocks.padding;
            var row = Math.floor(this.ball.y/(rowHeight));
            var col = Math.floor(this.ball.x/(this.blocks.width + this.blocks.padding));
            if (this.ball.y < this.blocks.rows * rowHeight && row >= 0 && col >= 0 && this.blocks.block_matrix[row][col] === 1){
                this.blocks.block_matrix[row][col] = 0;
                this.ball.vy = -this.ball.vy;
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
        draw_blocks:function() {
            this.contex.fillStyle = this.blocks.color;
            for (var i =0; i<this.blocks.rows; ++i){
                for (var j =0; j<this.blocks.cols; ++j){
                    if (this.blocks.block_matrix[i][j] === 1){
                        this.contex.beginPath();
                        this.contex.fillRect(j * (this.blocks.width + this.blocks.padding),
                                             i * (this.blocks.height+this.blocks.padding), this.blocks.width, this.blocks.height)
                        this.contex.strokeRect(j * (this.blocks.width + this.blocks.padding),
                                               i * (this.blocks.height+this.blocks.padding), this.blocks.width, this.blocks.height)
                        this.contex.closePath();
                    }
                }
            }
        },
        draw:function() {
            if(this.game_is_running) {
                this.contex.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.move_ball();
                this.draw_ball();
                this.move_platform();
                this.draw_platform();
                this.draw_blocks();
                window.requestAnimationFrame(this.draw);
            }
        },
        reset_ball:function() {
            this.ball.x=this.canvas.width/2;
            this.ball.y=this.canvas.height/2;
            this.ball.vx =BALL_DEFAULT_VX;
            this.ball.vy =BALL_DEFAULT_VY;
        },
        reset_blocks:function() {
            for (var i =0; i<this.blocks.rows; ++i) {
                this.blocks.block_matrix[i] = [];
                for (var j =0; j<this.blocks.cols; ++j) {
                    this.blocks.block_matrix[i][j] = 1;
                }
            }
        }
    });
    return new GameView();
});