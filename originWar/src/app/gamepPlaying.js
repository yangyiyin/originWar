/**
 * 游戏进行类
 * @type {*}
 */
var appGamepPlayingLayer = gamepPlayingLayer.extend({
    ctor:function () {
        this._super();
        this.addChild(this.bg(), 1);
        cc.spriteFrameCache.addSpriteFrames(res.role_plist);//加载plist到精灵帧cache中
        this.initInterface();//初始化界面
        this.initRole();
        this.runningGame();
    },
    _bg:null,
    bg:function(){
        if(!this._bg) this._bg = new appBgPlayingLayer();
        return this._bg;
    },
    initInterface:function(){
        this.bg().addElements(['goldLabel','bg']);//金币
    },
    createPlayer:function(res){
        return new appRolePlayerSprite(res);
    },
    createEnemy:function(res){
        return new appRoleEnemySprite(res);
    },
    initPlayer:function(){//初始化
        //todo 根据log记录和关口等其他因素
        var player = {name:'wukong',ins:this.createPlayer('#home.png')};
        player.ins.attr({
            x: 320,
            y: 50
        });
        this.addChild(player.ins,4);
        this.list.players.push(player);
    },
    initEnemy:function(){
        //todo 根据log记录和关口等其他因素
        var enemy = {name:'1hao',ins:this.createEnemy('#enemy1.png')};
        // console.log('123123');
        enemy.ins.attr({
            x: 320,
            y: 800
        });
        this.addChild(enemy.ins,4);
        this.list.enemies.push(enemy);
    },
    runningGame:function(){
        this.moveByWay();
        this.scheduleUpdate();
    },
    update:function(dt){
        this.checkAttack();//定时任务
    },
    moveByWay:function(){
        var findway = new this.findway();
        var enemy = this.list.enemies[0].ins;
        findway.start_point = {
            x:320,
            y:800,
            g:0,
            h:0,
            f:0,
            f_point:'start'
        }
        var way = findway.doFindway();
        enemy.MoveToPoint(way);
    },
    checkAttack:function(){//检测攻击
        var enemy = this.list.enemies[0].ins;
        var player = this.list.players[0].ins;
        var distance = Math.sqrt(Math.pow((enemy.x-player.x),2) + Math.pow((enemy.y-player.y),2));
        if(distance <= enemy.attack_area){
            enemy.attack_list.push(player);
        }
//        if(distance <= enemy.attack_area){
//
//        }

        this.doAttack();
    },
    doAttack:function(){//攻击
        var enemy = this.list.enemies[0].ins;
        if(enemy.attack_list.length > 0){
            enemy.attack();
        }
    }


});
