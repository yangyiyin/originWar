var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new bgLayer(),0);
    }
});
