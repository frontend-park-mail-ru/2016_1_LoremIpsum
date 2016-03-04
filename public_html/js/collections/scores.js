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
    var example=new ScoreCollection([{'username':'Username','score':'Score'},
        {username:'Dan', score:1000},
        {username:'Ann', score:2900},
        {username:'Andrew', score:1800},
        {username:'Alex', score:7300},
        {username:'George', score:600},
        ]);


    return  ScoreCollection;
});