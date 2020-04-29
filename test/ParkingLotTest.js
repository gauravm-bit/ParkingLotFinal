const assert = require('chai').assert
const parkingLot = require('../app/ParkingLot.js')

let car = { }

describe(`Testing for Parking Lot service`, () => {
// empty parking lot before each test case
beforeEach(() => {
parkingLot.Lot = [];
})

//TC 1.1 let the driver park the car so that he can board his flight
it(`allow parking so the driver can board flight`, () => {
    let result = parkingLot.doParking(car)
    assert.isTrue(result)
})

//TC 1.2 if the car is already parked, system should not allow  to park again
it(`dont allow parking if already parked`, () => {
    try {
        parkingLot.doParking(car)
        let result = parkingLot.doParking(car)
        assert.isFalse(result)
    }   
    catch(e){
        console.log(e.message);
    }
 })

 //TC 2.1 let the driver unpark so he can go home
it(`allow unparking so the driver can home`, () => {
    parkingLot.doParking(car)
    let result = parkingLot.doUnpark(car)
    assert.isTrue(result)
})

//TC 2.2 if the car is already unparked system, should not allow to unpark again
it(`dont allow unparking if already unparked`, () => {
    try{
        parkingLot.doParking(car)
        parkingLot.doUnpark(car)
        let result = parkingLot.doUnpark(car)
        assert.isFalse(result)
    }
    catch(e)
    {
        console.log(e.message);
    }
})

}) 