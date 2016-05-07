<?php
/**
 * Created by JetBrains PhpStorm.
 * User =>  Administrator
 * Date =>  16-4-9
 * Time =>  下午8 => 28
 * To change this template use File | Settings | File Templates.
 */

include_once('./jsList.php');
$out_put = array(
    "project_type" => "javascript",
    "debugMode" => 1,
    "showFPS" => true,
    "frameRate" => 60,
    "id" => "gameCanvas",
    "renderMode" => 0,
    "engineDir" => "frameworks/cocos2d-html5",
    "modules" => array(
    "cocos2d","extensions"
    )
);
$out_put['jsList'] = $json;
$out_put = str_replace('\\', '', json_encode($out_put));
$file_name = '../originWar/project.json';
file_put_contents($file_name, $out_put);



