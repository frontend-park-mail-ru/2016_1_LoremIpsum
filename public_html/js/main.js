require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

define([
    'backbone',
    'router'
], function(
    Backbone,
    router
){
    //Backbone.sync переопределяется, так как
    //в нашем api следующее сответсвие CRUD и HTTP
    //create - put
    //update - post
    //А в дефолтном Backbone.sync наоборот
    Backbone.sync = function(method,model,options){
        var methodMap = {
            'create': 'PUT',
            'update': 'POST',
            'delete': 'DELETE',
            'read': 'GET'
        };
        var type = methodMap[method];
        var params = {type: type, dataType: 'json'};
        params.url = model.url(method);

        if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
            params.contentType = 'application/json';//'application/x-www-form-urlencoded; charset=UTF-8';//
            params.data = JSON.stringify(options.attrs || model.toJSON(options));
        }
        var error = options.error;
        options.error = function(xhr, textStatus, errorThrown) {
            options.textStatus = textStatus;
            options.errorThrown = errorThrown;
            if (error) error.call(options.context, xhr, textStatus, errorThrown);
        };

        var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
        model.trigger('request', model, xhr, options);
        return xhr;

    };
    Backbone.history.start();
});
