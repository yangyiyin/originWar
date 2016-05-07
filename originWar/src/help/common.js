/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 16-4-9
 * Time: 下午8:24
 * To change this template use File | Settings | File Templates.
 */
var CommonFunction = {
    getDistanceBy2Point:function(point1,point2){
        return  Math.sqrt(Math.pow((point1.x-point2.x),2) + Math.pow((point1.y-point2.y),2));
    },
    getXYDistanceBy2Point:function(point1,point2){
        return  {x_d : point2.x - point1.x, y_d : point2.y - point1.y};
    },

    getRotation : function(cur_p,next_p){
        var rotation = Math.atan((cur_p.x-next_p.x)/(cur_p.y-next_p.y))*180/Math.PI;
        if(rotation > 0 && cur_p.x-next_p.x < 0) {
            rotation += 180;
        }
        if(rotation < 0 && cur_p.x-next_p.x > 0) {
            rotation += 180;
        }
        return rotation;
    }
}