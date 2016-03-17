define([
    'backbone',
    'tmpl/scoreboard',
    'models/score',
    'collections/scores',
    'views/base'
], function(
    Backbone,
    tmpl,
    ScoreModel,
    ScoreCollection,
    BaseView
){


    var ScoreboardView = BaseView.extend({

        best_players :new ScoreCollection([{'username':'Username','score':'Score'},
            {username:'Dan', score:1000},
            {username:'Ann', score:2900},
            {username:'Andrew', score:1800},
            {username:'Alex', score:7300},
            {username:'George', score:600},
            {username:'Qwerty', score:2600},
            {username:'Master', score:Infinity},]),
        el:'#scoreboard',
        template: tmpl,
        events: {
            'click .js-back': 'hide'
        },
        initialize: function () {
            BaseView.prototype.initialize.call(this);
        },
        render: function () {
            this.$el.html(this.template(this.best_players.toJSON()));
            return this;

        },
        show: function () {
            BaseView.prototype.show.call(this);
        },
        hide: function () {
            BaseView.prototype.hide.call(this);
        }
    });

    return new ScoreboardView();
});