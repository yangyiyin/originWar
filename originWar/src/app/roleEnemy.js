/**
 * Created with yyy.
 * User: yyy
 * Date: 15-10-18
 * Time: 上午9:30
 */
var appRoleEnemySprite = roleEnemySprite.extend({
    ctor:function (res) {
        this._super(res);
    },
    speed:0.5,
    attack:function(){
        this._super();
        GC.TTFLOG.setString('attack!--'+Math.random());
    }
});


var appRoleEnemyArmature = roleEnemyArmature.extend({
    ctor:function () {
        this._super();
    },
    speed:0.5,
    _bullet:null,
    createBullet:function(){
        var bullet = new appBulletArmature();
        bullet.init(this._bullet);
        return bullet;
    },
    count1 : 0,
    attack:function(target){
        if(!this.count1%1000){
            this._super();
        //    GC.TTFLOG.setString('attack!--'+Math.random());
            //  this.schedule(this.shoot(target),0.1);
            this.shoot(target);
        }
        this.count1++;
        if(this.count1 ==100) this.count1 =0;
    },
    shoot:function(target){
        var bullet = this.createBullet();
//        bullet.attr({
//            x:this.x,
//            y:this.y
//        });
        this.addChild(bullet,-1);
        var action = new cc.MoveTo(CommonFunction.getDistanceBy2Point(bullet,target) / bullet.speed, cc.p(target.x-this.x, target.y-this.y));
        var action_arr = [];
        action_arr.push(action);
        action_arr.push(new cc.CallFunc(bullet.destroy, bullet));
        bullet.runAction(cc.Sequence(action_arr));

    }


});
