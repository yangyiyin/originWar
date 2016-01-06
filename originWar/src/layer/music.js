/**
 * Created with yyy.
 * User: yyy
 * Date: 15-10-18
 * Time: 上午9:30
 */
var musicLayer = musicBaseLayer.extend({
    ctor:function () {
        this._super();
    },
    audioEngine : cc.audioEngine,
    playEffect : function(file){
        if(!GC.SOUND_ON) return;
        this.audioEngine.playEffect(file);
    },
    playMusic:function(file,loop){
        if(!GC.SOUND_ON) return;
        this.audioEngine.playMusic(file,loop);
    },
    stopMusic:function(){
        if(GC.SOUND_ON) return;
        this.audioEngine.stopMusic();
    },
    getEffectsVolume:function(){
        console.log(this.audioEngine.getEffectsVolume());
    },
    getMusicVolume:function(){
        console.log(this.audioEngine.getMusicVolume());
    },
    setEffectsVolume:function(volume){
        this.audioEngine.setEffectsVolume(volume);
    },
    setMusicVolume:function(volume){
        this.audioEngine.setMusicVolume(volume);
        console.log(this.audioEngine.getMusicVolume());
    }

});