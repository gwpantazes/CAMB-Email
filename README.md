# CAMB-Email
Scripts for a a Google Form which would aggregate and send results to IT.

# How it Works
Uses Google Forms, Google Sheets, Script Editor for Google Sheets, and Triggers. Doesn't need Google App Engine.

1. There is a google form with fields that match all of the fields set by the variable "e". This form has an accompanying spreadhseet to hold its answers.
1. Open the script editor for the form's spreadsheet and add all of these files as scripts.
1. Add triggers to the script main.gs
  - email_verify() is run in response to every form submission to verify what the user wants.
  - updates() aggregates all submissions into convenient lists for weekly action. Set a trigger to run this weekly. The formatted lists in the email are so that you can import all form submissions at once to the different lists with all their different requirements for how lists should be input.
1. Once action is taken upon the lists in the updates() email, just cut+paste all the submissions to a different spreadsheet (for history) or delete all the entries. Once you've removed the submission from the main form spreadsheet, they won't be sent in the email again.

# How the Form was set up
The form was set up with an initial bare bones page for identity and email address. Then the form went "choose your own adventure" and students would indicate if they were incoming, current, or leaving. The form would ask appropriate questions based on that, so of the 25 or so fields, the first 5 are essential and the remaining are split roughly into thirds by these categories.

# Different lists
Just for reference, there were a couple different lists the students needed to be part of such as

1. Official Announcements for everyone on Google Apps
  - Section Leaders and Officers both got their own email lists as well
2. Unnoficial Listservs on Google Groups
  1. Chat
  2. Football
  3. Goodtimes
3. Smartsite was the school's content management system for students to access content through classes and clubs.
