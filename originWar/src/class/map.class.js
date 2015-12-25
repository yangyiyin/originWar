/**
 * 地图类,构造函数
 * User: yyy
 * Date: 15-12-25
 * Time: 下午10:56
 */
var MapClass = function(){
    this.source = null;
    this.elementList = [];
    this.addElement = function(){}
    this.getElement = function(id){}
    this.delElement = function(id){}
    this.getObstacle = function(){
        return [
            {x1:0,x2:0,y1:0,y2:0,x:0,y:0,width:0,height:0}
        ]
    }
}
