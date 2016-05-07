/**
 * 游戏进行类
 * @type {*}
 */
var appGamepPlayingLayer = gamepPlayingLayer.extend({
    ctor:function () {
        this._super();
        this.addChild(this.bg(), 1);
        cc.spriteFrameCache.addSpriteFrames(res.role_plist);//加载plist到精灵帧cache中
        cc.spriteFrameCache.addSpriteFrames(res.enemy_test_plist);//加载plist到精灵帧cache中
        ccs.armatureDataManager.addArmatureFileInfo(res.enemy_test_ExportJson);
        ccs.armatureDataManager.addArmatureFileInfo(res.Bullet1Animation_ExportJson);
        this.initInterface();//初始化界面
        this.initTouchEvent();
        this.initPlayer();
//        this.runningGame();
//        var _this = this;
//        setTimeout(function(){
//            for(var i in _this._listeners){
//                cc.eventManager.removeListener(_this._listeners[i]);
//            }
//        }, 3000);
    },
    _bg:null,
    _init_enemy_count_max:10,
    _init_enemy_count:0,
    _listener:null,
    _listeners:[],
    bg:function(){
        if(!this._bg) this._bg = new appBgPlayingLayer();
        return this._bg;
    },
    initInterface:function(){
        this.bg().addElements(['goldLabel','bg']);//金币


        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.loadTextures("res/animationbuttonnormal.png", "res/animationbuttonpressed.png", "");
        button.x = GC.w / 2;
        button.y = GC.h / 2;
        button.addTouchEventListener(this.touchEvent, this);
        this.addChild(button,10);

    },
    createPlayer:function(_res){
        var armature = eval('new ' + _res.class_name + '()');
        armature.init(_res.role);
        if(_res.bullet) armature._bullet = _res.bullet;
        var listener = this._listener.clone();
        this._listeners.push(listener);
        cc.eventManager.addListener(listener, armature);
        return armature;
    },
    bindPlayersEvent : function(){
        if(this.list.players.length && this.list.players.length > 0){
            this.initTouchEvent();
            this._listeners = [];
            for(var i in this.list.players){
                this.initTouchEvent();
                var listener = this._listener.clone();
                this._listeners.push(listener);
                cc.eventManager.addListener(listener, this.list.players[i].ins);
            }
        }
    },
    createEnemy:function(_res){
        var armature = new appRoleEnemyArmature();
        armature.init(_res.role);
        if(_res.bullet) armature._bullet = _res.bullet;
        return armature;
    },
    initPlayer:function(){//初始化
        //todo 根据log记录和关口等其他因素
        var stage_config_players = stage_config[0].players;
        for (var i in stage_config_players) {
            var player = {name:'wukong'+i,ins:this.createPlayer({role : 'enemy_test', bullet : '', class_name : stage_config_players[i].class_name})};
            player.ins.attr({
                x: stage_config_players[i].position.x,
                y: stage_config_players[i].position.y
            });
            player.origin_data = {};
            player.origin_data.x = stage_config_players[i].position.x;
            player.origin_data.y = stage_config_players[i].position.y;
            this.addChild(player.ins,2);
            player.ins.initHpBox();
            this.list.players.push(player);
        }
    },
    initEnemy:function(){
        //todo 根据log记录和关口等其他因素
        var enemy = {name:'hao',ins:this.createEnemy({role:'enemy_test','bullet':''})};
        enemy.ins.attr({
            x: 640*Math.random(),
            y: 800
        });
        enemy.ins.scale = 0.5;
        this._init_enemy_count ++;
        this.addChild(enemy.ins, 10, 33);
        enemy.ins.initHpBox();
        this.list.enemies.push(enemy);
    },
    runningGame:function(){
        this.moveByWay();
        this.scheduleUpdate();
    },
    index:0,
    update:function(dt){//定时任务
        this.RoleUpdates();
        this.checkAttack();
        this.checkWatch();
        if(this.index >= 120) this.index = 0;
        if(!(this.index%120) && this._init_enemy_count < this._init_enemy_count_max){
            this.initEnemy();
            this.moveByWay();
        }
        if(!(this.index%30)){
            this.checkIsFree();
        }
        this.index++;
    },
    moveByWay:function(){
        var findway = new this.findway();
        for(var i in this.list.enemies){
            var enemy = this.list.enemies[i].ins;
            if(enemy.is_moving == 1 || enemy.is_attacking == 1) continue;
            if(enemy.x < 200)  {
                var way = findway.getWay('way1');
            }
            else if(enemy.x < 400)  {
                var way = findway.getWay('way2');
            }
            else{
                var way = findway.getWay('way3');
            }
            enemy.way = way;
            enemy.MoveToPoint();
        }
    },
    checkWatch : function(){
    //    check.call(this,this.list.enemies,this.list.players);
        check.call(this,this.list.players,this.list.enemies);
        function check(list1,list2){
            for(var enemy_index in list1){
                var player = null;
                var distance = 99999999;
                var enemy = list1[enemy_index].ins;
                enemy.watch_list = [];//必须初始化，否则每一个全等了
                //   if(this.list.players[0]) player = this.list.players[0].ins;
                for(var player_obj in list2){
                    var player = list2[player_obj].ins;
                    if(player && enemy){
                        distance = CommonFunction.getDistanceBy2Point(enemy,player);
                    }
                    checkWatchList(player,enemy,distance);
                }
                if(enemy && enemy.watch_list.length > 0){
                    enemy.doWatch();
                }
            }
        }
        function checkWatchList(role1,role2,distance){
            var flag = 0;
            //   console.log(player);
            if(role1 && role2 && role2.watch_area && distance <= role2.watch_area){//攻击范围以内
                flag  = 1;
                for(var i in role2.watch_list){//attack_list存在才会进这里
                    if(role1 == role2.watch_list[i]){
                        flag = 0;
                        break;
                    }
                }
                if(flag == 1 && role1){
                    role2.watch_list.push(role1);
                }
            }
        }
    },
    checkAttack : function(){//检测攻击
        check.call(this,this.list.enemies,this.list.players);
        check.call(this,this.list.players,this.list.enemies);
        function check(list1,list2){
            for(var enemy_index in list1){
                var player = null;
                var distance = 99999999;
                var enemy = list1[enemy_index].ins;
                enemy.attack_list = [];//必须初始化，否则每一个全等了
                //   if(this.list.players[0]) player = this.list.players[0].ins;
                for(var player_obj in list2){
                    var player = list2[player_obj].ins;
                    if(player && enemy){
                        distance = CommonFunction.getDistanceBy2Point(enemy,player);
                    }
                    checkAttackList(player,enemy,distance);
                }
                if(enemy && enemy.attack_list.length > 0){
                    this.doAttack(enemy);
                }else{
                    if(enemy) enemy.is_attacking = 0;
                }
            }
        }
        function checkAttackList(role1,role2,distance){
            var flag = 0;
            //   console.log(player);
            if(role1 && role2 && role2.attack_area && distance <= role2.attack_area){//攻击范围以内
                flag  = 1;
                for(var i in role2.attack_list){//attack_list存在才会进这里
                    if(role1 == role2.attack_list[i]){
                        flag = 0;
                        break;
                    }
                }
                if(flag == 1 && role1){
                    role2.attack_list.push(role1);
                }
            }
        }
    },
    doAttack:function(role){//攻击
        if(role.attack_list.length > 0){
            role.attack(role.attack_list[0]);
        }
    },
    checkDie:function(list,i){
        if(list[i] && list[i].ins.hp <= 0){
            list[i].ins.visible = false;
            list.splice(i,1);
        }
    },
    moveHp:function(role){
        if(role){
            role.setHpPos();
        }
    },
    RoleUpdates:function(){
        for (var i in this.list.players) {
            if (!this.list.players[i]) {
                continue;
            }
            this.moveHp(this.list.players[i].ins);//固定血条位置
            this.checkDie(this.list.players,i);//检测死亡
        }
        for (var i in this.list.enemies) {
            if (!this.list.enemies || !this.list.enemies.length) return;
            this.moveHp(this.list.enemies[i].ins);//固定血条位置
            this.checkDie(this.list.enemies,i);//检测死亡
        }
    },

    /**
     * 检测是否空闲
     */
    checkIsFree:function(){
        for(var i in this.list.enemies){
            var enemy = this.list.enemies[i].ins;
            if(enemy.is_moving == 0 && enemy.is_attacking == 0){
                var findway = new this.findway();
                var way = findway.continueWay(enemy,enemy.way);
                enemy.way = way;
             //   console.log(JSON.stringify(way));
                enemy.MoveToPoint();
            }
        }
    },

    initTouchEvent : function(sprite) {
        var _this = this;
        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var target = event.getCurrentTarget();

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(-s.width/2, -s.height/2, s.width, s.height);
                if (cc.rectContainsPoint(rect, locationInNode)) {
                    cc.log("sprite began... x = " + locationInNode.x + ", y = " + locationInNode.y);
                    target.opacity = 180;
                    return true;
                }
                return false;
            },
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
                var delta = touch.getDelta();
                target.x += delta.x;
                target.y += delta.y;
                _this.moveHp(target);
            },
            onTouchEnded: function (touch, event) {
                var target = event.getCurrentTarget();
                cc.log("sprite onTouchesEnded.. ");
                target.setOpacity(255);
            }
        });
    },
    touchEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                //console.log("Touch Down");
                break;

            case ccui.Widget.TOUCH_MOVED:
                //console.log("Touch Move");
                break;

            case ccui.Widget.TOUCH_ENDED:

                if (GC.GAME_STATUS & GC.GAME_STATUSES.NORMAL) {
                    GC.GAME_STATUS = GC.GAME_STATUSES.STOP;
                    this.initGame();
                    console.log("1");
                    this.bindPlayersEvent();
                } else if (GC.GAME_STATUS & GC.GAME_STATUSES.STOP) {
                    GC.GAME_STATUS = GC.GAME_STATUSES.NORMAL;
                    if(this._listeners.length > 0) {
                        for(var i in this._listeners){
                            cc.eventManager.removeListener(this._listeners[i]);
                        }
                    }
                    console.log("2");
                    this.runningGame();
                }
                break;

            case ccui.Widget.TOUCH_CANCELED:
                //console.log("Touch Cancelled");
                break;

            default:
                break;
        }
    },

    initGame : function() {
        this.unscheduleUpdate();
        var _this = this;
        setTimeout(function(){
            while(_this.getChildByTag(33)){//enemy
                _this.removeChildByTag(33,true);

            }
            while(_this.getChildByTag(44)){//enemyhp
                _this.removeChildByTag(44,true);

            }
            _this.list.enemies = [];
            _this._init_enemy_count = 0;//初始化敌人数
            if(_this.list.players.length && _this.list.players.length > 0){
                for (var i in _this.list.players) {
                    _this.list.players[i].ins.stopAllActions();
                    _this.list.players[i].ins.rotation = 0;
                    _this.list.players[i].ins.attr({
                        x:_this.list.players[i].origin_data.x,
                        y:_this.list.players[i].origin_data.y
                    });
                    _this.moveHp(_this.list.players[i].ins);
                }
            }
        },1000);




    }









});
