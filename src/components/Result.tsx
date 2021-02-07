import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import {remote, ipcRenderer} from 'electron';
let fs = remote.require('fs');
let path = remote.require('path');
import Nav from './Nav'
import QuestionWrapper from './QuestionWrapper'
import {addResult} from './DBData';
import { Link } from 'react-router-dom';

interface Props {
  username: string;
  setUsername: (arg0: string) => void;
  questions: {
    type: string;
    question: string;
    choices: string[];
    answer: string;
  }[];
  selection: {};
  randQuestionIndexes?: number[];
  startTime: number;
}


let pdfOptions = { 
  printBackground: true,
  printSelectionOnly: false,
  landscape: false,
} 

let dialogOptions = {
  title: "Save PDF",
  defaultPath: path.join(remote.app.getAppPath(), 'result.pdf'),
  filters: [
    {name: 'Portable Document File (PDF)', extensions: ['pdf']},
    {name: 'All Files', extensions: ['*']}
  ]
}

const Result: React.FC<Props> = ({username, setUsername, questions, selection, randQuestionIndexes, startTime}) => {

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const handlePrint = (() => {
    let win = remote.getCurrentWindow();
    win.webContents.printToPDF(pdfOptions).then(data => {
      let userPath = remote.dialog.showSaveDialogSync(win, dialogOptions);
      if(userPath) {
        const pdfPath = userPath;
        fs.writeFile(pdfPath, data, (error: any) => {
          if (error) throw error
          setSaveError(false);
          setSaveSuccess(true);
        })
      }
    }).catch(error => {
      console.log(`Failed to write PDF`, error)
      setSaveError(true);
      setSaveSuccess(false);
    })
  })

  const handleSaveResult = (() => {
    const saveAsync = (async () => {
      try {
        await addResult(username, selection, randQuestionIndexes, startTime);
        setSaveError(false);
        setSaveSuccess(true);
      } catch(error) {
        console.log(`Error: `, error)
        setSaveError(true);
        setSaveSuccess(false);
      }
    })
    saveAsync();
  })

  return (
    <>
      <Nav username={username} setUsername={setUsername} />
      <div className="block" style={{margin: "1em 1em"}}>
        <h1 className="title is-1">Score Report</h1>
        <h1 className="subtitle"><b>User:</b>&nbsp;{username}</h1>
        <div className="buttons">
          <button onClick={handlePrint} className="button is-link no-print" id="print">Export to PDF &nbsp;<FontAwesomeIcon icon="file-pdf" /></button>
          {(randQuestionIndexes && randQuestionIndexes.length > 0) && 
            <button onClick={handleSaveResult} className="button is-primary no-print" id="print">Save to Account &nbsp;<FontAwesomeIcon icon="save" /></button>
          }
          <p className={saveSuccess ? "help is-success" : saveError ? "help is-danger" : "help is-danger"}>{saveSuccess ? "Successfully saved" : saveError ? "An error occurred while saving. Please try again" : "An error occurred. Please try again"}</p>
          <Link className="button is-success no-print" to="/quiz">Restart</Link>
        </div>
        
        <QuestionWrapper mode="result" questions={questions} selection={selection} />
      </div>
    </>
  )
}

export default Result
