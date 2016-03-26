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

    var DELAY = 10;
    var views ={main:MainView,
                scoreboard:ScoreboardView,
                game:GameView,
                login:LoginView,
                registration:RegistrationView
    };
    var current_view = views.main;
    var Router = Backbone.Router.extend({
        routes: {
            'main':'mainAction',
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'logout': 'logoutAction',
            'registration': 'registrationAction',
            '*default': 'defaultActions'
        },
        baseAction:function(view) {
            current_view.hide();
            current_view=view;
            current_view.show();
        },
        mainAction: function() {
            this.baseAction(views.main);
        },
        scoreboardAction: function () {
            this.baseAction(views.scoreboard);
        },
        gameAction: function () {
            this.baseAction(views.game);
        },
        loginAction: function () {
            this.baseAction(views.login);
        },
        registrationAction: function() {
            this.baseAction(views.registration);
        },
        logoutAction: function(){
            session.logout(function(){
                Backbone.history.navigate('main',true);
            });
        },
        defaultActions: function () {
            this.mainAction();
        }
    });
    return new Router();
});