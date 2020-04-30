class parkingLot{
    constructor()
    {
        this.Lot = [];
        this.maximumCapacity = 4;
    }

    park = (car) => {
        if (this.isEmpty()) {
             this.Lot.push(car)
             return true
         }
         if(this.isFull()) {
            throw new Error("Parking lot is full");
        }
        else {
             var found = this.Lot.some(element => element.type == car.type )
             if (found) {
                throw new Error("Aready parked,no new spot will be alloted");
             }
             else {
                 this.Lot.push(car)
                 return true
             }
         }
     }

    unpark = (car) =>{
        if(this.isEmpty()){
            throw new Error("Parking lot is empty");
        }
        var found = this.Lot.some(element => element.type == car.type)
        if (found) {
            let index = this.Lot.indexOf(car)
            this.Lot.splice(index,1)
            return true;
        }
        else{
            throw new Error("Aready unparked the car");
        }
    }

    isFull = () => {
        if (this.Lot.length == this.maximumCapacity ) {
            return true
        }
        return false
    }

    isEmpty = () => { 
        if (this.Lot.length == 0){
            return true;
        }
        return false;
       }

    emptySpacesPresent = () => {
        if (this.Lot.length <= this.maximumCapacity){
            return true;
        }
        return false;
       }
}
module.exports = new parkingLot 