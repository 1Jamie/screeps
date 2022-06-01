var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMaintainer = require('role.maintainer');
var roleMiner = require('role.miner');
var roleMiner2 = require('role.miner2');
var roleMaintainerwalls = require('role.maintainerwalls');
var roleDefender = require('role.defender');

module.exports.loop = function () {
    
    //build out our variables we need, these are the desired counts
    var upgCnt = 1;
    var harvesterCnt = 2;
    var builderCnt = 2;
    var minerCnt = 2;
    var miner2Cnt = 2;
    var maintCnt = 2;
    var maintwallsCnt = 2 ;
    var defenderCnt = 1;
    //variables for unit counts
    var harvesterWrld = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builderWrld = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgWrld = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var maintWrld = _.filter(Game.creeps, (creep) => creep.memory.role== 'maintainer');
    var minerWrld = _.filter(Game.creeps, (creep) => creep.memory.role== 'miner');
    var miner2Wrld = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner2');
    var maintwallsWrld = _.filter(Game.creeps, (creep) => creep.memory.role== 'maintainerwalls');
    var defenderWrld = _.filter(Game.creeps, (creep) => creep.memory.role== 'defender')
    var availEnergy = Game.spawns.Spawn1.room.energyAvailable - 100
    
    //harvester count monitor and generator
    if(harvesterWrld.length < harvesterCnt ) {
        if(Game.spawns.Spawn1.room.energyAvailable >= 300){
            console.log('not enough harvesters, making more :' + harvesterWrld.length)
            var newName = 'harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,MOVE], newName,
                {memory: {role: 'harvester'}});
        }
        else{
            console.log('not enough energy to spawn Harvester, waiting')
        }
    }
    
    //miner ocunt monitor and spawner
    if(minerWrld.length < minerCnt ) {
        if(availEnergy >= 450){
            console.log('not enough miner, making more :' + minerWrld.length)
            var newName = 'miner' + Game.time;
            console.log('Spawning new miner: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE], newName,
                {memory: {role: 'miner'}});
        }
        else{
            console.log('not enough energy to spawn miner, waiting')
        }
    }
    //temp work around to get that second energy source
    if( miner2Wrld.length < miner2Cnt ) {
        if(availEnergy >= 550){
            console.log('not enough miner2, making more :' + miner2Wrld.length)
            var newName = 'miner2-' + Game.time;
            console.log('Spawning new miner2: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
                {memory: {role: 'miner2'}});
        }
        else{
            console.log('not enough energy to spawn miner2, waiting')
        }
    }

    //builder count monitor and generator
    if(builderWrld.length < builderCnt ) {
        if(availEnergy >= 500){
        console.log('not enough builders, making more :' + builderWrld.length)
        var newName = 'builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'builder'}});
        }
        else{
            console.log('not enough energy to spawn builder, waiting')
        }
    }

    //maintainer count and spawner
    if( maintWrld.length < maintCnt ) {
        if(availEnergy >= 500){
        console.log('not enough maintainers, making more :' + builderWrld.length)
        var newName = 'maintainer' + Game.time;
        console.log('Spawning new maintainer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'maintainer'}});
        }
        else{
            console.log('not enough energy to spawn maintainer, waiting')
        }
    }

    
    //wall maintainer count and spawner
    if( maintwallsWrld.length < maintwallsCnt ) {
        if(availEnergy >= 500){
        console.log('not enough wall maintainers, making more :' + builderWrld.length)
        var newName = 'maintainerwalls' + Game.time;
        console.log('Spawning new wall maintainer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'maintainerwalls'}});
        }
        else{
            console.log('not enough energy to spawn wall maintainer, waiting')
        }
    }
    
    //upgrader count monitor and generator
    if(upgWrld.length < upgCnt ) {
        if(Game.spawns.Spawn1.room.energyAvailable >= 400){
        console.log('not enough upgraders, making more :' + upgWrld.length)
        var newName = 'upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'upgrader'}});
        }
        else{
            console.log('not enough energy to spawn upgrader, waiting')
        }
    }

    //manage defenders
    if(defenderWrld.length < defenderCnt){
        if(Game.spawns.Spawn1.room.energyAvailable >= 500){
            console.log('not enough defenders, spawnining more' + defenderWrld.length)
            var newName = 'defender' + Game.time;
            Game.spawns['Spawn1'].spawnCreep([ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,TOUGH,TOUGH], newName, 
                {memory: {role: 'defender'}})
        } else {
            console.log('not enough energy to spawn defender')
        }
    }
    
    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'maintainer'){
            roleMaintainer.run(creep);
        }
        if(creep.memory.role == 'miner2'){
            roleMiner2.run(creep);
        }
        if(creep.memory.role == 'maintainerwalls'){
            roleMaintainerwalls.run(creep);
        }
        if(creep.memory.role == 'defender'){
            roleDefender.run(creep)
        }
    }
    
    //give us some visual updates for building units
    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    
    //deal with old names 
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

}