/**
 * Created with yyy.
 * User: yyy
 * Date: 15-2-9
 * Time: 下午3:48
 */

/*
 * 智能寻路
 * */

var findway = function(options){
    var _this = this;
    _this.start_point = {
        x:600,
        y:700,
        g:0,
        h:0,
        f:0,
        f_point:'start'
    }
    _this.obstacle = [
        {x1:45,x2:495,y1:475,y2:525,x:270,y:500,width:450,height:50}
    ];


    //<div id="obstract" style='background: #999;position: absolute;left: 245px;bottom: 475px;width: 150px;height:50px'></div>
    _this.end_point = {
        x:320,
        y:50
    }
    if(options){
        if(options.start_point) _this.start_point = options.start_point;
        if(options.obstacle) _this.obstacle = options.obstacle;
        if(options.end_point) _this.end_point = options.end_point;
    }

    //横向或纵向距离
    _this.g1 =10;
    //斜向距离
    _this.g2 =14;
    _this.current_point = _this.start_point;
    var open_list = [],close_list = [_this.current_point];

    //获得当前节点的孩子周围节点
    _this.getChildPoints = function(){
        if(!_this.current_point) return ;
        var pl={},pr={},pt={},pb={},plt={},prt={},plb={},prb={};
        var pp=[];
        pl.x=plt.x=plb.x=_this.current_point.x-_this.g1;
        pl.y=pr.y=_this.current_point.y;
        pr.x=prt.x=prb.x=_this.current_point.x+_this.g1;
        pt.x=pb.x= _this.current_point.x;
        pt.y=plt.y=prt.y = _this.current_point.y+_this.g1;
        pb.y=plb.y=prb.y=_this.current_point.y-_this.g1;

        //获得每个点的代价估值
        //G
        pl.g=pr.g=pt.g=pb.g=_this.current_point.g+_this.g1;
        plt.g=prt.g=plb.g=prb.g= _this.current_point.g+_this.g2;
        //H
        pl.h=Math.abs(_this.end_point.x-pl.x)+Math.abs(_this.end_point.y-pl.y);
        pr.h=Math.abs(_this.end_point.x-pr.x)+Math.abs(_this.end_point.y-pr.y);
        pt.h=Math.abs(_this.end_point.x-pt.x)+Math.abs(_this.end_point.y-pt.y);
        pb.h=Math.abs(_this.end_point.x-pb.x)+Math.abs(_this.end_point.y-pb.y);
        plt.h=Math.abs(_this.end_point.x-plt.x)+Math.abs(_this.end_point.y-plt.y);
        prt.h=Math.abs(_this.end_point.x-prt.x)+Math.abs(_this.end_point.y-prt.y);
        plb.h=Math.abs(_this.end_point.x-plb.x)+Math.abs(_this.end_point.y-plb.y);
        prb.h=Math.abs(_this.end_point.x-prb.x)+Math.abs(_this.end_point.y-prb.y);
        //F
        pl.f=pl.g+pl.h;
        pr.f=pr.g+pr.h;
        pt.f=pt.g+pt.h;
        pb.f=pb.g+pb.h;
        plt.f=plt.g+plt.h;
        prt.f=prt.g+prt.h;
        plb.f=plb.g+plb.h;
        prb.f=prb.g+prb.h;
        var has_no = 0;
        _this.checkPoint(pl)==false?has_no++:_this.addOpenlist(pl);
        _this.checkPoint(pr)==false?has_no++:_this.addOpenlist(pr);
        _this.checkPoint(pt)==false?has_no++:_this.addOpenlist(pt);
        _this.checkPoint(pb)==false?has_no++:_this.addOpenlist(pb);

        if(_this.checkPoint(plt)){
            //如果是在障碍顶点边缘，则去掉斜角走
            if(!_this.checkIsCorner(_this.current_point) && _this.current_point){
                _this.addOpenlist(plt);
            }
        }else{
            has_no++;
        }
        if(_this.checkPoint(plb)){
            //如果是在障碍顶点边缘，则去掉斜角走
            if(!_this.checkIsCorner(_this.current_point) && _this.current_point){
                _this.addOpenlist(plb);
            }
        }else{
            has_no++;
        }
        if(_this.checkPoint(prb)){
            //如果是在障碍顶点边缘，则去掉斜角走
            if(!_this.checkIsCorner(_this.current_point) && _this.current_point){
                _this.addOpenlist(prb);
            }
        }else{
            has_no++;
        }
        if(_this.checkPoint(prt)){
            //如果是在障碍顶点边缘，则去掉斜角走
            if(!_this.checkIsCorner(_this.current_point) && _this.current_point){
                _this.addOpenlist(prt);
            }
        }else{
            has_no++;
        }

        //没有路就返回
        if(has_no == 8){
           return ;
        }

        //把每个点加入到开启列表中
//        for(var i =0;i<pp.length;i++){
//            console.log(123)
//            _this.addOpenlist(pp[i]);
//        }
        //获得最小F值
        var min_f = 99999;
        var index = 0;
        // ////console.log(pp);
        //获得最小的F值，设置当前点；
        for(var i =0;i<open_list.length;i++){
            if(open_list[i].f<min_f && open_list[i].f!=undefined){
                min_f=open_list[i].f;
                index = i;
            }
        }
        // open_list[index].f_point=_this.current_point;
        _this.current_point = open_list[index];
        open_list.splice(index,1);
        _this.addCloselist(_this.current_point);

        //检测是否是终点，如果是返回，否则继续
        //console.log(_this.current_point);
        if(_this.checkIsEndPoint(_this.current_point)){


        }else{
            //console.log(1);
            _this.getChildPoints();

        }
        return;
    }
    /*
     * 加入开启列表*/
    _this.addOpenlist=function(point){
        //先检测是否含有，有的话就不操作，没有就加入
        var is_has = 0;
        for(var i=0;i<open_list.length;i++){
            if(open_list[i].x == point.x && open_list[i].y == point.y){
                //根据g值是否小于原有g值,重定向父节点
                if(point.g < open_list[i].g){

                    open_list[i].g = point.g;
                    open_list[i].f = open_list[i].g+open_list[i].h;
                    open_list[i].f_point = _this.current_point;
                }
                is_has = 1;
            }
        }
        if(is_has ==1){
            return;
        }
        ////console.log(4);
        //定向父节点
        point.f_point = _this.current_point;
        if(point.x != _this.current_point.x && point.y != _this.current_point.y){
            point.oblique = 1;
        }else{
            point.oblique = 0;
        }
        // //console.log(point);
        //加入开启列表
        open_list.push(point);
        return true;
    }

    /*
     * 加入关闭列表*/
    _this.addCloselist=function(point){
        //先检测是否含有，有的话就不操作，没有就加入
        var is_has = 0;
        if(point){
            close_list.forEach(function(_thispoint){
                if(_thispoint.x == point.x && _thispoint.y == point.y){
                    is_has=1;
                }

            });
        }

        if(is_has==1){
            return ;
        }
        //console.log(point);
        close_list.push(point);
        return true;
    }

    /*
     * 检测是否到达终点*/
    _this.checkIsEndPoint=function(point){
        if(!point) return false;
        if(Math.abs(_this.end_point.x-point.x)<_this.g1&&Math.abs(_this.end_point.y-point.y)<_this.g1){
            this.way = [];
            this.getWay(point);
            return true;
        }else{
            return false;
        }
    }

    /*
     * 检测是否为合格的点*/
    _this.checkPoint = function(point){
        //不和障碍物相交
        var is_obstacle_over = 0;

        _this.obstacle.forEach(function(obstacle){
            //相交
            if((Math.abs(obstacle.x-point.x)<(obstacle.width/2+_this.g1/2))&&(Math.abs(obstacle.y-point.y)<(obstacle.height/2+_this.g1/2))){

                is_obstacle_over =1;
            }
        });
        //检测是否在关闭列表中
        var is_closed = 0;
        close_list.forEach(function(closepoint){
            if(closepoint.x==point.x&&closepoint.y==point.y){
                is_closed = 1;
            }
        });
        if( is_obstacle_over == 1 || is_closed == 1){
            return false;
        }
        //没有任何障碍物相交，返回本身
        return point;
    }
    _this.checkIsCorner = function(point){

        //不和障碍物相交
        var is_corner = 0;
        if(point){
            _this.obstacle.forEach(function(obstacle){
                var checkX1 = (Math.abs(obstacle.x1-point.x)<=_this.g1)&&(Math.abs(obstacle.y1-point.y)<_this.g1);
                var checkX2 = (Math.abs(obstacle.x1-point.x)<=_this.g1)&&(Math.abs(obstacle.y2-point.y)<_this.g1);
                var checkX3 = (Math.abs(obstacle.x2-point.x)<=_this.g1)&&(Math.abs(obstacle.y1-point.y)<_this.g1);
                var checkX4 = (Math.abs(obstacle.x2-point.x)<=_this.g1)&&(Math.abs(obstacle.y2-point.y)<_this.g1);
                //相交
                if( checkX1 || checkX2 || checkX3 || checkX4){

                    is_corner =1;
                    return 1;
                }
            });
        }
        return is_corner;
    }

    _this.getWay = function(point){
        if(point.f_point != 'start'){
            _this.way.unshift(point);
            _this.getWay(point.f_point);
        }else{
            return;
        }
    }
    //获得所有的节点
  //  _this.getChildPoints();
    _this.doFindway = function(){
        _this.current_point = _this.start_point;
        _this.getChildPoints();
        return _this.way;
    }
//    return _this.way;
}