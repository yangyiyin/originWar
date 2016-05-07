<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 16-4-9
 * Time: 下午8:28
 * To change this template use File | Settings | File Templates.
 */

$main = array(
    "src/resource.js",
    "src/GameConfig.js",
    "src/config.js"
);
$help = array(
    "src/help/common.js"
);
$class = array(
    "src/class/gamep.class.js",
    "src/class/log.class.js",
    "src/class/map.class.js",
    "src/class/music.class.js",
    "src/class/role.class.js",
    "src/class/bullet.class.js"
);
$lib = array(
    "src/lib/findwayAppointed.js"
);
$scene = array(
    "src/scene/main.js",
    "src/scene/start.js",
    "src/scene/playing.js"
);
$layer = array(
    "src/layer/musicBase.js",
    "src/layer/music.js",
    "src/layer/bgBase.js",
    "src/layer/bg.js",
    "src/layer/action.js",
    "src/layer/gamepBase.js",
    "src/layer/gamepPlaying.js",
    "src/layer/gamepSetting.js"
);
$sprite = array(
    "src/sprite/bg.js",
    "src/sprite/enemy.js",
    "src/sprite/roleEnemyBase.js",
    "src/sprite/roleEnemy.js",
    "src/sprite/rolePlayerBase.js",
    "src/sprite/rolePlayer.js",
    "src/sprite/bulletBase.js",
    "src/sprite/bullet.js"
);
$app = array(
    "src/app/bg.js",
    "src/app/bgPlaying.js",
    "src/app/rolePlayer.js",
    "src/app/roleEnemy.js",
    "src/app/gamepSetting.js",
    "src/app/gamepPlaying.js",
    "src/app/bullet.js"
);
$json = array_merge($main, $help, $class, $lib, $scene, $layer, $sprite, $app);

