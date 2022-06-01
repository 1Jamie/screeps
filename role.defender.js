//this is a bs defender i whipped up in emergency, will build a real one shortly
var roleDefender = {
        /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.room.find(FIND_HOSTILE_CREEPS).length != 0){
            console.log('enemy creep found!')
            var targets = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);;
            if (creep.attack(targets) == ERR_NOT_IN_RANGE){
                creep.moveTo(targets, {visualizePathStyle: {stroke: '#8f32a8'}});
            }
        }
    }
}

module.exports = roleDefender