const assert = require('chai').assert
const expect = require('chai').expect
const sinon = require('sinon');
const driver = require('../app/DriverType')
const carType = require('../app/CarType');

const parkingAttendent = require('../app/ParkingLotAttendant.js');
const parkingLot = require('../app/ParkingLot.js')
const owner = require('../app/Owner.js')
const airportSecurity = require('../app/AirportSecurity.js')
let car = {name:"maruti",driverType:driver.NORMAL}
let car1 = {name:"honda",driverType:driver.HADNICAP}
let cars =  [ {name:"maruti",driverType:driver.NORMAL,color:'blue',number:'1234'},
              {name:"bmw",driverType:driver.NORMAL,color:'white',number:'8989'},
              {name:"bmw",driverType:driver.NORMAL,color:'white',number:'7896'}
            ]           
describe(`Testing for Parking Lot service`, () => {

//TC 1.1 let the driver park the car so that he can board his flight
it(`given car when parked should return parked`, () => {
     let newLot = new parkingLot(1,1,2)
     let result = newLot.park(car)
     expect(result).to.be.equal(true);
 })

//TC 1.2 car is not an object
it(`given car when not an object should throw an exception`, () => {
    let newLot = new parkingLot(1,1,2)
   try {
          newLot.park(null)   
    }   
    catch(e){
        expect(e.message).to.eql('car must be an object and cannot be null');
    }
 })

 //TC 2.1 let the driver unpark so he can go home
it(`given car when unparked should return true`, () => {

    let newLot = new parkingLot(1,1,2)
    newLot.park(car)
    let result = newLot.unpark(car)
    expect(result).to.be.equal(true);  
})

//TC 2.2 if the car is already unparked system, should not allow to unpark again
it(`given car when already unparked should throw an exception`, () => {
   try{
        let newLot = new parkingLot(1,1,2)
        newLot.unpark(car)
        newLot.unpark(car)
        console.log(newLot)
               
    }
    catch(e)
    {
       expect(e.message).to.eql('Aready unparked the car');
    }
})

//TC 3.1 if the lot is full owner puts out full sign
it(`given parking lot if full should return true and owner should put sign`, () => {
      try{  
        let newLot = new parkingLot(2,2,4)
        cars.forEach(newLot.park)
      } catch (e){
        expect(e.message).to.eql('Parking lot is full')
      }       
}) 

//TC 5.1 if the lot is not full owner removes the full sign from outside
it(`given parking lot if not full should give message ` , () => {
    try{
        let newLot = new parkingLot(2,2,4);
        newLot.park(car)
        sinon.spy(owner,"emptySpacesCheck")
    }
    catch{
        owner.emptySpacesCheck.threw('Parking lot has space again')
    }
    owner.emptySpacesCheck.restore()
})

//TC 6.1 making the parking lot attendant to park the car 
it(`given car when parked by attendant should return parked`, () => {
    let result = parkingAttendent.AttendantPark(car)
    expect(result).to.eql(true);

})

//TC 7.1 find the car of the driver so that he can go home
it(`given car when searched should return true`, () => {
    let newLot = new parkingLot(1,1,2)
    sinon.spy(newLot,"findCar")
    newLot.park(car)
    expect(newLot.findCar.returned(true))
    newLot.findCar.restore()
})

//TC 7.2 if car is not found throw an error stating car is not present
it(`given car when not found should throw exception`, () => {
   try{
    let newLot = new parkingLot(1,1,2)
    newLot.findCar(car)
   }
   catch(e){
    expect(e.message).to.eql('Car is not present in the Lot')
   }          
})

//TC 8.1 adding a car with timestamp so that they can be charged
it(`given car with a timestamp when found should return true`, () => {
    let newLot = new parkingLot(1,1,2)
    newLot.park(car)
    let result = newLot.findCar(car)
    expect(result).to.be.true
})

//TC 9.1 evenly direct cars into lots
it(`given cars when parked should park evenly in separate lots`, () => {
    //  let newLot = new parkingLot;
     let result = parkingAttendent.AttendantPark(car)
     expect(result).to.eql(true);
})

//TC 10.1 handicap driver park
it(`given car of handicap driver if parked should be parked at nearest place`, () =>{
    let newLot = new parkingLot
    let result = newLot.park(car1)  
    expect(result).to.be.true
})

//TC 11.1 park large vehicles in lot with more free space
it(`given car when is large should be alloted to lot less full`, () =>{
    let newLot = new parkingLot(2,2,4);
    let car3 = {name:"Rover",type:carType.LARGE}
    let result = newLot.park(car3)
    expect(result).to.be.true
})

//TC 12.1 Police department knows the location of parked white cars
it(`given parked cars if white the location should be returned`, () =>{
    let newLot = new parkingLot(2,2,4)
    cars.forEach(newLot.park)
    parameter = { color:'white'}
    let result = newLot.findParameter(parameter)
    assert.equal(result[0].lot, 0);
    assert.equal(result[0].slot, 1);
    assert.equal(result[1].lot,1);
    assert.equal(result[1].slot, 0);

}) 

//TC 13.1 Search car names by number plate , company name and colour
it(`given parked cars when searched with number,brand and color must return location`, () => {
let vehicles =  [ {number:"MH.03.CA.1234",company:"toyota",driverType:driver.NORMAL,color:"blue"},
                  {number:"MH.15.CA.8989",company:"bmw",driverType:driver.NORMAL,color:"white"},
                  {number:"MH.18.KN.7896",company:"toyota",driverType:driver.NORMAL,color:"blue"}
                ]
    let newLot = new parkingLot(2,2,4)
    vehicles.forEach(newLot.park)
    parameter = {   company:"toyota",
                    color:"blue"
                }
    let result = newLot.findParameter(parameter)
    assert.equal(result[0].lot,0);
    assert.equal(result[0].slot,0);
    assert.equal(result[1].lot,0);
    assert.equal(result[1].slot,1);
})

//TC 14.1 Police department knows the location of parked bmw cars
it(`given parked cars if white the location should be returned`, () =>{
    let newLot = new parkingLot(2,2,4)
    cars.forEach(newLot.park)
    parameter = { name:"bmw"}
    let result = newLot.findParameter(parameter)
    assert.equal(result[0].lot, 0);
    assert.equal(result[0].slot, 1);
    assert.equal(result[1].lot,1);
    assert.equal(result[1].slot, 0);

}) 

//UC-15 Find the cars parked at last 30mins in parking lot
it(`given cars which are parked in lot since last 30 mins should return car position`, () =>{
    let date = new Date();
    let newLot = new parkingLot(2,2,4)
    let parkedTime = date.getMinutes() - 30;
    let vehicles =  [ {number:"MH.03.CA.1234",company:"toyota",driverType:driver.NORMAL,color:"blue",parkedTime: parkedTime},
                      {number:"MH.15.CA.8989",company:"bmw",driverType:driver.NORMAL,color:"white"},
                      {number:"MH.18.KN.7896",company:"toyota",driverType:driver.NORMAL,color:"blue"}
                    ]
    vehicles.forEach(newLot.park)
    let carParkedTime = newLot.checkParkedBeforeMinutes(30);
    assert.equal(carParkedTime[0].lot,0);
    assert.equal(carParkedTime[0].slot,0);
})

//UC-16 Find the cars parked which are of small and handicap type
it(`given cars which are parked in lot if handicap and of size small return true`, () =>{
    let newLot = new parkingLot(2,2,4)
    let vehicles =  [ {number:"MH.03.CA.1234",company:"toyota",carType:carType.SMALL,driverType:driver.HADNICAP,color:"blue"},
                      {number:"MH.15.CA.8989",company:"bmw",carType:carType.SMALL,driverType:driver.HADNICAP,color:"white"},
                      {number:"MH.18.KN.7896",company:"toyota",carType:carType.LARGE,driverType:driver.NORMAL,color:"blue"}
                      
                    ]
    vehicles.forEach(newLot.park)
    parameter = {carType:carType.SMALL, driverType:driver.HADNICAP}
    let result = newLot.findParameter(parameter);
    assert.equal(result[0].lot,0);
    assert.equal(result[0].slot,0);
})

})
