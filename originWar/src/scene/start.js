var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new cc.LayerMultiplex(new appGampSettingLayer(), new appGampSettingSettingLayer());
        this.addChild(layer, 0);

    }
});
