define([
    'backbone',
    'views/main',
    'views/scoreboard',
    'views/login',
    'views/game',
    'views/registration',
    'models/session'
], function(
    Backbone,
    MainView,
    ScoreboardView,
    LoginView,
    GameView,
    RegistrationView,
    session
){

    var views ={main:MainView,
                scoreboard:ScoreboardView,
                game:GameView,
                login:LoginView,
                registration:RegistrationView
    };
    var Router = Backbone.Router.extend({
        routes: {
            'main':'mainAction',
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'registration': 'registrationAction',
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
        },
        registrationAction: function() {
            views.registration.show();
        }
    });

    return new Router();
});