define([
    'backbone'
], function(
    Backbone
){

    var BlocksModel = Backbone.Model.extend({
        constructor: function(rows,cols)
        {
            this.rows = rows;
            this.cols = cols;
            this.padding = 2;
            this.obj = [];
            this.color='orange';
            this.width = 0;
            this.height = 0;
            Backbone.Model.apply(this, arguments);

        },
    });

    return BlocksModel;
});