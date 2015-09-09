//https://developers.google.com/apps-script/articles/mail_merge#section3

/*Things that need maintaining
1. Main's email_verify's variable decl's and e.value[indexes] have to match form's
   ==>use Admin_Debug_Show_Form_Fields() to easily do this, outputs email_verify's decl code
2. Main's updates's index variable decl's
   ==>keep synced with #1 
3. Headers' semantic_headers' switch list of the same variable names as email_verify's
   ==>keep synced with #1 
4. Headers' semantic_index aka si switch list also, same thing.
   ==>keep synced with #1 

5. EmailTemplate's functions are simply the script, edit them if needed. Mirror email and html message content though.

*/

//email_verify, on submission of a form, sends a verification email to the user
//immediately, telling them what they asked for.
//Other than informing them and acknowledging them, it does nothing.
//The form submission data will remain in the spreadsheet until Updates() runs on its biweekly schedule.
//Trigger: onFormSubmit
//Arguments: 
//  The e in the parameter list is literally data from the form submission.
//  It is accessed by using the e.values attribute, which is an array
//   Example:   e.values[1]="John"
//NOTE: Changing the form will probably break ALL INDEXES for arrays. Watch out.
function email_verify(e) { //e is the data from the form submission
  //joining vars
  var timestamp = e.values[0];
  var firstname = e.values[1];
  var lastname = e.values[2];
  var section = e.values[3];
  var ucdemail = e.values[4];
  var membertype = e.values[5]; //Joining, current, or leaving
  var prefemail = e.values[6]; //preferred email to recieve announce
  var join_chat = e.values[7];
  var join_football = e.values[8];
  var join_goodtimes = e.values[9]; 
  //current vars
  var current_issue = e.values[10];
  var current_new_announce = e.values[11];
  var current_rm_announce = e.values[12];
  var smartsite_access = e.values[13];
  var smartsite_issue = e.values[14];
  var current_new_chat = e.values[15];
  var current_rm_chat = e.values[16];
  var current_new_football = e.values[17];
  var current_rm_football = e.values[18];
  var current_new_goodtimes = e.values[19];
  var current_rm_goodtimes = e.values[20];
  //leaving vars
  var diff_email = e.values[21];
  var opt_out = e.values[22];
  var opt_out_emails = e.values[23];
  
  var subject="";
  var emailBody="";
  var htmlBody="";
  
  if (membertype == "Joining") { //=====================================
    
    subject += email_verify_template_joining_subject(firstname,lastname,timestamp);
    
    emailBody += email_verify_template_joining_intro(firstname,lastname,timestamp,section,ucdemail)[0];
    htmlBody += email_verify_template_joining_intro(firstname,lastname,timestamp,section,ucdemail)[1];
        
    if (prefemail) {
      emailBody += email_verify_template_joining_prefemail(prefemail)[0];
      htmlBody += email_verify_template_joining_prefemail(prefemail)[1];
    }
    
    emailBody += email_verify_template_joining_opt_lists("Chat", join_chat,ucdemail,prefemail)[0];
    emailBody += email_verify_template_joining_opt_lists("Football", join_football,ucdemail,prefemail)[0];
    emailBody += email_verify_template_joining_opt_lists("Goodtimes", join_goodtimes,ucdemail,prefemail)[0];
    htmlBody += email_verify_template_joining_opt_lists("Chat", join_chat,ucdemail,prefemail)[1];
    htmlBody += email_verify_template_joining_opt_lists("Football", join_football,ucdemail,prefemail)[1];
    htmlBody += email_verify_template_joining_opt_lists("Goodtimes", join_goodtimes,ucdemail,prefemail)[1];
    
    if(join_chat || join_football || join_goodtimes) {
      emailBody += email_verify_template_joining_opt_lists_warning()[0];
      htmlBody += email_verify_template_joining_opt_lists_warning()[1];
    }
    
    emailBody += email_verify_template_joining_outro()[0];
    htmlBody += email_verify_template_joining_outro()[1];

    var optAdvancedArgs = {name: "CAMB Email", htmlBody: htmlBody};
    MailApp.sendEmail(ucdemail, subject, emailBody, optAdvancedArgs);
    
  } else if (membertype == "Current") { //==================================
    
    subject += email_verify_template_current_subject(firstname,lastname,timestamp);

    emailBody += "Thank you for your CAMB Email request submitted on " + timestamp +
      "\n\nThe details you entered were as follows: " +
      "\nYour Name: " + firstname + " " + lastname +
      "\nYour section: " + section +
      "\nYour UCD Email: " + ucdemail;
     
  
    htmlBody += "Thank you for your <b>CAMB Email</b> request submitted on <i>" + timestamp +
      "</i><br/>&nbsp;<br/>The details you entered were as follows: " +
      "<br/>Your Name: " + firstname + " " + lastname +
      "<br/>Your section: " + section +
      "<br/>Your UCD Email: " + ucdemail;
  
    emailBody += "\nYour changes will soon be made.";
    htmlBody += "<br/>Your changes will soon be made.";
    
    var optAdvancedArgs = {name: "CAMB Email", htmlBody: htmlBody};
    MailApp.sendEmail(ucdemail, subject, emailBody, optAdvancedArgs);

  } else { // Graduating/Leaving ==========================================
    
    
    subject = "CAMB Email Submission by " + firstname + " " + lastname + ": " + timestamp;

    emailBody = "Thank you for your CAMB Email request submitted on " + timestamp +
      "\nSorry to see you go!" +
      "\nIf you are graduating, please make sure the officers know when you are graduating." +
      "\n\nThe details you entered were as follows: " +
      "\nYour Name: " + firstname + " " + lastname +
      "\nYour Section: " +section +
      "\nYour UCD Email: " + ucdemail +
      "\nYour UCD Email will automatically be removed from Announce.";
  
    htmlBody = "Thank you for your CAMB Email request submitted on " + timestamp +
      "<br/>Sorry to see you go!" +
      "<br/>If you are graduating, please make sure the officers know when you are graduating." +
      "<br/>&nbsp;<br/>The details you entered were as follows: " +
      "<br/>Your Name: " + firstname + " " + lastname +
      "<br/>Your Section: " +section +
      "<br/>Your UCD Email: " + ucdemail +
      "<br/>Your UCD Email will automatically be removed from Announce.";
  
    if(diff_email){
      emailBody = emailBody.concat("\nYour email " + diff_email + " will also be removed from Announce.");
      htmlBody = htmlBody.concat("<br/>Your email " + diff_email + " will also be removed from Announce.");
    }
    if(opt_out && opt_out_emails){
      emailBody = emailBody.concat("\nYou have opted out of " + opt_out + " with emails" + opt_out_emails);
    }
    var optAdvancedArgs = {name: "CAMB Email", htmlBody: htmlBody};
    MailApp.sendEmail(ucdemail, subject, emailBody, optAdvancedArgs);
    MailApp.sendEmail("cambit@campusrec.ucdavis.edu", "Debug: " + firstname + lastname + " " + date(), emailBody, optAdvancedArgs);
  }
  MailApp.sendEmail("cambit@campusrec.ucdavis.edu", "Debug: " + firstname + lastname + " " + date(), emailBody, optAdvancedArgs);
}


//Updates() reaches in to all the submissions from the CAMB Email Form
//and formats/sorts the data conveniently, and then sends it to the current admin.
//After 
function updates() { //https://developers.google.com/apps-script/guides/sheets#reading
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0]; 
 
  // For every row of employee data, generate an employee object.
  //var CambFormSubmissions = getRowsData(sheet, sheet.getDataRange(),1);  //note attributes now normalizeHeader()
  var CambFormSubmissions = (sheet.getDataRange()).getValues();
  
  //DEBUG FUNCTION
  //Admin_Debug_Updates_Email(CambFormSubmissions);
  Logger.log("Data retreived from spreadsheet");
    
  //Arrays
  //===Additions
  var addAnnounce=[];
  var addSmartsite=[];
  var addChat=[];
  var addFootball=[];
  var addGoodtimes=[];
  //===Removals
  var rmAnnounce=[];
  var rmSmartsite=[];
  var rmChat=[];
  var rmFootball=[];
  var rmGoodtimes=[];
  //===Special Cases
  var specialSmartsite=[];
  
  Logger.log("Declaring index Vars");
  
  //INDEXES
  var timestamp = 0;
  var firstname = 1;
  var lastname = 2;
  var section = 3;
  var ucdemail = 4;
  var membertype = 5; //Joining, current, or leaving
  var prefemail = 6; //preferred email to recieve announce
  var join_chat = 7;
  var join_football = 8;
  var join_goodtimes = 9; 
  //current vars
  var current_issue = 10;
  var current_new_announce = 11;
  var current_rm_announce = 12;
  var smartsite_access = 13;
  var smartsite_issue = 14;
  var current_new_chat = 15;
  var current_rm_chat = 16;
  var current_new_football = 17;
  var current_rm_football = 18;
  var current_new_goodtimes = 19;
  var current_rm_goodtimes = 20;
  //leaving vars
  var diff_email = 21;
  var opt_out = 22;
  var opt_out_emails = 23;
  
  Logger.log("Begin Building Lists");
  //Browser.msgBox("I've gotten this far!");
  //BUILD LISTS
  for (var n=1; n<CambFormSubmissions.length; n++) {
    var sub=CambFormSubmissions[n]; //current submission, all spreadsheet data gets accessed from attributes of this object
    
    if (sub[membertype] == "Joining") { //=====================================
      addAnnounce.push(sub[ucdemail]);
      addSmartsite.push(sub[ucdemail]);
      if(sub[prefemail]) {
        addAnnounce.push(sub[prefemail]);
      }
      if(sub[join_chat]) {
        var split_string = sub[join_chat].split(", ");
        for (var i=0; i<split_string.length; i++){
          if (split_string[i]==="@ucdavis") {
            addChat.push(sub[ucdemail]);
          }
          else if (split_string[i]==="Preferred as above") {
            addChat.push(sub[prefemail]);
          }
          else {
            addChat.push(split_string[i]);
          }
        }
      }
      if(sub[join_football]) {
        var split_string = sub[join_football].split(", ");
        for (var i=0; i<split_string.length; i++){
          if (split_string[i]==="@ucdavis") {
            addFootball.push(sub[ucdemail]);
          }
          else if (split_string[i]==="Preferred as above") {
            addFootball.push(sub[prefemail]);
          }
          else {
            addFootball.push(split_string[i]);
          }
        }
      }
      if(sub[join_goodtimes]) {
        var split_string = sub[join_goodtimes].split(", ");
        for (var i=0; i<split_string.length; i++){
          if (split_string[i]==="@ucdavis") {
            addGoodtimes.push(sub[ucdemail]);
          }
          else if (split_string[i]==="Preferred as above") {
            addGoodtimes.push(sub[prefemail]);
          }
          else {
            addGoodtimes.push(split_string[i]);
          }
        }
      }            
    }
    else if (sub[membertype] == "Current") { //=====================================
      if (sub[current_issue] == "Problem with Smartsite, Barbra Streisand") {
        addSmartsite.push(sub[ucdemail]);
        if (sub[smartsite_issue]) {
          specialSmartsite.push([sub[firstname],sub[lastname],sub[smartsite_access],sub[smartsite_issue]]);
        }
      }
      else if (sub[current_issue] == "Problem with Email Lists, ya dingus") {
        
        //===Annouce
        if(sub[current_new_announce]){
          addAnnounce.push(sub[current_new_announce]);
        }
        if(sub[current_rm_announce]){
          rmAnnounce.push(sub[current_rm_announce]);
        }
        //===Chat
        if(sub[current_new_chat]){
          addChat.push(sub[current_new_chat]);
        }
        if(sub[current_rm_chat]){
          rmChat.push(sub[current_rm_chat]);
        }
        //===Football
        if(sub[current_new_football]){
          addFootball.push(sub[current_new_football]);
        }
        if(sub[current_rm_football]){
          rmFootball.push(sub[current_rm_football]);
        }                   
        //===Goodtimes
        if(sub[current_new_goodtimes]){
          addGoodtimes.push(sub[current_new_goodtimes]);
        }
        if(sub[current_rm_goodtimes]){
          rmGoodtimes.push(sub[current_rm_goodtimes]);
        }
      }   
    }
    else { //membertype==Graduating/Leaving //=====================================
      rmAnnounce.push(sub[ucdemail]);
      rmSmartsite.push(sub[ucdemail]);
    }
    //Browser.msgBox("Row "+ n + " is finished");
  }
  
  Logger.log("Lists built!");
  //Browser.msgBox("Lists built!");
  
  //SORTING ALPHABETICALLY
  addAnnounce.sort();
  addSmartsite.sort();
  addChat.sort();
  addFootball.sort();
  addGoodtimes.sort();
  
  rmAnnounce.sort();
  rmSmartsite.sort();
  rmChat.sort();
  rmFootball.sort();
  rmGoodtimes.sort();
  //For now, won't sort specialSmartsite because sortof pointless
  
  Logger.log("Lists sorted!");
  
  //Build Email
  var emailBody = "BiWeekly CAMB Email Update: " + date() + "\n";
  emailBody += "ADDITIONS\n";
  emailBody += updates_template_autolist(addAnnounce, "Add to Announce",", ");
  emailBody += updates_template_autolist(addSmartsite, "Add to Smartsite","\n");
  emailBody += updates_template_autolist(addChat, "Add to Chat",", ");
  emailBody += updates_template_autolist(addFootball, "Add to Football",", ");
  emailBody += updates_template_autolist(addGoodtimes, "Add to Goodtimes",", ");
  emailBody += "REMOVALS\n";
  emailBody += updates_template_autolist(rmAnnounce, "Remove from Announce",", ");
  emailBody += updates_template_autolist(rmSmartsite, "Remove from Smartsite","\n");
  emailBody += updates_template_autolist(rmChat, "Remove from Chat",", ");
  emailBody += updates_template_autolist(rmFootball, "Remove from Football",", ");
  emailBody += updates_template_autolist(rmGoodtimes, "Remove from Goodtimes",", ");
  emailBody += "\n\nSPECIAL CASES\n";
  emailBody += updates_template_specialSmartsite(specialSmartsite);
  
  Logger.log("Email Body complete!");
  
  // Make sure the cell is updated right away in case the script is interrupted
  //SpreadsheetApp.flush();
  
  MailApp.sendEmail("greekguy7498@gmail.com", "CAMB Email Update: " + date(), emailBody); //Debug Copy
  MailApp.sendEmail("cambit@campusrec.ucdavis.edu", "CAMB Email Update: " + date(), emailBody);
  Logger.log("Update Email Sent!");
}
