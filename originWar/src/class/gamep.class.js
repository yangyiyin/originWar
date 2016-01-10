/**
 * 游戏进行类,构造函数,接口定义类
 * User: yyy
 * Date: 15-12-25
 * Time: 下午10:56
 */
var gamepClass = function(){
  //  this.gold = 0;
    this.level = 0;
    this.speed = 0;
    this.status = 0;
    this.music = 0;
    this.list = {
     //   players:[],
     //   enemies:[],
    //    map:[],
     //   bg:[]
    }
    this.goAction = function(){}
    this.stopAction = function(){};
    this.addList = function(){};
    this.delList = function(){};
    //this.getWay = function(){};
}



var CommonFunction = {
    getDistanceBy2Point:function(point1,point2){
       return  Math.sqrt(Math.pow((point1.x-point2.x),2) + Math.pow((point1.y-point2.y),2));
    }
}

