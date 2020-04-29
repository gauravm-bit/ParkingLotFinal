const parkingLot = require('../app/ParkingLot.js')
class owner {

    ownerFullCheck = () => parkingLot.isFull();
}
module.exports = new owner