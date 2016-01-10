var roleEnemyClassOptions = {
    ctor:function (res) {
        this._super(res);
    }
};
RoleEnemyClass.call(roleEnemyClassOptions);
var roleEnemyBaseSprite = cc.Sprite.extend(roleEnemyClassOptions);

var roleEnemyClassOptions2 = {
    ctor:function () {
        this._super();
    }
};
RoleEnemyClass.call(roleEnemyClassOptions2);
var roleEnemyBaseArmature = ccs.Armature.extend(roleEnemyClassOptions2)