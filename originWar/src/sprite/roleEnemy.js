/**
 * Created with yyy.
 * User: yyy
 * Date: 15-10-18
 * Time: 上午9:30
 */
var roleEnemySprite = roleEnemyBaseSprite.extend({
    ctor:function (res) {
        this._super(res);
    },
    MoveToPoint : function(way){
        var action_arr = [];
        var action = '';
        var point;
        var time;//每移动一个单元的时间
        for(var i=0;i<way.length;i++){
            point = way[i];
            if(point.oblique){
                time = 1.4 * this.speed;
            }else{
                time = this.speed;
            }
            action = new cc.MoveTo(time, cc.p(point.x, point.y));
            action_arr.push(action);
        }
        this.runAction(cc.Sequence(action_arr));
    },
    attack_area:150,
    attack_list:[],
    attack:function(){
        this.stopAllActions();
    },
    speed:0.1,//0.1秒每移动一次


});
var roleEnemyArmature = roleEnemyBaseArmature.extend({
    ctor:function () {
        this._super();
    },
    MoveToPoint : function(){
        this.getAnimation().play("walk");
        this.is_moving = 1;
        var action_arr = [];
        var action = '';
        var point;
        var time;//每移动一个单元的时间
        var pre_point = null;
        var rotation = 0;//转向
        for(var i=0;i<this.way.length;i++){
            point = this.way[i];
            if(!pre_point){
                time = CommonFunction.getDistanceBy2Point(this,point) / this.speed;
                rotation=CommonFunction.getRotation(this,point);

            }else{
                time = CommonFunction.getDistanceBy2Point(pre_point,point) / this.speed;
                rotation=CommonFunction.getRotation(pre_point,point);
            }
            pre_point = point;
         //   console.log(rotation);
            action_arr.push(new cc.RotateTo(0.2, rotation));
            action = new cc.MoveTo(time, cc.p(point.x, point.y));
            action_arr.push(action);
        }
        this.runAction(cc.Sequence(action_arr));
    },
    setRotation:function(_this,rotation){
        this.rotation = rotation;
    },
    attack_area:150,
    attack_list:[],
    attack:function(){
        this.stopAllActions();
        this.is_moving = 0;
        this.is_attacking = 1;
    },
    speed:0.1,//0.1秒每移动一次
    is_moving:0,
    is_attacking:0

});