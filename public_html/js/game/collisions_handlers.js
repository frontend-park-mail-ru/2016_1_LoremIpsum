/**
 * Created by danil on 16.04.16.
 */
define([
    '../utils/canvas_wrapper'
], function(
    Wrapper
){
    function initialize_collision_handlers (){
        Wrapper.oncollision({
            '_id': 'platform', '_group': 'balls', handler: function (first, second) {

                var ball =first;
                var platform = second;
                if(first._group !== 'balls'){
                    ball = [platform, platform=ball][0];//swap
                }
                ball.vy *= -1;
                //ball.vx = 10 * (ball.x - (platform.x)); // platform.width;
                var diff = 0;
                var platform_center = platform.x+ platform.width/2;
                if (ball.x < platform_center )
                {
                    //  Ball is on the left-hand side of the paddle
                    diff = platform_center - ball.x;
                    ball.vx = (-10 * diff);
                }
                else if (ball.x > platform.x)
                {
                    //  Ball is on the right-hand side of the paddle
                    diff = ball.x -platform_center;
                    ball.vx = (10 * diff);
                }
                ball.vx /= 2*platform.width;
            }
        });
        Wrapper.oncollision({
            'group1': 'balls', 'group2': 'blocks', handler: function (first, second) {
                if(first._group === 'balls'){
                    first.vy *= -1;
                    first.move();
                    second._group = '';
                }
                else{
                    second.vy *= -1;
                    second.move();
                    first._group = '';
                }

            }
        });

        Wrapper.onboundcollision({
            '_group': 'balls', handler: function (ball, bound) {
                if (bound.type === 'left' || bound.type === 'right') {
                    ball.vx *= -1;
                }
                else if (bound.type === 'top'
                         ||bound.type === 'bottom' ) {
                    //if (bound.coord === 0) {
                        ball.vy *= -1;
                    //}
                }
                //ball.move();
            }
        });
        Wrapper.onboundcollision({
            '_id': 'platform', handler: function (platform, bound) {
                if (bound.type === 'left') {
                    platform.x = bound.coord;
                }
                else{
                    platform.x = bound.coord - platform.width;
                }
            }
        });
    }
    return initialize_collision_handlers;
});