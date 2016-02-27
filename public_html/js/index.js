var $page = $('#page'),
    currentScreen = 'main',
    best_players=[{'username':'Username','score':'Score'},
                  {'username':'Dan', 'score':1000},
                  {'username':'Ann', 'score':900},
                  {'username':'Andrew', 'score':800},
                  {'username':'Alex', 'score':700},
                  {'username':'George', 'score':600}
    ];

/* Конструктор экрана "Лучшие игроки" */
function showScoreboardScreen() {
    hideMainScreen(); // Убиваем экран "Главный"
    currentScreen = 'scoreboard';
    $page.html(tmpl(best_players)); // Рендерим шаблон
    // Инициализируем обработчики событий
    $page.find('.js-back').on('click', showMainScreen);
}

/* Деструктор экрана "Лучшие игроки" */
function hideScoreboardScreen() {
    // Удаляем установленные обработчики событий
    $page.find('.js-back').off('click', showMainScreen);
}

/* Конструктор экрана "Игра" */
function showGameScreen() {
    hideMainScreen(); // Убиваем экран "Главный"
    currentScreen = 'game';
    $page.html(gameTmpl()); // Рендерим шаблон
    // Инициализируем обработчики событий
    $page.find('.js-back').on('click', showMainScreen);
}

/* Деструктор экрана "Игра" */
function hideGameScreen() {
    // Удаляем установленные обработчики событий
    $page.find('.js-back').off('click', showMainScreen);
}

/* Конструктор экрана "Авторизация" */
function showLoginScreen() {
    hideMainScreen(); // Убиваем экран "Главный"
    currentScreen = 'login';
    $page.html(loginTmpl()); // Рендерим шаблон
    // Инициализируем обработчики событий
    $page.find('.js-back').on('click', showMainScreen);
}

/* Деструктор экрана "Авторизация" */
function hideLoginScreen() {
    // Удаляем установленные обработчики событий
    $page.find('.js-back').off('click', showMainScreen);
}


/* Конструктор экрана "Главный" */
function showMainScreen() {
    // Убиваем текущий экран
    if (currentScreen === 'scoreboard') {
        hideScoreboardScreen();
    } else if (currentScreen === 'game') {
        hideGameScreen();
    } else if (currentScreen === 'login') {
        hideLoginScreen();
    }
    currentScreen = 'main';
    $page.html(mainTmpl()); // Рендерим шаблон
    // Инициализируем обработчики событий
    $page.find('.js-scoreboard').on('click', showScoreboardScreen);
    $page.find('.js-start-game').on('click', showGameScreen);
    $page.find('.js-login').on('click', showLoginScreen);
}

/* Деструктор экрана "Главный" */
function hideMainScreen() {
    // Удаляем установленные обработчики событий
    $page.find('.js-scoreboard').off('click', showScoreboardScreen);
    $page.find('.js-start-game').off('click', showGameScreen);
    $page.find('.js-login').off('click', showLoginScreen);
}

showMainScreen();