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

    }


module.exports = new owner