/**
 * Created with yyy.
 * User: yyy
 * Date: 15-10-18
 * Time: 上午9:30
 */
var ActionLayer = cc.Layer.extend({
    end_point : {
        x:400,
        y:320
    },
    ctor:function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.role_plist);
        var enemy2 = new enemySprite('#enemy1.png',{x:300,y:700,move_time:0.7});
        var enemy1 = new enemySprite('#enemy1.png',{x:400,y:700,move_time:0.8});
        var enemy3 = new enemySprite('#enemy1.png',{x:500,y:700,move_time:0.4});
        var enemy4 = new enemySprite('#enemy1.png',{x:600,y:700,move_time:0.3});
        var enemy5 = new enemySprite('#enemy1.png',{x:200,y:700,move_time:0.2});
        var enemy6 = new enemySprite('#enemy1.png',{x:100,y:700,move_time:0.8});
        var enemy7 = new enemySprite('#home.png',{move_time:1});
         var home = new enemySprite('#home.png',{
             x:400,
             y:320
         });
        this.addChild(enemy1, 0);
        this.addChild(enemy2, 0);
        this.addChild(enemy3, 0);
        this.addChild(enemy4, 0);
        this.addChild(enemy5, 0);
        this.addChild(enemy6, 0);
        this.addChild(enemy7, 0);
        this.addChild(home, 0);
        var enemy = [enemy1,enemy2,enemy3,enemy4,enemy5,enemy6,enemy7];
        this.schedule(function(){
            for(var i=0;i<7;i++){
                for(var j=i+1;j<7;j++){
                    if(this.checkColide(enemy[i],enemy[j])){//碰撞情况下

                        if(enemy[i].is_moving == 1){
                            if(enemy[i].x > enemy[j].x){
                                enemy[i].x++;
                            }
                            else if (enemy[i].x == enemy[j].x){
                                enemy[i].y++;
                            }
                            else{
                                enemy[i].x--;
                            
                            }

                            this.MoveOnWay(enemy[i].Findway(enemy),enemy[i]);

                        }
                        if(enemy[j].is_moving == 1){
                            if(enemy[i].x > enemy[j].x){
                                enemy[j].x--;
                            }
                            else if (enemy[i].x == enemy[j].x){
                                enemy[j].y--;
                            }
                            else{
                                enemy[j].x++;

                            }
                            this.MoveOnWay(enemy[j].Findway(enemy),enemy[j]);
                        }

                    }
                }
            }
            for(var i=0;i<7;i++){
                if(Math.abs(this.end_point.x-enemy[i].x)<30&&Math.abs(this.end_point.y-enemy[i].y)<30){
                    enemy[i].is_moving = 0;
                    enemy[i].stopAllActions();
                }
            }
        },0);



        for(var i=0;i<7;i++){
            var temp = [];
            for(var j=0;j<7;j++){
               if(i!=j){
                   temp.push(enemy[j]);
               }
            }
            this.MoveOnWay(enemy[i].Findway(temp),enemy[i]);
        }
//        this.MoveOnWay(enemy1.Findway([enemy2]),enemy1);
//        this.MoveOnWay(enemy2.Findway([enemy1]),enemy2);
    },
//    Findway : findway,
    MoveOnWay : function(way,enemy){
        if(way)enemy.MoveToPoint(way);
    },
    checkColide : function(enemy1,enemy2){
        if(Math.abs(enemy1.x-enemy2.x) < 23 && Math.abs(enemy1.y-enemy2.y) < 23 ){
            return true
        }else{
            return false;
        }
    }
});