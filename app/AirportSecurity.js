const parkingLot = require('../app/ParkingLot.js')
class airportSecurity {

    securityFullCheck = () => parkingLot.isFull();
}
module.exports = new airportSecurity