var roleMiner = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var standby;
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (
                        structure.structureType == STRUCTURE_CONTAINER ) &&
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
             
                creep.moveTo(31, 37, {visualizePathStyle: {stroke: '#cc0000'}})
                //console.log(creep.memory.standby)
                if(creep.memory.standby==false){
                    creep.say('⌛  standby')
                    creep.memory.standby=true 
                }
                }
            }
        }
    }

module.exports = roleMiner;