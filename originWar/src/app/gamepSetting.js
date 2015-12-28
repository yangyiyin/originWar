/**
 * 游戏开始设置类
 * @type {*}
 */

var appGampSettingLayer = gamepSettingLayer.extend({
    ctor:function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.gameSetting_plist);//加载plist到精灵帧cache中
        this.initMenu();//初始化菜单项
        this.addChild(this.bg, 2);
    },
    bg:new appBgLayer(),
    menus:['bg','menuStart','menuSetting','menuQuit']
});
