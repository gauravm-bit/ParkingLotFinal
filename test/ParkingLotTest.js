const assert = require('chai').assert
const expect = require('chai').expect
const sinon = require('sinon');

const parkingLot = require('../app/ParkingLot.js')
const owner = require('../app/Owner.js')
const airportSecurity = require('../app/AirportSecurity.js')
let car =   [   car1 = { type : 'tata'},
                car2 = { type : 'ford'},
                car3 = { type : 'maruti'},
            ]
let car4 = { type : 'mitsubishi'}
let car5 = { type : 'honda'} 
let cars =  [
                car6 = {type : 'camry',Time:Date()},
                car7 = {type : 'masserati',Time:Date()}
            ]


describe(`Testing for Parking Lot service`, () => {
// empty parking lot before each test case
beforeEach(() => {
parkingLot.Lot = [];
})

//TC 1.1 let the driver park the car so that he can board his flight
it(`allow parking so the driver can board flight`, () => {
     let result = parkingLot.park(car4);
     expect(result).to.eql(true)
 })

//TC 1.2 if the car is already parked, system should not allow  to park again
it(`dont allow parking if already parked`, () => {
   try {
           parkingLot.park(car4)
           parkingLot.park(car4) 
    }   
    catch(e){
        expect(e.message).to.eql("Aready parked,no new spot will be alloted");
    }
 })

 //TC 2.1 let the driver unpark so he can go home
it(`allow unparking so the driver can home`, () => {
    parkingLot.park(car4)
    let result = parkingLot.unpark(car4)
    expect(result).to.eql(true)
})

//TC 2.2 if the car is already unparked system, should not allow to unpark again
it(`dont allow unparking if already unparked`, () => {
   try{
        car.forEach(parkingLot.park)
        parkingLot.unpark(car1)
        parkingLot.unpark(car1)
               
    }
    catch(e)
    {
       expect(e.message).to.eql("Aready unparked the car");
    }
})

//TC 3.1 if the lot is full owner puts out full sign
it(`if the lot is full put out sign`, () => {
        car.forEach(parkingLot.park)
        parkingLot.park(car4)
        let result = owner.ownerFullCheck();
        expect(result).to.eql(true)
}) 

//TC 4.1 if the lot is full airport personal redirects security
it(`if the lot is full airport personal redirects security`, () => {
        car.forEach(parkingLot.park)
        parkingLot.park(car4)
        
        sinon.spy(airportSecurity,"securityFullCheck")
        airportSecurity.securityFullCheck()
        expect(airportSecurity.securityFullCheck.returned(true))
        airportSecurity.securityFullCheck.restore()
}) 

//TC 5.1 if the lot is not full owner removes the full sign from outside
it(`given parking lot if not full should remove  ` , () => {
    car.forEach(parkingLot.park)
     
    sinon.spy(owner,"emptySpacesCheck")
    owner.emptySpacesCheck()
    expect(owner.emptySpacesCheck.returned(true))
    owner.emptySpacesCheck.restore()
})

//TC 6.1 making the parking lot attendant to park the car 
it(`given car when parked by attendant should return parked`, () => {
try{ 
    sinon.spy(owner,"attendantPark") 
     
    car.forEach(parkingLot.park)
    owner.attendantPark(car4)
    owner.attendantPark(car5)
    }
    catch(e)
    {
        owner.attendantPark.threw("Parking lot is full");    
    }
})

//TC 7.1 find the car of the driver so that he can go home
it(`given car when searched should return found`, () => {
    
        sinon.spy(parkingLot,"findCar")
        car.forEach(parkingLot.park)
        parkingLot.findCar(car3)
        
        expect(parkingLot.findCar.returned(true))
        parkingLot.findCar.restore()
})

//TC 7.2 if car is not found throw an error stating car is not present
it(`given car when not found should throw exception`, () => {
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
it(`given car with a timestamp when found should return true`, () => {
    cars.forEach(parkingLot.park)
    let result = parkingLot.findCar(car6)
    expect(result).to.be.true
})

})