
var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var standby;
        if(creep.store.getFreeCapacity() > 0) {
            var containers = Game.rooms.E53N12.find(FIND_STRUCTURES , {
                filter: (structure) => 
                        structure.structureType == STRUCTURE_CONTAINER &&
                        structure.store[RESOURCE_ENERGY] > 150
            });
            //console.log('containers contain' + containers)
            if (containers.length != 0){
                if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#cc0000'}})
                    console.log(creep + "getting from container")
                }
        } 
        else {
            if(creep.store.getFreeCapacity() > 0) {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER ) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                creep.memory.standby=false
            }
            else if(targets.length === 0) {
                creep.moveTo(28, 32, {visualizePathStyle: {stroke: '#cc0000'}})
                if(creep.memory.standby==false){
                    creep.say('⌛  standby')
                    creep.memory.standby=true 
                //}
                }
            }
        }
    }
}

module.exports = roleHarvester;