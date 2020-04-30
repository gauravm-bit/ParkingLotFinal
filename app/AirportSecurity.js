const parkingLot = require('../app/ParkingLot.js')
class airportSecurity {

    securityFullCheck = () => {
        if(parkingLot.isFull()){
            return true
        }
        return false
    }
}
module.exports = new airportSecurity