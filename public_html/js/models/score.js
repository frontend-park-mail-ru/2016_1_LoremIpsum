define([
'backbone'
], function(
    Backbone
){

    var Model = Backbone.Model.extend({
        defaults:
        {
            'nickname':'',
            'score':0
        }
    });

    return Model;
});