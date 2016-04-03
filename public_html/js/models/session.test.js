define(function (require) {
    QUnit.module("models/session");

    QUnit.test("При fetch вызывается метод sync", function () {

        var session = require('./session'),
            Backbone = require('backbone');
            //session = new SessionModel();

        sinon.spy(Backbone, 'sync');

        session.fetch();

        QUnit.ok(Backbone.sync.calledOnce);

    });
});
