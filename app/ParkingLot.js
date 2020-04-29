class parkingLot{
    constructor()
    {
        this.Lot = [];
    }

    doParking = (car) => {
        if(this.Lot.includes(car))
        {
            throw new Error("Aready parked, no new spot will be alloted")
        }
        this.Lot.push(car)
        return true;
    }

    doUnpark = (car) => {
        if(this.Lot.includes(car))
        {
        this.Lot.pop(car)
        return true;
        }
        return false;
    }
}
module.exports = new parkingLot 