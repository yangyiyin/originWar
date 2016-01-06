/**
 * 游戏进行类
 * @type {*}
 */
var gamepPlayingLayer = gamepBaseLayer.extend({
    ctor:function () {
        this._super();
    },
    initRole:function(){
        this.initPlayer();
        this.initEnemy();
    },
    initPlayer:function(){
        this.createPlayer();
    },
    initEnemy:function(){
        this.createEnemy();
    },
    list : {
        players:[],
        enemies:[]
    },
    findway:findway
});
