let inputRegex = /[a-z]+|[^a-z]+/gi;

function ConvertHandler() {

  this.getNum = function(input) {

    let result;
    result = input.match(inputRegex)[0];

    //check if return one is a unit, if it is then return 1
    let numberRegex = /\d/;
    if (numberRegex.test(result) === false) {
      result = 1;
    }

    //check if it's a fraction
    if (result.toString().includes('/')){
      let values = result.toString().split('/');
      if (values.length != 2){
        return 'invalid number';
      }
      values[0] = parseFloat(values[0]);
      values[1] = parseFloat(values[1]);
      result = parseFloat((values[0]/values[1]).toFixed(5));
    }

    //check if the input is a number
    if (isNaN(result)){
      return 'invalid number';
    }

    return result;

  };


  
  this.getUnit = function(input) {

    let tempUnit;

    tempUnit = input.match(inputRegex)[1];

    //if there's only unit, take the unit as the result
    if(!tempUnit){
      tempUnit = input.match(inputRegex)[0];
    }

    tempUnit = tempUnit.toLowerCase();

    switch(tempUnit) {
      case 'gal' : 
      case 'lbs' : 
      case 'kg' : 
      case 'mi' : 
      case 'km' : 
        return tempUnit;
      case 'l':
        return 'L';
      default : 
        return 'invalid unit';
    }

  };
  
  this.getReturnUnit = function(initUnit) {

    switch(initUnit) {
      case 'gal' : 
        return 'L';
      case 'L' :
      case 'l': 
        return 'gal';
      case 'lbs' : 
        return 'kg';
      case 'kg' : 
        return 'lbs';
      case 'mi' : 
        return 'km';
      case 'km' : 
        return 'mi';
    }
  };

  this.spellOutUnit = function(unit) {
    let result;
    
    switch(unit){
      case 'gal':
      case 'GAL':
        result = 'gallons';
        break;
      case 'l':
      case 'L':
        result = 'litres';
        break;
      case 'lbs':
      case 'LBS':
        result = 'pounds';
        break;
      case 'kg':
      case 'KG':
        result = 'kilograms';
        break;
      case 'mi':
      case 'MI':
        result = 'miles';
        break;
      case 'km':
      case 'KM':
        result = 'kilometers';
        break;
    }

    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;
    let tempUnit = initUnit;

    if (tempUnit === 'gal'){
      result = (initNum * galToL).toFixed(5);
    }
    if (tempUnit === 'l' || tempUnit ==='L'){
      result = (initNum / galToL).toFixed(5);
    }
    if (tempUnit ==='mi'){
      result = (initNum * miToKm).toFixed(5);
    }
    if (tempUnit ==='km'){
      result = (initNum / miToKm).toFixed(5);
    }
    if (tempUnit ==='lbs'){
      result = (initNum * lbsToKg).toFixed(5);
    }
    if (tempUnit ==='kg'){
      result = (initNum / lbsToKg).toFixed(5);
    }
    
    return parseFloat(result);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return result;
  };
  
}

module.exports = ConvertHandler;
