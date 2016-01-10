var appBulletArmature = bulletArmature.extend({
    ctor:function () {
        this._super();
    },
    Animation : null,
    init:function(res){
        this._super(res);

        this.getAnimation().play("Animation1");
    },
    speed:300,
    destroy:function(){
        GC.TTFLOG.setString('destroy!--'+Math.random());
      //  this.getAnimation().stop();
        this.getAnimation().play("destroy",-1,0);
        //this.setAnimation(ccs."destroy");
    }
})
