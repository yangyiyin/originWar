/**
 * 游戏进行抽象类
 * @type {Function}
 */
var gamepBaseLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        gamepClass.call(this);
    }
});
