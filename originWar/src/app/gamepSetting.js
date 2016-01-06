/**
 * 游戏开始设置类
 * @type {*}
 */

var appGampSettingLayer = gamepSettingLayer.extend({
    ctor:function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.gameSetting_plist);//加载plist到精灵帧cache中
        this.initMenu();//初始化菜单项
        this.addChild(this.bg(), 2);
    },
    _bg:null,
    bg:function(){
        if(!this._bg)this._bg = new appBgLayer();
        return this._bg;
    },
    menus:['menuStart','menuSetting','menuQuit']
});
var appGampSettingSettingLayer = gamepSettingLayer.extend({
    ctor:function () {
        this._super();
        this.initMenu();//初始化菜单项
        this.addChild(this.bg(), 2);
    },
    _bg:null,
    bg:function(){
        if(!this._bg)this._bg = new appBgLayer();
        return this._bg;
    },
    menus:['Setting']
});