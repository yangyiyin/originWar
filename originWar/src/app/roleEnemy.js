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
    speed:0.2,
    attack:function(){
        this._super();
        GC.TTFLOG.setString('attack!--'+Math.random());
    }
});


var appRoleEnemyArmature = roleEnemyArmature.extend({
    ctor:function () {
        this._super();
    },
    speed:80,
    _bullet:null,
    createBullet:function(){
        var bullet = new appBulletArmature();
        bullet.init(this._bullet);
        bullet.attr({
            x:this.x,
            y:this.y
        })
        return bullet;
    },
    attack_area:50,
    attack_type:GC.ATTACK_TYPE.close,
    count1 : 0,
    attack:function(target,index){
        if(!(this.count1%60)){
            this._super();
            if(this.attack_type == GC.ATTACK_TYPE.close){
            //    console.log('attack'+index);
                this.getAnimation().play("attack",-1,0);
                this._after_attack(target);
            }else if(this.attack_type == GC.ATTACK_TYPE.far){
                this.shoot(target);
                this._after_attack(target);
            }

        }
        this.count1++;
        if(this.count1 >= 60) this.count1 =0;
    },
    shoot:function(target){
        var bullet = this.createBullet();
        this.parent.addChild(bullet,3);
        bullet.shoot(target);
    },
    _after_attack:function(target){
        if(target){
        //    this.attack_list.splice(0,1);
            target.hp--;
        }
    }


});
