import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'

//title images
const signUp = require('../../assets/sign-up.png')
const logIn = require('../../assets/log-in.png')

//dashboard images
const changePassword = require('../../assets/change-password.png')
const deleteAccount = require('../../assets/delete-account.png')
const reviewResults = require('../../assets/review-results.png')

//quiz images
const multipleChoice = require('../../assets/multiple-choice.png')
const trueFalse = require('../../assets/true-false.png')
const fillInTheBlank = require('../../assets/fill-in-the-blank.png')
const fitbRequiredFormat = require('../../assets/fitb-required-format.png')
const dropdown = require('../../assets/dropdown.png')
const dropdownSelection = require('../../assets/dropdown-selection.png')
const quizSubmitRequired = require('../../assets/quiz-submit-required.png')

//results images
const scoreReport = require('../../assets/score-report.png')
const correctAnswer = require('../../assets/correct-answer.png')
const wrongAnswer = require('../../assets/wrong-answer.png')
const saveDialog = require('../../assets/save-dialog.png')
const pdfReport = require('../../assets/pdf-report.png')
const saveToAccount = require('../../assets/save-to-account.png')

//review images
const reviewReport = require('../../assets/review-report.png')

interface Props {
  helpActive: boolean;
  setHelpActive: (arg0: boolean) => void;
}

const TitleHelp = () => {
  return (
    <>
      <h1 className="title is-4">Title Screen</h1>
      <div>
        <p>Upon starting the program, the user is presented with the title screen.</p>
      </div>
      <br/>
      <div>
        <h1 className="title is-5">Sign Up</h1>
        <p>Upon clicking "New User", the sign up form will appear. A notification banner will appear explaining the signup process.</p>
        <img src={signUp} alt="Signup Form" />
        <p>
          Enter your desired username and password in the form and click "Sign up".
          Usernames and passwords can only contain alphanumeric characters, underscores, dots, and dashes.
        </p>
        <p>All passwords are stored as secure bcrypt hashes, so no plaintext passwords are ever exposed.</p>
      </div>
      <br/>
      <div>
        <h1 className="title is-5">Log In</h1>
        <p>Click "Returning User" to log in to an existing account. Enter your credentials and press "Log in".</p>
        <img src={logIn} alt="Login Form" />
        <p>Your username and password will be checked against the database.
          If the credentials match, you will be logged in and brought to the dashboard.
        </p>
      </div>
    </>
  )
}

const DashboardHelp = () => {
  return (
    <>
      <h1 className="title is-4">Dashboard</h1>
      <div>
        <p>
          Once logged in, the user is brought to the dashboard. A navbar is displayed on the top which allows navigation back to the dashboard and lets you log out.
        </p>
      </div>
      <br/>
      <div>
        <h1 className="title is-5">Change Password</h1>
        <p>Upon clicking "Change Password", the password change form will appear. </p>
        <img src={changePassword} alt="Password Change Screen" />
        <p>
          Enter your current password in the "Current password" textbox. Enter your new desired password in the "New password" textbox.
          New passwords can only contain alphanumeric characters, dots, dashes, and underscores.
        </p>
      </div>
      <br/>
      <div>
        <h1 className="title is-5">Delete Account</h1>
        <p>
          If you want to delete your account, click "Delete Account".
          A new confirmation button will appear. Click "Confirm Delete" to confirm and delete your account.
        </p>
        <img src={deleteAccount} alt="Delete Account" />
      </div>
      <br/>
      <div>
        <h1 className="title is-5">Review Results</h1>
        <p>Saved test results will appear in the lower section of the dashboard.</p>
        <img src={reviewResults} alt="Saved Test Results" />
        <p>To view a particular result, click "View" on the one you want. You will be brought to the review screen where you can see correct/incorrect answers and export your result.</p>
        <p>If you want to delete a particular result, click "Delete" on the result you want to delete.</p>
      </div>
      <br/>
      <div>
        <h1 className="title is-5">Start Quiz</h1>
        <p>Once you are ready to start a new quiz, click "Start Quiz" and you will be brought to a new quiz.</p>
      </div>
      
    </>
  )
}

const QuizHelp = () => {
  return (
    <>
      <h1 className="title is-4">Quiz</h1>
      <div>
        <p>
          Upon starting the quiz, you will be presented with the questions.
        </p>
        <p>
          The questions are delivered randomly from a database. For variety, there is always at least one question of each type. There are four question types: multiple choice, true/false, fill-in-the-blank, and dropdown.
        </p>
      </div>
      <br/>
      <div>
        <h1 className="title is-5">Multiple Choice</h1>
        <p>In a multiple-choice question, users can select one answer from all the choices.</p>
        <img src={multipleChoice} alt="Multiple Choice Question" />
      </div>
      <br/>
      <div>
        <h1 className="title is-5">True/False</h1>
        <p>True/False questions function like multiple choice questions except that users will be presented with a statement and asked to answer if it is true or false.</p>
        <img src={trueFalse} alt="True/False Question" />
      </div>
      <br/>
      <div>
        <h1 className="title is-5">Fill in the Blank</h1>
        <p>In a fill-in-the-blank question, users will be asked to fill in the word or phrase that would answer the question or complete the statement.</p>
        <img src={fillInTheBlank} alt="Fill in the Blank Question" />
        <p>There will be an example answer phrase at the end of the question to help users answer in the correct format.</p>
        <p>Fill-in-the-blank questions only allow letters and spaces. This reduces confusion (ex. 3 vs. three). Capitalization and leading/trailing whitespace is ignored.</p>
        <p>Users must make sure they have followed the required format before submitting.</p>
        <img src={fitbRequiredFormat} alt="Fill in the Blank Required Format" />
      </div>
      <br/>
      <div>
        <h1 className="title is-5">Dropdown</h1>
        <p>Dropdown questions have a similar format to fill-in-the-blank questions except users can choose answers from a pool of possible choices.</p>
        <img src={dropdown} alt="Dropdown Question" />
        <p>Upon clicking the dropdown, it will expand and show the possible selections. Click on the desired selection to choose your desired answer.</p>
        <img src={dropdownSelection} alt="Dropdown Selection" />
      </div>
      <br/>
      <div>
        <h1 className="title is-4">Submission</h1>
        <p>Once all questions have been answered, click "Submit" to submit the quiz.</p>
        <p>All required forms must be filled out before the user can submit.</p>
        <img src={quizSubmitRequired} alt="Required Fields for Submission" />
        <p>Upon successful submission, users will be brought to the Results screen to see their score.</p>
      </div>
    </>
  )
}

const ResultsHelp = () => {
  return (
    <>
      <h1 className="title is-4">Results</h1>
      <div>
        <p>
          Upon submitting the quiz, users will be brought to the results page.
          There they can see their scores, review missed questions, and export their report.
        </p>
        <img src={scoreReport} alt="Score Report" />
      </div>
      <br/>
      <div>
        <h1 className="title is-5">Review Answers</h1>
        <p>Users can review the answers and see which ones they got right or wrong.</p>
        <p>Correct answers will be marked with a check.</p>
        <img src={correctAnswer} alt="Correct Answer" />
        <p>Incorrect answers will be marked with a cross. The correct answer is displayed in bold.</p>
        <img src={wrongAnswer} alt="Wrong Answer" />
      </div>
      <br/>
      <div>
        <h1 className="title is-5">Export to PDF</h1>
        <p>You can save your results as a PDF to print. Click "Export to PDF".</p>
        <p>A selection dialog will appear where you can choose where to save your file. The dialog may appear different depending on OS.</p>
        <img src={saveDialog} alt="Save Dialog" />
        <p>After saving results, you can open the PDF and view your score report.</p>
        <img src={pdfReport} alt="PDF Score Report" />
      </div>
      <br/>
      <div>
        <h1 className="title is-5">Save Results</h1>
        <p>If you want to save your score report for future review, click the "Save to Account" button.</p>
        <img src={saveToAccount} alt="Save To Account Button" />
        <p>The score report will be saved to your account and can be accessed later from the dashboard.</p>
        <img src={reviewResults} alt="Saved Test Results" />
      </div>
      <br/>
      <div>
        <h1 className="title is-5">Restart</h1>
        <p>If you want to start a new quiz, click "Restart" and you will be brought to a new quiz.</p>
      </div>
    </>
  )
}

const ReviewHelp = () => {
  return (
    <>
      <h1 className="title is-4">Review</h1>
      <div>
        <p>Upon clicking "View" on a saved result, users will be brought to the review page where they can see their score and correct/wrong answers.</p>
        <img src={reviewReport} alt="Review Report" />
      </div>
      <br/>
      <div>
        <h1 className="title is-5">Review Answers</h1>
        <p>Users can review the answers and see which ones they got right or wrong.</p>
        <p>Correct answers will be marked with a check.</p>
        <img src={correctAnswer} alt="Correct Answer" />
        <p>Incorrect answers will be marked with a cross. The correct answer is displayed in bold.</p>
        <img src={wrongAnswer} alt="Wrong Answer" />
      </div>
      <br/>
      <div>
        <h1 className="title is-5">Export to PDF</h1>
        <p>You can save your results as a PDF to print. Click "Export to PDF".</p>
        <p>A selection dialog will appear where you can choose where to save your file. The dialog may appear different depending on OS.</p>
        <img src={saveDialog} alt="Save Dialog" />
        <p>After saving results, you can open the PDF and view your score report.</p>
        <img src={pdfReport} alt="PDF Score Report" />
      </div>
    </>
  )
}


const Help: React.FC<Props> = ({helpActive, setHelpActive}) => {
  
  const location = useLocation();
  const path = location.pathname;

  const [activeNav, setActiveNav] = useState(path);

  return (
    <>

      <div className={helpActive ? "modal is-active" : "modal"}>
        <div onClick={() => setHelpActive(false)} className="modal-background"></div>

        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Help</p>
            <button onClick={() => setHelpActive(false)} className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body" style={{background: "rgb(250, 250, 250)"}}>
            <div className="tabs">
              <ul>
              <li className={activeNav=="/" ? "is-active" : ""}><a onClick={() => setActiveNav("/")}>Title</a></li>
                <li className={activeNav=="/dashboard" ? "is-active" : ""}><a onClick={() => setActiveNav("/dashboard")}>Dashboard</a></li>
                <li className={activeNav=="/quiz" ? "is-active" : ""}><a onClick={() => setActiveNav("/quiz")}>Quiz</a></li>
                <li className={activeNav=="/result" ? "is-active" : ""}><a onClick={() => setActiveNav("/result")}>Results</a></li>
                <li className={activeNav=="/review" ? "is-active" : ""}><a onClick={() => setActiveNav("/review")}>Review Old Results</a></li>
              </ul>
            </div>
            {activeNav=="/" && 
              <TitleHelp />
            }
            {activeNav=="/dashboard" && 
              <DashboardHelp />
            }
            {activeNav=="/quiz" && 
              <QuizHelp />
            }
            {activeNav=="/result" && 
              <ResultsHelp />
            }
            {activeNav=="/review" && 
              <ReviewHelp />
            }
          </section>
        </div>
      </div>
    </>
  )
}

export default Help
