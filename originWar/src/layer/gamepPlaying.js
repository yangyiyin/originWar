/**
 * 游戏进行类
 * @type {*}
 */
var gamepPlayingLayer = gamepBaseLayer.extend({
    ctor:function () {
        this._super();
    },
    status:GC.GAME_STATUS.ACTION,
    getWay:function(option){
        var findway = new findway(option);
        return findway.way;
    },
    speed:GC.GAME_SPEED.LEVEL2,
    gold:GC.INIT_GOLD,
    list : {
        players:[],
        enemies:[],
        map:[]
    }
});
