/**
 * Created by danil on 12.03.16.
 */
define([
    'backbone'
], function(
    Backbone
){

    var Model = Backbone.Model.extend({
        /*defaults:
        {
            'type':'', //Тип ошибки валидации
            'data':null //Связанная информация
        },*/
        initialize: function(_type,_data)
        {
            this.type = _type;
            this.data = _data;
        }

    });

    return Model;
});