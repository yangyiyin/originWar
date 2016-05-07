<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Administrator
 * Date: 16-4-9
 * Time: 下午10:14
 * To change this template use File | Settings | File Templates.
 */

$dir = '../originWar/res';
function getRes(&$list, $dir, $deep = 'res/') {
    $reses = scandir($dir);
    foreach ($reses as $res) {
        if($res == '.' || $res == '..') {
            continue;
        }
        if (is_dir($dir . '/' . $res)) {
            getRes($list, $dir . '/' . $res, $deep . $res . '/');
        } else {
            if (!strpos($res, '__deleted')) {
                $_key = str_replace('.', '_', $res);
                $list[$_key] = $deep . $res;
            }
        }
    }
}
$list = array();
getRes($list, $dir);
$out_put = str_replace('\\', '', json_encode($list));
$out_put = 'var res = ' . $out_put;
$out_put .= ';var g_resources = [];for (var i in res) {g_resources.push(res[i]);};';
$file_name = '../originWar/src/resource.js';
file_put_contents($file_name, $out_put);