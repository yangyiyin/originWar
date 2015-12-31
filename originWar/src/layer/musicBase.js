var musicClassOptions = {
    ctor:function () {
        this._super();
    }
};
MusicClass.call(musicClassOptions);
var musicBaseLayer = cc.Layer.extend(musicClassOptions);
