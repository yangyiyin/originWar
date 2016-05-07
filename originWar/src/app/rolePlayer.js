/**
 * Created with yyy.
 * User: yyy
 * Date: 15-10-18
 * Time: 上午9:30
 */
var appRolePlayerArmature = rolePlayerArmature.extend({
    hp:35,
    whole_hp:35,
    hpBox:null,
    _bullet:null,
    attack_area:180,
    attack_type:GC.ATTACK_TYPE.close,
    watch_area:280,
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
    doWatch : function() {
        if (!this.is_attacking && this.watch_list.length) {
            var x_y_d = CommonFunction.getXYDistanceBy2Point(this,this.watch_list[0]);//x,y的差值数组
            this.x += (x_y_d.x_d/10000)*this.speed;
            this.y += (x_y_d.y_d/10000)*this.speed;

        }
    },
    attack:function(target){
        if(!target) return;
        this._super(target);
        if(!(this.count1%60)){
            if(this.attack_type == GC.ATTACK_TYPE.close){
                //console.log(123);
//                this.getAnimation().setSpeedScale(22);设置攻击速度
                this.getAnimation().play("attack",-1,0);
                var _this = this;
                setTimeout(function(){
                    _this._after_attack(target);
                },400);

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
        loadingBar.scaleX = 0.3;
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
        this.parent.addChild(this.hpProgress(),50);
    },
    setHpBox:function(){
        var percent = this.hp*100/this.whole_hp;
        if(percent < 30) this.hpBox.setColor(cc.color(255,0,0));
        this.hpBox.setPercent(percent);
    }


});