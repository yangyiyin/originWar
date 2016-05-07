var appBulletArmature = bulletArmature.extend({
    ctor:function () {
        this._super();
    },
    Animation : null,
    init:function(res){
        this._super(res);
        this.getAnimation().play("Animation1");
    },
    speed:600,
    destroy:function(){
        GC.TTFLOG.setString('destroy!--'+Math.random());
      //  this.getAnimation().stop();
        this.getAnimation().play("destroy",-1,0);
        //this.setAnimation(ccs."destroy");
    },
    die:function(){
        var _this = this;
        setTimeout(function(){
            _this.visible = false;
        },1000)
    },
    shoot:function(target){
        if(!target) return;
        var action = new cc.MoveTo(CommonFunction.getDistanceBy2Point(this,target) / this.speed, cc.p(target.x, target.y));
        var action_arr = [];
        action_arr.push(action);
        action_arr.push(new cc.CallFunc(this.destroy, this));
        action_arr.push(new cc.CallFunc(this.die, this));
        this.runAction(cc.Sequence(action_arr));
    }
})
