
//just a lazy secondary miner to get the secondary energy source in my room
var roleMiner2 = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var standby;
        if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
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
             
                creep.moveTo( 35, 40, {visualizePathStyle: {stroke: '#cc0000'}})
                //console.log(creep.memory.standby)
                if(creep.memory.standby==false){
                    creep.say('⌛  standby')
                    creep.memory.standby=true 
                }
                }
            }
        }
    }

module.exports = roleMiner2;