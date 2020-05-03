const parkingLot = require('../app/ParkingLot.js')
class owner {
    
    ownerFullCheck = () => {
        if(parkingLot.isFull())
            return true

     }

    emptySpacesCheck = () => {    
         if(parkingLot.emptySpacesPresent()){
             return true
         }
    }
    
    attendantPark = (car) => {
        if(this.emptySpacesCheck()){
            parkingLot.park(car)
            return true
        }
        else{
            throw new Error("Parking lot is full");
        }
    }


    }


module.exports = new owner