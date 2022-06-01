var roleMaintainer = {
    /** @param {Creep} creep **/
    run: function(creep){
        //check energy levels
        if(creep.store[RESOURCE_ENERGY] > 0){
            //check if it does not have a target yet
            if (!creep.memory.maintaining){
                //getting list of structures
                var structures = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => ( structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE ||
                        structure.structureType == STRUCTURE_ROAD) &&
                        structure.hits/structure.hitsMax < 0.7
                })
                //set structure we are going to work on if there are any
                if(structures.length){
                creep.memory.maintaining=structures[0].id
                } else { 
                    console.log('nothing to repair, waiting');
                    creep.moveTo(37, 41, {visualizePathStyle: {stroke: '#cc0000'}})
                }
                //if we already have a target we are going to repair it till it is at 100% health
            } else if (creep.memory.maintaining) {
                var targ = Game.getObjectById(creep.memory.maintaining)
                if (targ.hits/targ.hitsMax < 1){
                    if ( creep.repair(targ) == ERR_NOT_IN_RANGE){
                        creep.moveTo(targ, {visualizePathStyle: {stroke: '#375203'}})
                    }
                } else {
                    //if the structure is fully repaired we clear the mem slot so a new one can be found
                    creep.memory.maintaining=null
                }
            }
        } else {
            //just refill energy if we are out
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && 
                structure.store[RESOURCE_ENERGY] > 100
                })
            if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#375203'}})
            } else if (!containers) {
                console.log('no energy found')
            }
            
        }
    }
}
module.exports = roleMaintainer;