/**
 * Created by danil on 16.04.16.
 */
define([
    '../utils/canvas_wrapper'
], function(
    Wrapper
){
    function painters_initialize(context){
        Wrapper.id_draw('platform',function(context,platform){
            context.fillStyle = 'rgba(150,100,150,0.7)';
            context.beginPath();
            context.fillRect(platform.x,platform.y,
                    platform.width, platform.height);
            context.closePath();
        });
        Wrapper.group_draw('balls',function(context,ball){
            context.fillStyle = 'white';
            context.beginPath();
            context.arc(ball.x, ball.y, ball.radius,0,2*Math.PI,true);
            context.closePath();
            context.fill();
        });
        Wrapper.group_draw('blocks',function(context,block){
            context.fillStyle = 'rgba(0,180,180,0.3)';
            context.beginPath();
            context.fillRect(block.x,block.y, block.width,block.height);
            context.strokeRect(block.x,block.y, block.width, block.height);
            context.closePath();
        });
    }
    return painters_initialize;

});