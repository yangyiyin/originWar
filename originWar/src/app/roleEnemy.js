/**
 * Created with yyy.
 * User: yyy
 * Date: 15-10-18
 * Time: 上午9:30
 */
var appRoleEnemySprite = roleEnemySprite.extend({
    ctor:function (res) {
        this._super(res);
    },
    speed:0.1,
    attack:function(){
        this._super();
        GC.TTFLOG.setString('attack!--'+Math.random());
    }
});