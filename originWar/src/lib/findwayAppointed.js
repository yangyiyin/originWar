/**
 * Created with yyy.
 * User: yyy
 * Date: 15-2-9
 * Time: 下午3:48
 */

/*
 * 指定路线寻路
 * */

var findwayAppointed = function(){
    this.ways = ways;
    this.getWay = function(index){
        return this.ways[index];
    }
    this.setWay = function(){}
    //根据已有的路线和当前点所处位置，进行路线继续行走
    this.continueWay = function(point,way){
        var pre_ponit = null,after_point = null,next_i = null;
        var continue_way = [];
        for(var i in way){
            if(!way[parseInt(i)+1] && !next_i) break;
            if(!next_i){
                pre_ponit = way[i];
                after_point = way[parseInt(i)+1];
                var ret_x = (point.x-pre_ponit.x)*(point.x-after_point.x);
                var ret_y = (point.y-pre_ponit.y)*(point.x-after_point.y);
                if(ret_x <=0 && ret_y <= 0){
                    next_i = i;
                }
            }
            if(next_i && i > next_i){
                continue_way.push(way[i]);
            }
        }
        return continue_way;
    }

}

var ways = {
    way1:[{x:100,y:600},{x:280,y:250},{x:320,y:0}]
};