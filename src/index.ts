import { app, BrowserWindow, ipcMain} from 'electron';
import {MongoClient} from 'mongodb';
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

const uri = "mongodb+srv://userAdmin:***REMOVED***@cluster0.ojeo0.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
let data: {
  questions: {}[]
  users: {}
};


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true
    }
  });
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
let questions: {}[];
ipcMain.handle('get-db', async (event) => {
  try {
  await client.connect();
  const questionsColllection = client.db("fbla-quiz").collection("questions");
  questions = await questionsColllection.findOne({});
  } catch(e) {
    throw e;
  }
})

ipcMain.handle('get-questions', () => {
  return {questions: questions};
})