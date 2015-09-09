//This function, while triggered onFormSubmit, will send the admin
//an email with all form field's information listed by number
function Admin_Debug_email_verify(e){
  var submitted_data="Admin Debug Email, data below.\n";
  for(var i=0; i<e.values.length;i++){
    submitted_data = submitted_data.concat(i+". "+e.values[i]+"\n");
  }
  //MailApp.sendEmail("cambit@campusrec.ucdavis.edu", "Debug Message" + e.values[0] , submitted_data);
}

function Admin_Debug_Updates_inBrowser() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  //var CambFormSubmissions = getRowsData(sheet, sheet.getDataRange(),1);  //note attributes now normalizeHeader()
  var CambFormSubmissions = (sheet.getDataRange()).getValues();
  
  var debugstring="";
  
  for (var i=0; i< CambFormSubmissions.length; i++) {
    for (var j=0; j< CambFormSubmissions[i].length; j++) {
      if (CambFormSubmissions[i][j])
      debugstring += CambFormSubmissions[i][j] + ", ";
    }
    debugstring += ";\n";
  }
  Browser.msgBox(debugstring);
}

function Admin_Debug_Updates_Email(CambFormSubmissions) {
   var debugstring="";
  
  for (var i=0; i< CambFormSubmissions.length; i++) {
    
    for (var j=0; j< CambFormSubmissions[i].length; j++) {
      if (CambFormSubmissions[i][j])
      debugstring += CambFormSubmissions[i][j] + ", ";
    }
    debugstring += ";\n";
  }
  MailApp.sendEmail("greekguy7498@gmail.com", "Updates Debug Email " + date(), debugstring);
}



//Function will create a box display in the spreadsheet window
//showing all of the form fields and the number that it is associated with.
//It is essential all the form fields match up with their indexes
//in Main, where they are explicitly assigned variable names,
//and in semantic_header
function Admin_Debug_Show_Form_Fields() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  
  var show="";
  var varform="";
  
  //grab entire row of headers
  var range = sheet.getRange(1,1,1,sheet.getLastColumn());
  var values = range.getValues()[0];//returns a 2dim array, so subscript just keeps first row
  Logger.log(values); //Use debugger
  
 //iterate through all headers
  for (var i=0; i<values.length; i++) {
   //show += i + ". " + values[i] + "\n";
   varform += "var " + normalizeHeader(values[i]) + " = e.values[" + i + "];\n";
  }
  
  //Browser.msgBox(show);
  Browser.msgBox(varform);
}

//A debug function just to show the Normalized Headers that the function will be using.
//Although, it's easy enough as a human just to figure out one or two of the normalized headers.
//Just strip off all spaces, punctuation, numbers, and once you have that, CamelCase it.
function Admin_Debug_Show_Normalized_Headers(keys) {
  var show="";
  for (var i=0; i<keys.length; i++)
    show+=keys[i]+"\n";
    Browser.msgBox(show);
}
