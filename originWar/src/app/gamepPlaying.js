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
        this.initRole();
        this.runningGame();

    },
    _bg:null,
    _init_enemy_count_max:10,
    _init_enemy_count:0,
    bg:function(){
        if(!this._bg) this._bg = new appBgPlayingLayer();
        return this._bg;
    },
    initInterface:function(){
        this.bg().addElements(['goldLabel','bg']);//金币
    },
    createPlayer:function(_res){
     // return new appRolePlayerSprite(res);
        var armature = new appRolePlayerArmature();
        armature.init(_res.role);
        armature.initHpBox();
        if(_res.bullet) armature._bullet = _res.bullet;
        return armature;
    },
    createEnemy:function(_res){
        var armature = new appRoleEnemyArmature();
        armature.init(_res.role);
        armature.initHpBox();
        if(_res.bullet) armature._bullet = _res.bullet;
        return armature;
    },
    initPlayer:function(){//初始化
        //todo 根据log记录和关口等其他因素
        var player = {name:'wukong',ins:this.createPlayer({role:'enemy_test','bullet':''})};
        player.ins.attr({
            x: 320,
            y: 50
        });
        this.addChild(player.ins,2);
        var player2 = {name:'wukong2',ins:this.createPlayer({role:'enemy_test','bullet':''})};
        player2.ins.attr({
            x: 300,
            y: 100
        });
        this.addChild(player2.ins,2);
        this.list.players.push(player2);
        this.list.players.push(player);
     //  this.list.players.push(player2);
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
        this.addChild(enemy.ins,10);
        this.list.enemies.push(enemy);
    },
    runningGame:function(){
        this.moveByWay();
        this.scheduleUpdate();
    },
    index:0,
    update:function(dt){
        this.checkDie();
        this.checkAttack();//定时任务

        if(this.index >= 120)this.index = 0;
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
    checkAttack:function(){//检测攻击
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
    checkDie:function(){
        for(var i in this.list.players){
            if(this.list.players[i] && this.list.players[i].ins.hp <= 0){
                this.list.players[i].ins.visible = false;
                this.list.players.splice(i,1);
            }
        }
        for(var i in this.list.enemies){
            if(this.list.enemies[i] && this.list.enemies[i].ins.hp <= 0){
                this.list.enemies[i].ins.visible = false;
                this.list.enemies.splice(i,1);
            }
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
    }


});
