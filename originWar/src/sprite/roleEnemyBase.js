var roleEnemyClassOptions = {
    ctor:function (res) {
        this._super(res);
    }
};
RoleEnemyClass.call(roleEnemyClassOptions);
var roleEnemyBaseSprite = cc.Sprite.extend(roleEnemyClassOptions);
