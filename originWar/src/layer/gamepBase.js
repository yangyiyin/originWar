/**
 * 游戏进行抽象类
 * @type {Function}
 */
var gamepClassOptions = {
    ctor:function () {
        this._super();
    }
};
gamepClass.call(gamepClassOptions);
var gamepBaseLayer = cc.Layer.extend(gamepClassOptions);
