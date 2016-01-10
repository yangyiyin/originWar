var bulletClassOptions = {
    ctor:function (res) {
        this._super(res);
    }
};
BulletClass.call(bulletClassOptions);
var bulletBaseArmature = ccs.Armature.extend(bulletClassOptions);
