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