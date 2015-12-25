/**
 * Created with yyy.
 * User: yyy
 * Date: 15-10-18
 * Time: 上午9:30
 */
var BgLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.addChild(sprite, 0);
    }
});