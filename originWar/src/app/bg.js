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
        this.playBgMusic();
        this.setMusicVolume(0.2);
    },
    effect_file:res.effect2_wav,
    background_music : res.bg2_mp3,
    bg:function(){
        var sprite = new cc.Sprite(res.bg_png);
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
                this.audioEngine.playEffect(this.effect_file);
                cc.director.runScene(new PlayingScene());
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
                this.audioEngine.playEffect(this.effect_file);
                this.parent.parent.switchTo(1);
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
                this.audioEngine.playEffect(this.effect_file);
                cc.director.end();
            },
            y : -90
        }
        var item = this._makeMenuItemSprite(options);
        this.menu.addChild(item,1);
    },
    Setting:function(){
      //  this.playBgMusic();
        var item1 = this._makeMenuItemToggle("声音     开","声音     关",function(_this){
            GC.SOUND_ON = GC.SOUND_ON ? false : true;
            if(GC.SOUND_ON){
                _this.playBgMusic();
            }else{
                _this.stopBgMusic();
            }
        });
        var item2 = this._makeMenuItemToggle("游戏难度     简单","游戏难度     中等",function(_this){
            console.log(item2.getSelectedIndex());//0,1,2
        });
        item2.addSubItem(new cc.MenuItemFont("游戏难度     困难"));

        var back = new cc.MenuItemFont("返回", function(){
            this.audioEngine.playEffect(this.effect_file);
            this.parent.parent.switchTo(0);
        }, this);

        this.menu.addChild(item1);
        this.menu.addChild(item2);
        this.menu.addChild(back);
        this.menu.alignItemsVertically();
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
    },
    _makeMenuItemToggle:function(str1,str2,callback){
        return  new cc.MenuItemToggle(
            new cc.MenuItemFont(str1),
            new cc.MenuItemFont(str2),
            function(){
                this.audioEngine.playEffect(this.effect_file);
                if(callback) callback(this);
            }, this);
    }
});