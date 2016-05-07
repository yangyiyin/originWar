/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 16-4-18
 * Time: 下午10:15
 * To change this template use File | Settings | File Templates.
 */

var stage_config = [];
function stage_init_config(config){
    function init_roles(class_name, number){
        return {
            class_name : class_name,
            number : number,
            position : {}
        };
    }
    function init_players(players){
        var players_config = [];
        var player_item = {};
        for (var i in players) {
            player_item = init_roles(players[i][0], players[i][1]);
            player_item.position = {x : players[i][2][0], y : players[i][2][1]};
            players_config.push(player_item);
        }
        return players_config;
    }
    function init_enemies(enemies){
        var enemies_config = [];
        for (var i in enemies) {
            enemies_config.push(init_roles(enemies[i][0], enemies[i][1]));
        }
        return enemies_config;
    }
    var players = init_players(config[0]);
    var enemies = init_enemies(config[1]);
    return {
        players : players,
        enemies : enemies,
        map : {},
        music : {},
        speed : {}
    }
}
var stage1 = [
    [["appRolePlayerArmature", 1, [320, 50]], ["appRolePlayerArmature", 1, [320, 100]]],//player
    [["appRoleEnemyArmature", 5]],//enemies
    {}
];
stage_config.push(stage_init_config(stage1));

