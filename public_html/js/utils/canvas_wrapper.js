/**
 * Created by danil on 26.03.16.
 */
define([//// 'underscore'
], function(//_
){

    var CanvasObject = function(options){
        this.x = options.x;
        this.y = options.y;
        this.vx = options.vx;
        this.vy = options.vy;
    };
    CanvasObject.prototype.move = function(){
        this.x += vx;
        this.y += vy;
    };
    CanvasObject.prototype.stop = function(){
        this.vx = 0;
        this.vy = 0;
    };
    CanvasObject.prototype.change_velocity = function(vx,vy){
        this.vx = vx;
        this.vy = vy;
    };

    var BallObject = function(options){
        CanvasObject.apply(this, arguments);
        this.radius = options.radius;
    };
    BallObject.prototype = Object.create(CanvasObject.prototype);
    BallObject.prototype.constructor = BallObject;
    BallObject.prototype.left = function(){
        return this.x - this.radius;
    };
    BallObject.prototype.right = function(){
        return this.x + this.radius;
    };
    BallObject.prototype.bottom = function(){
        return this.y + this.radius;
    };
    BallObject.prototype.up = function(){
        return this.y - this.radius;
    };

    var RectangleObject = function(options){
        CanvasObject.apply(this, arguments);
        this.width = options.width;
        this.height = options.height;
    };
    RectangleObject.prototype = Object.create(CanvasObject.prototype);
    RectangleObject.prototype.constructor = BallObject;
    RectangleObject.prototype.left = function(){
        return this.x;
    };
    RectangleObject.prototype.right = function(){
        return this.x + this.height;
    };
    RectangleObject.prototype.bottom = function(){
        return this.y + this.radius;
    };
    RectangleObject.prototype.up = function(){
        return this.y;
    };

    var Bound = function(options){
        this.type = options.type;
        this.coord =options.coord;
        this.begin = options.begin;
        this.end = options.end;
    };
    var Wrapper = {
        fps:60,
        colisions_handlers:{},
        objects: [],
        bounds: [],
        actions: [],
        action_handlers:{},
        group_painters:{},
        id_painters:{},
        create_rectangle:function(options){
            var new_rectangle = new RectangleObject(options);
            if('id' in options){
                this['_' + options.id ]= new_rectangle;
            }
            this.objects.push(new_rectangle);
            return new_rectangle;
        },
        create_ball:function(options){
            var new_ball = new BallObject(options);
            if('id' in options){
                this['_' + options.id ]= new_ball;
            }
            this.objects.push(new_ball);
            return new_ball;
        },
        create_bound:function(options){
            var new_bound = new Bound(options);
            this.bounds.push(bound);
        },
        create_vertical_bound: function(options){
            options.type = 'vertical';
            this.create_bound(options);
        },
        create_horizontal_bound: function(options){
            options.type = 'vertical';
            this.create_bound(options);
        },
        default_bound_collision_handler:function(object, bound){

        },
        check_collisions:function(){
            this.objects = _.sortBy(this.objects, function(obj){
                return obj.left();
            });
            for(var i=0; i<this.objects.length();i++){
                for(var j=0; j<this.objects.length && this.objects[i].right() > this.objects[j].left(); j++) {
                    if((this.objects[i].top() < this.objects[j].bottom() &&
                       this.objects[i].top() > this.objects[j].top())||
                        (this.objects[i].bottom() > this.objects[j].top() &&
                        this.objects[i].top() < this.objects[j].top())
                    ){
                        var posible_handler_name =['_id' + this.objects[i].id + '_id' + this.objects[j]._id,
                                                   '_id' + this.objects[j].id + '_id' + this.objects[i]._id,
                                                   '_id' + this.objects[i].id + '_group' + this.objects[j]._group,
                                                   '_id' + this.objects[j].id + '_group' + this.objects[i]._group,
                                                   '_group' + this.objects[i]._group + '_group' + this.objects[j]._group,
                                                   '_group' + this.objects[j]._group + '_group' + this.objects[i]._group];
                        for(var k=0; k<posible_handler_name.length; k++){
                            if(posible_handler_name[k] in this.colisions_handlers){
                                this.colisions_handlers[posible_handler_name [k] ](this.objects[i],this.objects[j]);
                            }
                        }
                    }
                }
            }
            for(i=0; i<this.objects.length();i++){
                for(j=0;j<this.bounds.length() ;j++){
                    var condition1;
                    var condition2;
                    var condition3;
                    var bound_colision = false;
                    if(this.bounds[j].type === 'horizontal'){
                        condition1 = this.objects[i].top() < this.bounds[j].coord &&
                            this.objects[i].bottom() > this.bounds[j].coord;
                        condition2 = ('begin' in this.bounds[j]) ? (this.objects[i].right()>this.bounds[j].begin) : true;
                        condition3 = ('end' in this.bounds[j]) ? (this.objects[i].left() < this.bounds[j].end) : true;
                        if(condition1 && condition2 && condition3 ){
                            bound_colision = true;
                        }
                    }
                    if(this.bounds[j].type === 'vertical'){
                        condition1 = this.objects[i].left() < this.bounds[j].coord &&
                            this.objects[i].right() > this.bounds[j].coord;
                        condition2 = ('begin' in this.bounds[j]) ? (this.objects[i].bottom() < this.bounds[j].begin) : true;
                        condition3 = ('end' in this.bounds[j]) ? (this.objects[i].top() > this.bounds[j].end) : true;
                        if(condition1 && condition2 && condition3 ){
                            bound_colision = true;
                        }
                    }
                    if(bound_colision){
                        var handler_name;
                        if( handler_name= ('_id' +this.objects[i]._id  + '_bounds') in this.colisions_handlers){
                            this.colisions_handlers[handler_name](this.objects[i],this.bounds[j]);
                        }
                        else if(handler_name= ('_group' +this.objects[i]._group  + '_bounds') in this.colisions_handlers){
                            this.colisions_handlers[handler_name](this.objects[i],this.bounds[j]);
                        }
                        else{
                            this.default_bound_collision_handler(this.objects[i],this.bounds[j]);
                        }
                    }
                }
            }
        },
        oncollision:function(options){
            if( ('id1' in options) && ('id2' in options)){
                this.colisions_handlers['_id' + options.id1 + '_id' + options.id2] = options.handler;
            }
            if( ('group1' in options) && ('group2' in options)){
                this.colisions_handlers['_group' + options.group1 + '_group' + options.group2] = options.handler;
            }
            if( ('_id' in options) && ('_group' in options)){
                this.colisions_handlers['_id' + options._id + '_group' + options._group] = options.handler;
            }

        },
        onboundcollision:function(options){
            if('_id' in options){
                this.colisions_handlers['_id' + options.id + '_bounds'] = options.handler;
            }
            if('_group' in options){
                this.colisions_handlers['_group' + options._group + '_bounds'] = options.handler;
            }
        },
        update:function(){
            for(var i=0; i < this.actions.length; i++){
                if(this.actions[i] in  this.actions_handlers) {
                    this.actions_handlers[this.actions[i]]();
                    delete  this.actions_handlers[this.actions[i]];
                }
            }
            for(i=0; i < this.objects.length; i++){
                this.objects[i].move();
            }
            this.check_collisions();
        },
        group_draw:function(group_name,callback){
            this.group_painters[group_name] = callback;
        },
        id_draw:function(id,callback){
            this.group_painters[group_name] = callback;
        },
        draw:function(){
            for(var i=0; i< this.objects.length; i++){
                if(this.objects[i]._id in this.id_painters){
                    this.id_painters[this.objects[i]._id ](this.context,this.objects[i]);
                }
                if(this.objects[i]._group in this.id_painters){
                    this.group_painters[this.objects[i]._group](this.context,this.objects[i]);
                }
            }
        },
        run:function(){
            window.setInterval(function(){
                this.update();
                this.draw();
            }.bind(this),1000/this.fps)
        }

    };
    return Wrapper;
});