var PlayingScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addChild(new appGamepPlayingLayer(),0);
    }
});
