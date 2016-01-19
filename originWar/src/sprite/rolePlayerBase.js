//var rolePlayerClassOptions = {
//    ctor:function (res) {
//        this._super(res);
//    }
//};
//RolePlayerClass.call(rolePlayerClassOptions);
//var rolePlayerBaseSprite = cc.Sprite.extend(rolePlayerClassOptions);

var rolePlayerClassOptions = {
    ctor:function () {
        this._super();
    }
};
RolePlayerClass.call(rolePlayerClassOptions);
var rolePlayerBaseArmature = ccs.Armature.extend(rolePlayerClassOptions);