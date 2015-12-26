/**
 * 游戏进行类
 * @type {*}
 */
var GAME_STATUS = {//游戏状态
    ACTION:1,
    PARSE:2
}
var GAME_SPEED = {//游戏速度
    LEVEL1:1,
    LEVEL2:2,
    LEVEL3:3
}
var INIT_GOLD=100;//初始化金币
var gamepPlayingLayer = gamepBaseLayer.extend({
    ctor:function () {
        this._super();
    },
    status:GAME_STATUS.ACTION,
    getWay:function(option){
        var findway = new findway(option);
        return findway.way;
    },
    speed:GAME_SPEED.LEVEL2,
    gold:INIT_GOLD,
    list : {
        players:[],
        enemies:[],
        map:[]
    }
});
