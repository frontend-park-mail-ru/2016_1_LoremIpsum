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
    };
    var Router = Backbone.Router.extend({
        routes: {
            'main':'mainAction',
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            '*default': 'defaultActions'
        },
        defaultActions: function () {
            views.main.show()
        },
        mainAction: function()
        {
            views.main.show();
        },
        scoreboardAction: function () {
            views.scoreboard.show()
        },
        gameAction: function () {
            views.game.show()
        },
        loginAction: function () {
            views.login.show();
        }
    });

    return new Router();
});