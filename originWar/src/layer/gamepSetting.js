/**
 * 游戏开始设置类
 * @type {*}
 */

var gamepSettingLayer = gamepBaseLayer.extend({
    ctor:function () {
        this._super();
    },
    menus:[],//['start','setting','quit']
    bg:function(){},
    /**
     * 初始化菜单
     */
    initMenu:function(){
        if(!this.bg) return;
        if(this.menus.length){
            this.bg().addElements(this.menus);
        }
    }
});
