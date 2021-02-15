# Running the Program
If you are running the Windows binaries, first extract the entire folder. Once extraction is complete, navigate to the extracted folder and run "FBLA Quiz.exe". If you are on Mac/Linux or want to build from source, refer to INSTALLING.md.  
Upon loading the program, users are presented with the title page.

## Title
On the title page, users can choose to log in with a previous account or sign up for a new account. You must sign up for a new account if you are a new user. There is also a help button containing detailed instructions for navigating through the page.

## Help
The help modal contains sections for each page in the program. Click on the relevant tab to find instructions for navigating through that page.

### New User
Upon clicking "New User", the registration form will appear. Users can enter their desired username and password and click "Sign up". You cannot create a new account with the same username as an existing account. Passwords can only contain alphanumeric characters, space, underscore, and dash. Passwords are hashed with bcrypt before being sent to the MongoDB database so no plaintext passwords are ever stored.

### Returning User
If you have an existing account, you can enter your credentials by clicking "Returning User". Upon clicking "Log in", your credentials will be submitted. If they match the credentials of an existing user account, you will be brought to the dashboard.

## Dashboard
Once logged in, the user is brought to the dashboard. A navbar is displayed on the top which allows navigation back to the dashboard and lets you log out.  
Saved test results can be viewed in the lower section of the dashboard.  
The user can change their password by clicking "Change Password". Enter your old password and new desired password. Password requirements follow the same format as sign-up.  
The account can also be deleted by clicking "Delete Account". The user must confirm that they want to delete.

The quiz can be started by pressing the "Start Quiz!" button. Previously saved results can also be viewed.

### Review
Previously saved results can be viewed by clicking "View" on the saved result. Users can see their score and view correct/incorrect questions. The result can be exported to a PDF for printing. Results can also be deleted by clicking "Delete" on the saved result.

## Navbar
The navbar shows the currently logged-in user. You can click "Return to Dashboard" to return to the dashboard page. The navbar also contains a help button. Users can click on it at any time to see detailed instructions for navigating through their current page.

## Quiz
Upon starting the quiz, you will be presented with the questions.

There are four types of questions: multiple choice, true/false, fill-in-the-blank, and dropdown. The questions are chosen randomly from a bank delivered by the database. For variety, there is at least one question of each type.

You will only be allowed to submit upon selecting an answer choice for each question. The fill-in-the-blank questions have input validation - they only allow letters and spaces. This reduces the chances of confusion (ex. 3 instead of three). Capitalization and leading/trailing whitespace is ignored.

Once all questions are answered, submit with the "Submit" button.

## Results
Once the quiz is submitted, you can view your score and review questions. The results page displays your score at the top. It lists correct and incorrect questions as well as the correct answer for each.

You can choose to save the results as a PDF file which you can then print. If you like your result, you can choose to save it to your user profile for later review. You can also choose to restart and take another quiz.