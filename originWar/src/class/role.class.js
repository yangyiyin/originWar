/**
 * 角色类,构造函数，接口定义类
 * User: yyy
 * Date: 15-12-25
 * Time: 下午10:56
 */
var RoleClass = function(){
    this.source = null;
    this.baseInfo = {
        hp:0,//生命值
        mp:0,//魔法值
        name:'',//名字
        speed:0,//移动速度
        race:0//族类
    }
    this.stand = function(){}//站立
    this.move = function(){}//移动
}
var RolePlayerClass = function(){
    RoleClass.call(this);
    this.baseInfo = {
        hp:0,//生命值
        mp:0,//魔法值
        name:'',//名字
        speed:0,//移动速度
        race:0,//族类
        attack_type:1,//攻击类型
        attack_value:0,//攻击力
        define_type:1,//防御类型
        define_value:0//防御力
    }
    this.attack = function(){}//攻击
    this.define = function(){}//防御
}
var RoleEnemyClass = function(){
    RoleClass.call(this);
    this.baseInfo = {
        hp:0,//生命值
        mp:0,//魔法值
        name:'',//名字
        speed:0,//移动速度
        race:0,//族类
        attack_type:1,//攻击类型
        attack_value:0,//攻击力
        define_type:1,//防御类型
        define_value:0//防御力
    }
    this.attack = function(){}//攻击
    this.define = function(){}//防御
}