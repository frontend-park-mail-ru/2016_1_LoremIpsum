define([
    'backbone',
    'tmpl/scoreboard',
    'models/score',
    'collections/scores'
], function(
    Backbone,
    tmpl,
    ScoreModel,
    ScoreCollection
){


    var ScoreboardView = Backbone.View.extend({

        best_players :new ScoreCollection([{'username':'Username','score':'Score'},
            {username:'Dan', score:1000},
            {username:'Ann', score:2900},
            {username:'Andrew', score:1800},
            {username:'Alex', score:7300},
            {username:'George', score:600},
            {username:'Qwerty', score:2600},
            {username:'Master', score:Infinity},]),
        template: tmpl,
        events: {
            'click .js-back': 'hide'
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.best_players.toJSON()));
            return this;

        },
        show: function () {
            $('#page').html(this.$el);
            this.delegateEvents();
        },
        hide: function () {
            $('#page').empty();
            this.undelegateEvents();
        }

    });

    return new ScoreboardView();
});