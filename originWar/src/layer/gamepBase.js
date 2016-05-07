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
        GC.TTFLOG.dying = 0;
        GC.TTFLOG.setStr=function(string){
            GC.TTFLOG.visible = true;
            if (GC.TTFLOG.dying) {
                clearTimeout(GC.TTFLOG.dying);
            }
            var pre_string =  GC.TTFLOG.getString();
            GC.TTFLOG.setString(pre_string + '\n' + string);
            GC.TTFLOG.dying = setTimeout(function(){
                GC.TTFLOG.visible = false;
            },2000);
        }
        this.addChild(GC.TTFLOG,100);
    }
};
gamepClass.call(gamepClassOptions);
var gamepBaseLayer = cc.Layer.extend(gamepClassOptions);
