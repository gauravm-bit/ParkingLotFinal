const assert = require('chai').assert
const expect = require('chai').expect
const sinon = require('sinon');

const parkingLot = require('../app/ParkingLot.js')
const owner = require('../app/Owner.js')
const airportSecurity = require('../app/AirportSecurity.js')

let car1 = { type : 'tata'}
let car2 = { type : 'ford'}
let car3 = { type : 'maruti'}
let car4 = { type : 'mitsubishi'}
let car5 = { type : 'honda'}
let car6,car7,car8;

describe(`Testing for Parking Lot service`, () => {
// empty parking lot before each test case
beforeEach(() => {
parkingLot.Lot = [];
})

//TC 1.1 let the driver park the car so that he can board his flight
it(`allow parking so the driver can board flight`, () => {
     let result = parkingLot.park(car1);
     expect(result).to.eql(true)
 })

//TC 1.2 if the car is already parked, system should not allow  to park again
it(`dont allow parking if already parked`, () => {
   try {
        parkingLot.park(car1)
        parkingLot.park(car2)
        parkingLot.park(car1)
        
    }   
    catch(e){
        expect(e.message).to.eql("Aready parked,no new spot will be alloted");
    }
 })

 //TC 2.1 let the driver unpark so he can go home
it(`allow unparking so the driver can home`, () => {
    parkingLot.park(car3)
    let result = parkingLot.unpark(car3)
    expect(result).to.eql(true)
})

//TC 2.2 if the car is already unparked system, should not allow to unpark again
it(`dont allow unparking if already unparked`, () => {
    try{
        parkingLot.park(car4)
        parkingLot.park(car1)
        parkingLot.unpark(car4)
        parkingLot.unpark(car4)
        
    }
    catch(e)
    {
        expect(e.message).to.eql("Aready unparked the car");

         (e.message);
    }
})

//TC 3.1 if the lot is full owner puts out full sign
it(`if the lot is full put out sign`, () => {
        parkingLot.park(car1)
        parkingLot.park(car2)
        parkingLot.park(car3)
        parkingLot.park(car4)
        let result = owner.ownerFullCheck();
        expect(result).to.eql(true)
}) 

//TC 4.1 if the lot is full airport personal redirects security
it(`if the lot is full airport personal redirects security`, () => {
        parkingLot.park(car1)
        parkingLot.park(car2)
        parkingLot.park(car3)
        parkingLot.park(car4)
        
        sinon.spy(airportSecurity,"securityFullCheck")
        airportSecurity.securityFullCheck()
        expect(airportSecurity.securityFullCheck.returned(true))
        airportSecurity.securityFullCheck.restore()
}) 

//TC 5.1 if the lot is not full owner removes the full sign from outside
it(`if the lot is not full owner removes the full sign` , () => {
    parkingLot.park(car5)
    parkingLot.park(car3)
    parkingLot.park(car1)

    sinon.spy(owner,"emptySpacesCheck")
    owner.emptySpacesCheck()
    expect(owner.emptySpacesCheck.returned(true))
    owner.emptySpacesCheck.restore()
})

//TC 6.1 making the parking lot attendant to park the car 
it(`make the parking lot attendant to park the car so that`, () => {
try{ 
    sinon.spy(owner,"attendantPark") 
     parkingLot.park(car1)
     parkingLot.park(car2)
     owner.attendantPark(car3)
     owner.attendantPark(car4)
     owner.attendantPark(car5)
     }
    catch(e)
    {
        owner.attendantPark.threw("Parking lot is full");    
    }
})

//TC 7.1 find the car of the driver so that he can go home
it(`find the car so that driver can go home`, () => {
    
        sinon.spy(parkingLot,"findCar")
        parkingLot.park(car1)
        parkingLot.park(car4)
        parkingLot.park(car5)
        parkingLot.findCar(car4)
        
        expect(parkingLot.findCar.returned(true))
        parkingLot.findCar.restore()
})

//TC 7.2 if car is not found throw an error stating car is not present
it(`if the car is not present give a message`, () => {
    try{
        sinon.spy(parkingLot,"findCar")
        parkingLot.findCar(car4)
    }
    catch(e)
    {
         parkingLot.findCar.threw("Car is not present in the Lot")
    }
   
})

//TC 8.1 adding a car with timestamp so that they can be charged
it(`adding a car with a timestamp `, () => {
    let car6 = {type : 'camry',Time:Date()}
    let car7 = {type : 'masserati',Time:Date()}
    parkingLot.park(car6)
    parkingLot.park(car7)

    let result = parkingLot.findCar(car6)
    expect(result).to.be.true
     
     
})

})