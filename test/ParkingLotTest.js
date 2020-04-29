const assert = require('chai').assert
const parkingLot = require('../app/ParkingLot.js')


let car1 = { type : 'tata'}
let car2 = { type : 'ford'}
let car3 = { type : 'maruti'}
let car4 = { type : 'mitsubishi'}
let car5 = { type : 'honda'}

describe(`Testing for Parking Lot service`, () => {
// empty parking lot before each test case
beforeEach(() => {
parkingLot.Lot = [];
})

//TC 1.1 let the driver park the car so that he can board his flight
it(`allow parking so the driver can board flight`, () => {
     let result = parkingLot.park(car1);
     assert.isTrue(result)
})

//TC 1.2 if the car is already parked, system should not allow  to park again
it(`dont allow parking if already parked`, () => {
   try {
        parkingLot.park(car1)
        parkingLot.park(car2)
        let result = parkingLot.park(car1)
        assert.isFalse(result)
    }   
    catch(e){
        console.log(e.message);
    }
 })

 //TC 2.1 let the driver unpark so he can go home
it(`allow unparking so the driver can home`, () => {
    parkingLot.park(car3)
    let result = parkingLot.unpark(car3)
    assert.isTrue(result)
})

//TC 2.2 if the car is already unparked system, should not allow to unpark again
it(`dont allow unparking if already unparked`, () => {
    try{
        parkingLot.park(car4)
        parkingLot.park(car1)
        parkingLot.unpark(car4)
        let result = parkingLot.unpark(car4)
        assert.isFalse(result)
    }
    catch(e)
    {
        console.log(e.message);
    }
})

}) 