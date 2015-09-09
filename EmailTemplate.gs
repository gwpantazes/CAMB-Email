/*Email Template functions are kept here.
All email_verify_template functions return an array of strings [emailBody,htmlBody].
They are accessed in email_verify() by calling email_template_fun()[0|1]
The subscript operator grabs the string you want.
emailBody => 0
htmlBody => 1
*/

/*==================
=======JOINING======
==================*/
// email_verify_template_joining_

function email_verify_template_joining_subject(firstname,lastname,timestamp) {
  var subject = "Welcome to CAMB Email " + firstname + " " + lastname + "! " + date();
  return subject;
}

function email_verify_template_joining_intro(firstname,lastname,timestamp,section,ucdemail) {
    var emailBody = "Hello " +firstname + " " + lastname + "!"+ 
      "\nWelcome to the Band-uh! " +
      "\nYour CAMB Email request submitted on " + timestamp +
      "\n\nThe details you entered were as follows: " +
      "\nYour Name: " + firstname + " " + lastname +
      "\nYour section: " + section +
      "\nYour UCD Email: " + ucdemail +
      "\n\nYou are signed up for Announce and Smartsite automatically under your ucdavis email: " + ucdemail;
    
    var htmlBody = "Hello " +firstname + " " + lastname + "!"+ 
      "<br/>Welcome to the Band-uh! " +
      "<br/>Your CAMB Email request submitted on <i>" + timestamp +
      "</i><br/>&nbsp;<br/>The details you entered were as follows: " +
      "<br/>Your Name: " + firstname + " " + lastname +
      "<br/>Your section: " + section +
      "<br/>Your UCD Email: " + ucdemail +
      "<br/>&nbsp;<br/>You are signed up for <b>Announce and Smartsite</b> automatically under your ucdavis email: " + ucdemail;
  return [emailBody,htmlBody];
}

function email_verify_template_joining_prefemail(prefemail) {
  var emailBody = "\nAnnounce will also be sent to your preferred email: " + prefemail;
  var htmlBody = "<br/>Announce will also be sent to your preferred email: " + prefemail;
  return [emailBody,htmlBody];
}

function email_verify_template_joining_opt_lists(list, join_string,ucdemail,prefemail) {
  var emailBody="";
  var htmlBody="";
  if(join_string) {
    var split_string = join_string.split(", ");
    emailBody += "\nYou signed up for " + list + " with: ";
    htmlBody += "<br/>You signed up for " + list + " with: ";
    for (var i=0; i<split_string.length; i++){
      if (split_string[i]==="@ucdavis") {
        emailBody += ucdemail + ", ";
        htmlBody += ucdemail + ", ";
      }
      else if (split_string[i]==="Preferred as above") {
        emailBody += prefemail + ", ";
        htmlBody += prefemail + ", ";
      }
      else {
        emailBody += split_string[i];
        htmlBody += split_string[i];
      }
    }
  }
  return [emailBody,htmlBody];
}

function email_verify_template_joining_opt_lists_warning() {
  var emailBody = "\n\nYou will promptly be added to the listed optional Google group listservs." +
                       "\nRemember to follow the rules and treat these groups respectfully.";
  var htmlBody = "<br/><br/>You will promptly be added to the listed optional Google group listservs." +
                       "<br/>Remember to <font color=\"red\">follow the rules and treat these groups respectfully</font>.";
  return [emailBody,htmlBody];
}

function email_verify_template_joining_outro() {
  var emailBody = "\n\nThank you from the Ossifer Council!" +
                       "\nEmail cambit@campusrec.ucdavis.edu with any problems.";
 
  var htmlBody = "<br/>&nbsp;<br/>Thank you from the Ossifer Council!" +
                       "<br/>Email cambit@campusrec.ucdavis.edu with any problems.";
  return [emailBody,htmlBody];
}
 
/*==================
=======CURRENT======
==================*/
// function email_verify_template_current_() {}

function email_verify_template_current_subject(firstname,lastname,timestamp) {
  return "CAMB Email Submission by " + firstname + " " + lastname + ": " + date();
}

function email_verify_template_current_intro(firstname,lastname,timestamp,section,ucdemail) {
  var emailBody = "Thank you for your CAMB Email request submitted on " + timestamp +
      "\n\nThe details you entered were as follows: " +
      "\nYour Name: " + firstname + " " + lastname +
      "\nYour section: " + section +
      "\nYour UCD Email: " + ucdemail;
     
  var htmlBody = "Thank you for your <b>CAMB Email</b> request submitted on <i>" + timestamp +
      "</i><br/>&nbsp;<br/>The details you entered were as follows: " +
      "<br/>Your Name: " + firstname + " " + lastname +
      "<br/>Your section: " + section +
      "<br/>Your UCD Email: " + ucdemail;
  return [emailBody,htmlBody];
}

function email_verify_template_current_issue() {

}

function email_verify_template_current_outro() {
  var emailBody = "\nYour changes will soon be made.";
  var htmlBody = "<br/>Your changes will soon be made.";
  return [emailBody,htmlBody];
}

/*==================
=======LEAVING======
==================*/
// function email_verify_template_leaving_() {}

function email_verify_template_leaving_subject() {

}

function email_verify_template_leaving_intro() {

}

function email_verify_template_leaving_diffemail() {

}


//UPDATES
function updates_template_autolist(array,title,delim) {
  if (array.length == 0)
    return "";
  var emailBody = title + ":\n" + array[0];
  for (var i=1; i<array.length; i++) {
    emailBody += delim + array[i];
  }
  emailBody += "\n\n";
  return emailBody;
}
 
function updates_template_specialSmartsite(subarray) {  //(firstname,lastname,section,access,issue)
  if (subarray.length == 0)
    return "";
  var emailBody = "Special Issues with Smartsite:\n";
  for (var i=0; i<subarray.length; i++) {
    var s = subarray[i]; //accesses one submission
    emailBody += s;
  }
  
}
