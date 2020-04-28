class parkingLot{
    constructor(){
        this.Lot = [];
    }

    doParking = (car) => {
        if(this.Lot.includes(car))
        {
            return false;
        }
        this.Lot.push(car)
        return true;
    }

    doUnpark = (car) => {
        this.Lot.pop(car)
        return true;
    }
}
module.exports = new parkingLot 