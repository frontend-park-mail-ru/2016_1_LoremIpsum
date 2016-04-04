define([
    'backbone',
    'models/score'
], function(
    Backbone,
    ScoreModel
){

    var ScoreCollection = Backbone.Collection.extend({
        model:ScoreModel,
        comparator:function(score)
        {
            return (-score.get('score'));
        }
    });
    return  ScoreCollection;
});