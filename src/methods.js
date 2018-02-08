//with help from Michael Martin-Smucker
//https://stackoverflow.com/questions/4434076/best-way-to-alphanumeric-check-in-javascript
export function isAlpha(str){
  let code, i, len;
  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
}

//with help from
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round

export function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

export function easyReadDate(date){
  const monthAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return(
    date.getDate() + " " + monthAbbr[date.getMonth()] 
    + " " + date.getFullYear()
  );
}
