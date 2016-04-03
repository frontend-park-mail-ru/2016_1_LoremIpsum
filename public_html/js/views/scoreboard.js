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

        best_players :new ScoreCollection([{'nickname':'nickname','score':'Score'},
            {nickname:'Dan', score:1000},
            {nickname:'Ann', score:2900},
            {nickname:'Andrew', score:1800},
            {nickname:'Alex', score:7300},
            {nickname:'George', score:600},
            {nickname:'Qwerty', score:2600},
            {nickname:'Master', score:Infinity},]),
        el:'#scoreboard',
        name:'scoreboard',
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