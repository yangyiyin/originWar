/**
 * Created with yyy.
 * User: yyy
 * Date: 15-10-18
 * Time: 上午9:40
 */
var enemySprite = cc.Sprite.extend({
    move_time : 0.2,
    is_moving : 1,
    ctor : function(enemy_png,extra){
        this._super(enemy_png);
        this.InitPosition();
        if(extra){
            this.move_time = extra.move_time ? extra.move_time :  this.move_time;
            if(extra.x) this.x = extra.x;
            if(extra.x) this.y = extra.y;
        }
        this.scale = 0.5;
    },
    InitPosition : function(){
        this.attr({
            x: 600,
            y: 350
        });
    },
    MoveToPoint : function(way){
        var action_arr = [];
        var action = '';
        var point;
        var time;//每移动一个单元的时间
        for(var i=0;i<way.length;i++){
            point = way[i];
            if(point.oblique){
                time = 1.4 * this.move_time;
            }else{
                time = this.move_time;
            }
            action = new cc.MoveTo(time, cc.p(point.x, point.y));
            action_arr.push(action);
        }
        this.runAction(cc.Sequence(action_arr));
        this.is_moving = 1;
    },
    Findway : function(extra){
        this.stopAllActions();
       // var findway = new findway();
        var options = {
            start_point : {
                x:this.x,
                y:this.y,
                g:0,
                h:0,
                f:0,
                f_point:'start'
            },
            obstacle : [
                {x1:0,x2:50,y1:20,y2:735,x:25,y:377.5,width:50,height:715},
                {x1:50,x2:105,y1:70,y2:700,x:77.5,y:385,width:55,height:630},
                {x1:105,x2:153,y1:100,y2:620,x:129,y:360,width:48,height:520},
                {x1:153,x2:187,y1:125,y2:490,x:170,y:307.5,width:34,height:365},
                {x1:187,x2:221,y1:155,y2:373,x:204,y:264,width:34,height:218},

                {x1:-100,x2:0,y1:0,y2:960,x:-50,y:480,width:100,height:960},
                {x1:640,x2:740,y1:0,y2:960,x:690,y:480,width:100,height:960},
                {x1:0,x2:640,y1:-100,y2:0,x:320,y:-50,width:640,height:100},
                {x1:0,x2:640,y1:960,y2:1060,x:320,y:1010,width:640,height:100}


          //      {x1:477.5,x2:522.5,y1:577.5,y2:622.5,x:500,y:600,width:45,height:45}
            ]
        }
        var obstacle;
        for(var i=0;i<extra.length;i++){
        	var x1 = extra[i].x-12 < 0 ? 0 : extra[i].x-12;
            var x2 = extra[i].x+12> 640 ? 640 : extra[i].x+12;
            var y1 = extra[i].y-12< 0 ? 0 : extra[i].y-12;
            var y2 = extra[i].y+12> 960 ? 960 : extra[i].y+12;
            obstacle = {x1:x1,x2:x2,y1:y1,y2:y2,x:extra[i].x,y:extra[i].y,width:Math.abs(x1-x2),height:Math.abs(y1-y2)};
            options.obstacle.push(obstacle);
        }
      //  options.obstacle.push( {x1:477.5,x2:522.5,y1:577.5,y2:622.5,x:500,y:600,width:45,height:45});
        var way = findway(options);
        return way;
    }


});