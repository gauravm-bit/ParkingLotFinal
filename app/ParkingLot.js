const owner = require('../app/Owner')
const airportSecurity = require('../app/AirportSecurity')
class parkingLot {

    constructor(numberOfLots, capacityOfEveryLot, capacityOfParkingLot) {
        this.parkingLot;
        this.ParkingLotStructure(numberOfLots, capacityOfEveryLot)
        this.capacityOfParkingLot = capacityOfParkingLot;
        this.carCount = 0;
    }

    ParkingLotStructure = (numberOfLots, capacityOfEveryLot) => {
        this.parkingLot = [];
        for (let lot = 0; lot < numberOfLots; lot++) {
            this.parkingLot[lot] = [capacityOfEveryLot];
            for (let slot = 0; slot < capacityOfEveryLot; slot++) {
                this.parkingLot[lot][slot] = null;
            }
        }
    }

    park = (car) => {
            if (this.isFull()){
            throw new Error('Parking lot is full');
        }
        if (typeof car === 'object' && car != null) {
                if (car.driverType == 'HANDICAP') {
                    this.findHandicapSlot(car);
                }
                else if (car.carType == 'LARGE') {
                    this.findSlotForLargeCar(car);
                }
                else if (car.driverType == 'NORMAL' || car.carType == 'SMALL') {
                    this.findSlotForNormalDriver(car);
                }
        }else{
            throw new Error('car must be an object and cannot be null');
        }
        return true;
    }
            
    unpark = (car) => {
        for (let lot = 0; lot < this.parkingLot.length; lot++) {
            for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
                if (this.parkingLot[lot][slot] === car) {
                    this.parkingLot[lot][slot] = null;
                    this.carCount--;
                    if (this.carCount == this.capacityOfParkingLot - 1){
                        owner.parkingSpaceAvailable();
                    }
                    return true;
                }
                else{
                    throw new Error('Aready unparked the car');
                }
            }
        }    
    }

    isFull = () => {
        if (this.carCount == this.capacityOfParkingLot) {
            owner.isFull();
            airportSecurity.isFull();
            return true
        }
        return false
    }

    findCar = (car) => {
        for (let lot = 0; lot < this.parkingLot.length; lot++) {
            for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
                if (this.parkingLot[lot][slot] === car) {
                    let positionOfCar = { lot: lot, slot: slot };
                    return true;
                }
                else{
                    throw new Error('Car is not present in the Lot');
                }
            }
        }
    }

    findHandicapSlot = (car) => {
        for (let lot = 0; lot < this.parkingLot.length; lot++) {
            for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
                if (this.parkingLot[lot][slot] === null) {
                    this.parkingLot[lot][slot] = car;
                    this.carCount++;
                    this.isFull();
                    return true;
                }
            }
        }
    }

    findSlotForNormalDriver = (car) => {
        for (let lot = 0; lot < this.parkingLot.length; lot++) {
            for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
                if (this.parkingLot[slot][lot] === null) {
                    this.parkingLot[slot][lot] = car;
                    this.carCount++;
                    this.isFull();
                    return true;
                }
            }
        }
    }

    findSlotForLargeCar = (car) => { 
        let emptyArray = [];
        for(let lot = 0; lot < this.parkingLot.length; lot++){
            let largelot = 0;
            for(let slot = 0; slot < this.parkingLot[lot].length; slot++) {
                if(this.parkingLot[lot][slot] === null) {
                    largelot++;
                }
            }
            emptyArray[lot] = largelot - 1;
        }
        let largelot = Math.max.apply(null,emptyArray)
        for(let slot = 0; slot < this.parkingLot[largelot].length; slot++){
            if(this.parkingLot[largelot][slot] === null) {
                this.parkingLot[largelot][slot] = car;
                this.carCount++;
                this.isFull();
                return true;
            }
        }
    }

    findParameter = (parameter) => {
        let vehicles = [];
        let keys = Object.keys(parameter);
        let values = Object.values(parameter);

        for(let lot = 0; lot < this.parkingLot.length; lot++){
            for(let slot = 0; slot < this.parkingLot.length; slot++) {
                if(this.parkingLot[lot][slot] != null) {
                    if(
                        this.parkingLot[lot][slot][keys[lot]] === values[lot] &&
                        this.parkingLot[lot][slot][keys[lot + 1]] === values[lot + 1]
                    ) {
                        let vehiclePosition = {
                            lot: lot,
                            slot : slot
                        }
                        vehicles.push(vehiclePosition);
                    }
                    
                }
            }
        }
        return vehicles;
    };

    checkParkedBeforeMinutes = (minute) => {
        let vehicles = [];
        let currentTime = new Date().getMinutes();
        if(minute != undefined) {
        for (let lot = 0; lot < this.parkingLot.length; lot++) {
          for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
            if (this.parkingLot[lot][slot] != null) {
              if (currentTime - this.parkingLot[lot][slot].parkedTime <= minute) {
                let vehiclePosition = {
                  lot: lot,
                  slot: slot,
                };
                vehicles.push(vehiclePosition);
              }
            }
          }
        }
      }
        return vehicles;
      };
    
    
    

}
module.exports = parkingLot;