//Return the semantic name for the attribute at the column index
//This is the opposite, more readable version of normalizeHeader
//This function is swapped out in the function normalizeHeaders in Google.gs (commented out).
//This function increases human readability, but in turn needs to be
//maintained every time the form changes. Note that normalizeHeaders
//can be used instead at any time by swapping out the commented line.
// Arguments:
//   - index: index of the column to name as an attribute
// Examples:
//   0 -> "timestamp"
//   1 -> "firstname"
//   22 -> "opt_out"
//Note: To find out what you want to call the semantic headers
//and the numbers they are associated with in the form, 
//run the Admin_Debug_Show_Form_Fields in Debug
function semantic_header(index) {
  switch (index) {
    case 0:
        return "timestamp";
        break;
    case 1:
        return "firstname";
        break;
    case 2:
        return "lastname";
        break;
    case 3:
        return "section";
        break;
    case 4:
        return "ucdemail";
        break;
    case 5:
        return "membertype";
        break;
    case 6:
        return "prefemail";
        break;
    case 7:
        return "join_chat";
        break;
    case 8:
        return "join_football";
        break;
    case 9:
        return "join_goodtimes";
        break;
    case 10:
        return "current_issue";
        break;
    case 11:
        return "current_new_announce";
        break;
    case 12:
        return "current_rm_announce";
        break;
    case 13:
        return "smartsite_access";
        break;
     case 14:
        return "smartsite_issue";
        break;
    case 15:
        return "current_new_chat";
        break;
    case 16:
        return "current_rm_chat";
        break;
    case 17:
        return "current_new_football";
        break;
    case 18:
        return "current_rm_football";
        break;
    case 19:
        return "current_new_goodtimes";
        break;
    case 20:
        return "current_rm_goodtimes";
        break;
    case 21:
        return "diff_email";
        break;
    case 22:
        return "opt_out";
        break;
    case 23:
        return "opt_out_emails";
        break;
    default:
      break;
  }
}

//Converts the String/Header name into an index value
//For use in Updates to access each indexed data value
//Can call simply via si()
function semantic_index(header) {
    switch (header) {
    case "timestamp":
        return 0;
        break;
    case "firstname":
        return 1;
        break;
    case "lastname":
        return 2;
        break;
    case "section":
        return 3;
        break;
    case "ucdemail":
        return 4;
        break;
    case "membertype":
        return 5;
        break;
    case "prefemail":
        return 6;
        break;
    case "join_chat":
        return 7;
        break;
    case "join_football":
        return 8;
        break;
    case "join_goodtimes":
        return 9;
        break;
    case "current_issue":
        return 10;
        break;
    case "current_new_announce":
        return 11;
        break;
    case "current_rm_announce":
        return 12;
        break;
    case "smartsite_access":
        return 13;
        break;
     case "smartsite_issue":
        return 14;
        break;
    case "current_new_chat":
        return 15;
        break;
    case "current_rm_chat":
        return 16;
        break;
    case "current_new_football":
        return 17;
        break;
    case "current_rm_football":
        return 18;
        break;
    case "current_new_goodtimes":
        return 19;
        break;
    case "current_rm_goodtimes":
        return 20;
        break;
    case "diff_email":
        return 21;
        break;
    case "opt_out":
        return 22;
        break;
    case "opt_out_emails":
        return 23;
        break;
    default:
        return 0;
        break;
  }
}
var si = semantic_index; //Alias declaration
