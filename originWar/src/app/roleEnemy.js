/**
 * Created with yyy.
 * User: yyy
 * Date: 15-10-18
 * Time: 上午9:30
 */
//var appRoleEnemySprite = roleEnemySprite.extend({
//    ctor:function (_res) {
//        this._super(_res);
//    },
//    speed:0.2,
//    attack:function(){
//        this._super();
//        GC.TTFLOG.setString('attack!--'+Math.random());
//    }
//});


var appRoleEnemyArmature = roleEnemyArmature.extend({
    speed:80,
    _bullet:'Bullet1Animation',
    whole_hp:5,
    hp:5,
    hpBox:null,
    attack_area:80,
    attack_type:GC.ATTACK_TYPE.close,
    count1 : 0,
    ctor:function () {
        this._super();
    },
    createBullet:function(){
        var bullet = new appBulletArmature();
        bullet.init(this._bullet);
        bullet.attr({
            x:this.x,
            y:this.y
        })
        return bullet;
    },
    attack:function(target,index){
        if(!target) return;
        this._super(target);
        if(!(this.count1%60)){
            if(this.attack_type == GC.ATTACK_TYPE.close){

                this.getAnimation().play("attack",-1,0);
                var _this = this;
                setTimeout(function(){
                    _this._after_attack(target);
                    GC.TTFLOG.setStr('destroy!--'+Math.random());
                },800);//todo 时间是攻击间隔

            } else if (this.attack_type == GC.ATTACK_TYPE.far) {
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
            target.setHpBox();
        //    if(target.hp <= 0) this.count1 = 0;
        }
    },
    hpProgress:function(){
        if(this.hpBox) return this.hpBox;
        var loadingBar = new ccui.LoadingBar();
        loadingBar.setName("LoadingBar");
        loadingBar.loadTexture(res.progress_png);
        loadingBar.setPercent(100);
        this.setHpPos(loadingBar);
        loadingBar.scaleX = 0.2;
        loadingBar.scaleY = 0.5;
        loadingBar.setColor(cc.color(0,255,0));
        this.hpBox = loadingBar;
        return loadingBar;
    },
    setHpPos:function(hpHox){
        if(!hpHox)hpHox = this.hpBox;
        if(!hpHox) return ;
        hpHox.x = this.x;
        hpHox.y = this.y+20;
    },
    initHpBox:function(){
        this.parent.addChild(this.hpProgress(),50, 44);
    },
    setHpBox:function(){
        var percent = this.hp*100/this.whole_hp;
        if(percent < 30) this.hpBox.setColor(cc.color(255,0,0));
        this.hpBox.setPercent(percent);
    }



});
