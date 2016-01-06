/**
 * 游戏进行抽象类
 * @type {Function}
 */
var gamepClassOptions = {
    ctor:function () {
        this._super();
        this.setTTFLOG();
    },
    setTTFLOG:function(){
        GC.TTFLOG = new cc.LabelTTF("TTFLOG");
        GC.TTFLOG.anchorX = 0;
        GC.TTFLOG.anchorY = 0;
        GC.TTFLOG.x = 10;
        GC.TTFLOG.y = GC.h/4;
        GC.TTFLOG.color = cc.color(0, 0, 0, 255);
        this.addChild(GC.TTFLOG,100);
    }
};
gamepClass.call(gamepClassOptions);
var gamepBaseLayer = cc.Layer.extend(gamepClassOptions);
