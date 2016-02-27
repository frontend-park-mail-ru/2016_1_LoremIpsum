define([
    'backbone',
    'tmpl/scoreboard'
], function(
    Backbone,
    tmpl
){
    var best_players=[{'username':'Username','score':'Score'},
        {'username':'Dan', 'score':1000},
        {'username':'Ann', 'score':900},
        {'username':'Andrew', 'score':800},
        {'username':'Alex', 'score':700},
        {'username':'George', 'score':600}
    ];

    var ScoreboardView = Backbone.View.extend({

        template: tmpl,
        initialize: function () {
            this.$el=$('#page');
        },
        render: function () {
            this.$el.html(tmpl(best_players));
            return this;

        },
        show: function () {
            this.render()
        },
        hide: function () {
            this.$el.empty()
        }

    });

    return new ScoreboardView();
});