/**
 * Created with yyy.
 * User: yyy
 * Date: 15-10-18
 * Time: 上午9:30
 */
var appBgPlayingLayer = bgLayer.extend({
    ctor:function () {
        this._super();

    },
    effect_file:res.effect_mp3,
    background_music : res.background_music_1,
    goldLabel:function(){
        var label = new cc.LabelTTF("GOLD:"+GC.INIT_GOLD);
        label.anchorX = 0;
        label.anchorY = 0;
        label.x = 10;
        label.y = GC.h-30;
        label.color = cc.color(0, 0, 0, 255);
        this.addChild(label,3);
    },
    bg:function(){
        var sprite = new cc.Sprite(res.bg_png);
        sprite.attr({
            x: GC.w_2,
            y: GC.h_2
        });
        return sprite;
    }
});