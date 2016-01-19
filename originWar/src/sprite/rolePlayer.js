/**
 * Created with yyy.
 * User: yyy
 * Date: 15-10-18
 * Time: 上午9:30
 */
var rolePlayerArmature = rolePlayerBaseArmature.extend({
    ctor:function () {
        this._super();
    },
    _action:false,
    attack_list:[],
    attack:function(target){
        if(this._action) this.stopAllActions();
        this._action = false;
        this.is_moving = 0;
        this.is_attacking = 1;
        var rotation = CommonFunction.getRotation(this,target);
        var action = new cc.RotateTo(0.2, rotation);
        var action_arr = [];
        action_arr.push(action);
        this.runAction(cc.Sequence(action_arr));
      //  this._action = true;
    },
    is_moving:0,
    is_attacking:0
});