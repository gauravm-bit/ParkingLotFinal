const parkingLot = require('../app/ParkingLot')
class ParkingLotAttendant {
    constructor() {
        this.newLot = new parkingLot();
    }

    AttendantPark = (car) => {
        let status = this.newLot.park(car);
        return status;
    }
}
module.exports = new ParkingLotAttendant;