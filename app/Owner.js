const parkingLot = require('../app/ParkingLot.js')
class owner {
    
    ownerFullCheck = () => {
        if(parkingLot.isFull()){
            return true
        }
        return false
     }

    emptySpacesCheck = () => {    
         if(parkingLot.emptySpacesPresent()){
             return true
         } 
         return false
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