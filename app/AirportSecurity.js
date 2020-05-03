const parkingLot = require('../app/ParkingLot.js')
class airportSecurity {

    securityFullCheck = () => {
       if(parkingLot.isFull())
            return true 
    }
}
module.exports = new airportSecurity