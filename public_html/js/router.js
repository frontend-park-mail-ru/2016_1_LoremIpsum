define([
    'backbone',
    'views/main',
    'views/scoreboard',
    'views/login',
    'views/game',
    'views/registration',
    'views/viewmanager',
    'models/session'
], function(
    Backbone,
    MainView,
    ScoreboardView,
    LoginView,
    GameView,
    RegistrationView,
    ViewManager,
    session
){

    var views ={main:MainView,
                scoreboard:ScoreboardView,
                game:GameView,
                login:LoginView,
                registration:RegistrationView
    };
    var manager = new ViewManager(views);
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
        mainAction: function() {
            manager.show('main');
        },
        scoreboardAction: function () {
            manager.show('scoreboard');
        },
        gameAction: function () {
            manager.show('game');;
        },
        loginAction: function () {
            manager.show('login');
        },
        registrationAction: function() {
            manager.show('registration');
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