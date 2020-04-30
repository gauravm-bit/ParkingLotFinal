const parkingLot = require('../app/ParkingLot.js')
class owner {
    
    ownerFullCheck = () => { parkingLot.isFull() }

    emptySpacesCheck = () => { parkingLot.emptySpacesPresent() }
    
    }


module.exports = new owner