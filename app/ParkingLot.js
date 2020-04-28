class parkingLot{
    constructor(){
        this.Lot = [];
    }

    doParking = (car) => {
        this.Lot.push(car)
        return true;
    }
}
module.exports = new parkingLot 