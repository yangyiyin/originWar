/**
 * Created by lingjianfeng on 14-8-31.
 */



var GC = GC || {};

GC.winSize = cc.size(640, 960);

GC.h = GC.winSize.height;

GC.w = GC.winSize.width;

GC.w_2 = GC.winSize.width / 2 ;

GC.h_2 = GC.winSize.height / 2;

GC.SOUND_ON = true;



GC.GAME_STATUS = {//游戏状态
    ACTION:1,
    PARSE:2
}
GC.GAME_SPEED = {//游戏速度
    LEVEL1:1,
    LEVEL2:2,
    LEVEL3:3
}
GC.INIT_GOLD=100;//初始化金币
GC.ATTACK_TYPE = {
    close:1,
    far:2
}

GC.TTFLOG = null;

