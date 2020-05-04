let count = 0;
class parkingLot{
    
    constructor()
    {
        this.Lot1 = [];
        this.Lot2 = [];
        this.maximumCapacity = 4;
    }

    park = (car) => {
         if(this.isFull()) {
            throw new Error("Parking lot is full");
        }
        else {
             if (this.found1(car) || this.found2(car)) {
                throw new Error("Aready parked,no new spot will be alloted");
             }
             else {
                 if(count % 2 == 0){
                 this.Lot1.push(car)
                 count++
                 return true
                 }
                 else{
                     this.Lot2.push(car)
                     count++
                     return true
                 }
              }
         }
     }

    unpark = (car) => {
        if (this.found1(car)) {
            this.Lot1.splice(this.Lot1.indexOf(car),1)
            return true
        }
        else if(this.found2(car)){
            this.Lot2.splice(this.Lot2.indexOf(car),1)
            return true
        }
        else{
            throw new Error("Aready unparked the car");
        }
    }

    isFull = () => {
        if (this.Lot1.length == this.maximumCapacity && this.Lot2.length == this.maximumCapacity) {
            return true
        }
        return false
    }

    emptySpacesPresent = () => {
        if (this.maximumCapacity > this.Lot1.length || this.maximumCapacity > this.Lot2.length){
            return true;
        }
        return false;
       }

    findCar = (car) => {
        if (this.found1(car) || this.found2(car)) {
            return true
        }
        throw new Error("Car is not present in the Lot");
    }

    //functions to search car in the lot

    found1 = (car) => { 
        if(this.Lot1.some(element => element.type == car.type)){
        return true
        }
        return false
     }

     found2 = (car) => { 
        if(this.Lot2.some(element => element.type == car.type)){
        return true
        }
        return false
     }
}
module.exports = new parkingLot 