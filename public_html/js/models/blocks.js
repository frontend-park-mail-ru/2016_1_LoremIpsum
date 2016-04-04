define([
    'backbone'
], function(
    Backbone
){

    var BlocksModel = Backbone.Model.extend({
        initialize: function(rows,cols)
        {
            this.rows = rows;
            this.cols = cols;
            this.padding = 2;
            this.block_matrix = [];
            this.color='orange';
            this.width = 0;

            this.height = 0;

        },
    });

    return BlocksModel;
});