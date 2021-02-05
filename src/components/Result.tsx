import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {remote} from 'electron';
let fs = remote.require('fs');
let path = remote.require('path');
import Nav from './Nav'
import QuestionWrapper from './QuestionWrapper'
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
  setSelection: ({}) => void;
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

const Result: React.FC<Props> = ({username, setUsername, questions, selection, setSelection}) => {

  const handlePrint = (() => {
    let win = remote.getCurrentWindow();
    win.webContents.printToPDF(pdfOptions).then(data => {
      let userPath = remote.dialog.showSaveDialogSync(win, dialogOptions);
      if(userPath) {
        const pdfPath = userPath;
        fs.writeFile(pdfPath, data, (error: any) => {
          if (error) throw error
          console.log(`Wrote PDF successfully to ${pdfPath}`)
        })
      }
    }).catch(error => {
      console.log(`Failed to write PDF`, error)
    })
  })

  return (
    <>
      <Nav username={username} setUsername={setUsername} />
      <div className="block" style={{margin: "1em 1em"}}>
        <h1 className="title is-1">Score Report</h1>
        <h1 className="subtitle"><b>User:</b>&nbsp;{username}</h1>
        <div className="buttons">
          <button onClick={handlePrint} className="button is-link no-print" id="print">Export to PDF &nbsp;<FontAwesomeIcon icon="file-pdf" /></button>
          <Link className="button is-success no-print" to="/quiz">Restart</Link>
        </div>
        
        <QuestionWrapper mode="result" questions={questions} selection={selection} setSelection={setSelection} />
      </div>
    </>
  )
}

export default Result
