/**
 * Created by danil on 17.04.16.
 */
define([
    'backbone',
    'game/game_objects/balls',
    'game/game_objects/blocks',
    'game/game_objects/platforms'
], function(
    Backbone,
    balls_initialize,
    blocks_initialize,
    platforms_initialize
){

    //var SCORE_URL ='api/v1/score';
    var GameState = Backbone.Model.extend({
        url: function () {
            return (this.id) ? (SCORE_URL + this.id) : SCORE_URL;
        },
        defaults: {
            'login': '',
            'score': 0
        },
        initialize: function (wrapper) {
            this.socket = new WebSocket("ws://127.0.0.1:8090/api/game");
            this.blocks = blocks_initialize(wrapper);
            this.your_balls = [ balls_initialize(wrapper,'your') ];
            this.your_platform = platforms_initialize(wrapper,'your');
            this.another_balls = [ balls_initialize(wrapper,'another') ];
            this.another_platform = platforms_initialize(wrapper,'another');
            this.socket.onmessage = function (event) {
                this.your_balls = event.data.your_balls;
                this.your_platform = event.data.your_platform;
                this.another_balls = event.data.another_balls;
                this.another_platform = event.data.another_platform;
                this.blocks.matrix = event.data.blocks;
            }.bind(this);
        },
        toJSON: function () {
            return {
                blocks: this.blocks.matrix,
                your_balls: this.your_balls,
                your_plaform: this.your_plaform,
                another_balls: this.another_balls,
                another_plaform: this.another_plaform
            };
        },
        left: function () {
            this.your_platform.vx = -5;
        },
        right: function () {
            this.your_platform.vx = 5;
        },
        stop_platform: function () {
            this.your_platform.vx = 0;
        }


    });

    return GameState;
});