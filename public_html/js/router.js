define([
    'backbone',
    'views/main',
    'views/scoreboard',
    'views/login',
    'views/game'
], function(
    Backbone,
    MainView,
    ScoreboardView,
    LoginView,
    GameView
){

    var views ={main:MainView,
                scoreboard:ScoreboardView,
                game:GameView,
                login:LoginView
    }
    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            '*default': 'defaultActions'
        },
        defaultActions: function () {
            views.main.render()
        },
        scoreboardAction: function () {
            views.scoreboard.render()
        },
        gameAction: function () {
            views.game.render()
        },
        loginAction: function () {
            views.login.render()
        }
    });

    return new Router();
});