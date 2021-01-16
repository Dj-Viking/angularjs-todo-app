
/**
 * 
 * @param {String} s string in 12 hour format
 * @returns {String} 24 hour time format 
 */
function timeConversion(s) {
  /*
   * Write your code here.
   */
  //check if string has number <= 12 in the front && PM is in the string split array
  console.log(Number(s.split(':').shift()));
  console.log(s.split('00'));
  console.log(s.split(':'));
  if (s.includes('12:00:00AM')) return '00:00:00'
  let twentyFourHrAMNum = 0;
  let twentyFourHrPMNum = 0;
  let returnString = '';
  let minuteSideString = '';
  let secondSideString = '';
  //if the number is less than or equal to 12 then its 12 hr mode
  // convert to 24 hour mode PM
  if (
    (s.split(':')[0].includes('12') || Number(s.split(':').shift()) <= 12) 
    && 
    s.split(':')[2].includes('PM')
  ) {
    //console.log('in the if');
    if (Number(s.split(':').shift()) === 12) {
      twentyFourHrPMNum = '12';
    } else if (Number(s.split(':').shift() < 12)) {
      twentyFourHrPMNum = Number(s.split(':').shift()) + 12;
    }
    //console.log('in the if twentyfourHrPMNum');
    console.log(twentyFourHrPMNum);
    minuteSideString = s.split(':')[1];
    console.log(minuteSideString);
    secondSideString = s.split(':')[2].split('PM').toString().replace(',', '');
    returnString = `${twentyFourHrPMNum === 12 ? '12' : twentyFourHrPMNum}:${minuteSideString}:${secondSideString}`
    console.log(returnString);
    return returnString;
  } else if (
    Number(s.split(':').shift()) <= 12 
    && 
    s.split(':')[2].includes('AM')
  ){
    //console.log('in the else if');
    // else its already AM change it to AM 24 hr mode
    if (Number(s.split(':').shift()) < 12) {
      twentyFourHrAMNum = '0' + Number(s.split(':').shift());
      //console.log(twentyFourHrAMNum);
    } else if(Number(s.split(':').shift()) === 12) {
      twentyFourHrAMNum = '00';
    }
    console.log(twentyFourHrAMNum);
    minuteSideString = s.split(':')[1];
    console.log(minuteSideString);
    secondSideString = s.split(':')[2].split('AM').toString().replace(',', '');
    returnString = `${twentyFourHrAMNum}:${minuteSideString}:${secondSideString}`;
    return returnString;
  } else {
    console.log('in the else');
    if (
      Number(s.split(':').shift()) === 12 
      && 
      s.split(':')[2].includes('PM')
    ) {
      console.log(`12:${s.split(':')[1]}:${s.split(':')[2].replace(`${'AM' || 'PM'}`, '')}`);
      return `12:${s.split(':')[1]}:${s.split(':')[2].replace(`${'AM' || 'PM'}`, '')}`;
    }
  }
}