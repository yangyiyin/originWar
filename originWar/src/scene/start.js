var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new appGampSettingLayer(),0);
    }
});
