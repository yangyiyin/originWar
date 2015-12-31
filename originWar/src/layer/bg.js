/**
 * Created with yyy.
 * User: yyy
 * Date: 15-10-18
 * Time: 上午9:30
 */
var bgLayer = bgBaseLayer.extend({
    ctor:function () {
        this._super();
    },
    list : [],
    addElement : function(name){
        if(this[name]){
            var ele = this[name]();
            if(ele) this.addChild(ele,1);
        }
    },
    getMenu:function(){
        var menu = new cc.Menu();
        menu.x = GC.w_2;
        menu.y = GC.h_2;
        return menu;
    },
    audioEngine : new musicLayer(),
    playBgMusic : function(){
        this.audioEngine.playMusic(this.background_music,true);
    },
    stopBgMusic : function(){
        this.audioEngine.stopMusic();
    },
    getEffectsVolume:function(){
        this.audioEngine.getEffectsVolume()
    },
    getMusicVolume:function(){
        this.audioEngine.getMusicVolume()
    },
    setEffectsVolume:function(volume){
        this.audioEngine.setEffectsVolume(volume);
    },
    setMusicVolume:function(volume){
        this.audioEngine.setMusicVolume(volume);
    }

});