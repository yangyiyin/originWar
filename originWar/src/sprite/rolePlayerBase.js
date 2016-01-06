var rolePlayerClassOptions = {
    ctor:function (res) {
        this._super(res);
    }
};
RolePlayerClass.call(rolePlayerClassOptions);
var rolePlayerBaseSprite = cc.Sprite.extend(rolePlayerClassOptions);
