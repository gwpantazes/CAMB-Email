//Returns string of the current date
//Example
//11/20/2013
function date() {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  var datestring = month + "/" + day + "/" + year;
  return datestring;
}
