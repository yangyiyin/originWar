var res = {
    bg_png : "res/bg.png",
    role_png:"res/role.png",
    role_plist:"res/role.plist",
    gameSetting_plist:"res/gameSetting.plist",
    gameSetting_png:"res/gameSetting.plist",
    CloseNormal_png:"res/CloseNormal.png",
    CloseSelected_png:"res/CloseSelected.png",
//    effect_mp3:"res/music/effect.mp3",
    effect_mp3:"res/music/effect2.wav",
    background_music_1 : "res/music/bg2.mp3",
    Animation_json: "res/NewAnimation.ExportJson",
    Bullet1Animation_ExportJson: "res/Bullet1Animation.ExportJson",
    Bullet1Animation0png:"res/Bullet1Animation0.png",
    Bullet1Animation0plist:"res/Bullet1Animation0.plist",
    bullet1png:"res/bullet1.png",
    bullet1plist:"res/bullet1.plist"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}