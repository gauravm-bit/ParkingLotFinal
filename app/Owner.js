class owner {
    isFull() {
          throw new Error('Parking lot is full')
        
     }

    emptySpacesCheck = () => {    
         throw new Error('Parking lot has space again')
    }
    
 
    
}

module.exports = new owner