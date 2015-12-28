/**
 * Created with yyy.
 * User: yyy
 * Date: 15-10-18
 * Time: 上午9:30
 */
var appBgLayer = bgLayer.extend({
    ctor:function () {
        this._super();
        this.menu = this.getMenu();
        this.addChild(this.menu,3);
    },
    bg:function(){
        var sprite = cc.Sprite(res.bg_png);
        sprite.attr({
            x: GC.w_2,
            y: GC.h_2
        });
        return sprite;
    },
    menuStart:function(){
        var options = {
            normal_img : new cc.Sprite('#menuStart_1.png'),
            select_img : new cc.Sprite('#menuStart_2.png'),
            callback : function(){
                console.log('start');
            },
            y : 90
        }
        var item = this._makeMenuItemSprite(options);
        this.menu.addChild(item,1);
    },
    menuSetting:function(){
        var options = {
            normal_img : new cc.Sprite('#menuSetting_1.png'),
            select_img : new cc.Sprite('#menuSetting_2.png'),
            callback : function(){
                console.log('setting');
            }
        }
        var item = this._makeMenuItemSprite(options);
        this.menu.addChild(item,1);
    },
    menuQuit:function(){
        var options = {
            normal_img : new cc.Sprite('#menuQuit_1.png'),
            select_img : new cc.Sprite('#menuQuit_2.png'),
            callback : function(){
                console.log('quit');
            },
            y : -90
        }
        var item = this._makeMenuItemSprite(options);
        this.menu.addChild(item,1);
    },
    _makeMenuItemSprite: function(options){
        var item = new cc.MenuItemSprite(
            options.normal_img,
            options.select_img,
            options.callback, this);
        item.attr({
            x: options.x ? options.x : 0,
            y: options.y ? options.y : 0,
            anchorX: 0.5,
            anchorY: 0.5
        });
        return item;
    }
});