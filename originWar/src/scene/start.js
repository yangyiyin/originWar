var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
     //   this.addChild(new appGampSettingLayer(),0);
        var layer = new cc.LayerMultiplex(new appGampSettingLayer(), new appGampSettingSettingLayer());
        this.addChild(layer, 0);

    }
});
