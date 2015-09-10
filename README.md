# CAMB-Email
Scripts for a a Google Form which would aggregate and send results to IT.

# How it Works
Uses Google Forms, Google Sheets, Script Editor for Google Sheets, and Triggers.

1. The google form matches all of the fields set by the variable "e". This form has an accompanying spreadhseet to hold its answers.
1. Add a trigger to the script main.gs to run once or twice a week.
2. The email sends formatted lists so that you can import all form submissions at once to the different lists.
3. Once you are done, just cut+paste all the submissions to a different spreadsheet (for history). Once you've removed the submission from the main form spreadsheet, they won't be sent in the email again.
