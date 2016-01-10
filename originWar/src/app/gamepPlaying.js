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
    createPlayer:function(res){
      return new appRolePlayerSprite(res);

    },
    createEnemy:function(res){
        var armature = new appRoleEnemyArmature();
        armature.init(res.role);
        if(res.bullet) armature._bullet = res.bullet;
        return armature;
    //    return new appRoleEnemyArmature(res);
    },
    initPlayer:function(){//初始化
        //todo 根据log记录和关口等其他因素
        var player = {name:'wukong',ins:this.createPlayer('#home.png')};
        player.ins.attr({
            x: 320,
            y: 50
        });
        this.addChild(player.ins,2);
        this.list.players.push(player);
    },
    initEnemy:function(){
        //todo 根据log记录和关口等其他因素
     //   var enemy = {name:'1hao',ins:this.createEnemy('#enemy1.png')};
        var enemy = {name:'hao',ins:this.createEnemy({role:'enemy_test','bullet':''})};
        // console.log('123123');
        enemy.ins.attr({
            x: 640*Math.random(),
            y: 800
        });
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
        this.chechDie();
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
            var way = findway.getWay('way1');
            enemy.way = way;
            enemy.MoveToPoint();
        }
//        var enemy = this.list.enemies[0].ins;
//
//        var way = findway.getWay('way1');
//        enemy.way = way;
//        enemy.MoveToPoint();
    },
    checkAttack:function(){//检测攻击
        var enemy = [];
        for(var enemy_index in this.list.enemies){
            var player = null;
            var distance = 99999999;
            enemy[enemy_index] = this.list.enemies[enemy_index].ins;
            enemy[enemy_index].attack_list = [];//必须初始化，否则每一个全等了
            if(this.list.players[0]) player = this.list.players[0].ins;
            if(player && enemy[enemy_index]){
                distance = CommonFunction.getDistanceBy2Point(enemy[enemy_index],player);
            }
            var flag = 0;
            if(player && enemy[enemy_index] && distance <= enemy[enemy_index].attack_area){//攻击范围以内
           //     console.log('--------------------'+enemy_index);
                flag  = 1;
                for(var i in enemy[enemy_index].attack_list){//attack_list存在才会进这里
                    if(player == enemy[enemy_index].attack_list[i]){
                        flag = 0;
                        break;
                    }
                }
                if(flag == 1 && player){
                    enemy[enemy_index].attack_list.push(player);

                }
            }
            if(enemy[enemy_index] && enemy[enemy_index].attack_list.length > 0){
                this.doAttack(enemy[enemy_index],enemy_index);
            }else{
                if(enemy[enemy_index]) enemy[enemy_index].is_attacking = 0;
            }
        }
    },
    doAttack:function(enemy,index){//攻击
            if(enemy.attack_list.length > 0){
                enemy.attack(enemy.attack_list[0],index);
            }
//        var enemy = this.list.enemies[i].ins;
//        if(enemy.attack_list.length > 0){
//            enemy.attack(enemy.attack_list[0]);
//        }
    },
    chechDie:function(){
        if(this.list.players[0] && this.list.players[0].ins.hp <= 0){
            this.list.players[0].ins.visible = false;
            this.list.players.splice(0,1);
        }
    },
    /**
     * 检测是否空闲
     */
    checkIsFree:function(){
        for(var i in this.list.enemies){
            var enemy = this.list.enemies[i].ins;
            if(enemy.is_moving == 0 && enemy.is_attacking == 0){
                //console.log(i);
                var findway = new this.findway();
                var way = findway.continueWay(enemy,enemy.way);
                enemy.way = way;
                enemy.MoveToPoint();
            }
        }
//        var enemy = this.list.enemies[0].ins;
//        if(enemy.is_moving == 0 && enemy.is_attacking == 0){
//            var findway = new this.findway();
//            var way = findway.continueWay(enemy,enemy.way);
//            enemy.way = way;
//            enemy.MoveToPoint();
//        }
    }


});
