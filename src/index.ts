import { app, BrowserWindow, ipcMain} from 'electron';
import {MongoClient} from 'mongodb';
import path from 'path';
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

const uri = "mongodb+srv://userAdmin:***REMOVED***@cluster0.ojeo0.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
const connection = client.connect();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 720,
    width: 1280,
    icon: path.join(__dirname, 'assets/icon.png'),
    webPreferences: {
      enableRemoteModule: true,
      devTools: false,
      nodeIntegration: true
    }
  });
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.removeMenu();
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
let users: {
  users: [
    {
      user: string,
      password: string
    }
  ]
}

ipcMain.handle('get-db', async (event) => {
  try {
  await connection;
  //only need to fetch questions once since they don't change
  const questionsCollection = client.db("fbla-quiz").collection("questions");
  questions = await questionsCollection.findOne({});
  } catch(e) {
    throw e;
  }
})

ipcMain.handle('get-questions', async () => {
  return {questions: questions};
})

ipcMain.handle('get-users', async () => {
  const usersCollection = client.db("fbla-quiz").collection("users");
  users = await usersCollection.findOne({});
  return {users: users};
})

ipcMain.handle('add-user', async (event, user: string, password: string) => {
  try {
    const usersCollection = client.db("fbla-quiz").collection("users");
    const query = {_id: "601d89cb83c4ea82117fbea6"} //users database
    const updateDocument = {
      $push: {
        "users": {
          user: user,
          password: password
        }
      }
    }
    await usersCollection.updateOne(query, updateDocument)
  } catch(err) {
    console.error(err)
    throw err
  }
})

ipcMain.handle('del-user', async (event, user: string) => {
  const usersCollection = client.db("fbla-quiz").collection("users");
  const query = {_id: "601d89cb83c4ea82117fbea6"} //users database
  const updateDocument = {
    $pull: {
      "users": {
        user: user
      }
    }
  }
  await usersCollection.updateOne(query, updateDocument)
})

ipcMain.handle('change-passwd', async (event, user: string, newPasswd: string) => {
  try {
    const usersCollection = client.db("fbla-quiz").collection("users");
    const query = {_id: "601d89cb83c4ea82117fbea6"} //users database
    const updateDocument = {
      $set: {
        "users.$[userFilter].password": newPasswd
      }
    }
    //match the array that contains user data for {user}
    const options = {
      arrayFilters: [{
        "userFilter.user": user
      }]
    }
    await usersCollection.updateOne(query, updateDocument, options)
  } catch(err) {
    console.error(err)
    throw err
  }
})


ipcMain.handle('add-result', async (event, user: string, selection: {}, questionIndexes: number[], startTime: number, score: number) => {
  try {
    const usersCollection = client.db("fbla-quiz").collection("users");
    const query = {_id: "601d89cb83c4ea82117fbea6"} //users database
    const updateDocument = {
      $push: {
        "users.$[userFilter].results": {
          questionIndexes: questionIndexes,
          selection: selection,
          startTime: startTime,
          score: score
        }
      }
    }
    //match the array that contains user data for {user}
    const options = {
      arrayFilters: [{
        "userFilter.user": user
      }]
    }
    await usersCollection.updateOne(query, updateDocument, options)
    let usersArr = (await usersCollection.findOne({})).users;
    console.log(usersArr)
  } catch(err) {
    console.error(err)
    throw err
  }
})

ipcMain.handle('del-result', async (event, user: string, startTime: number) => {
  const usersCollection = client.db("fbla-quiz").collection("users");
  const query = {_id: "601d89cb83c4ea82117fbea6"} //users database
  const updateDocument = {
    $pull: {
      "users.$[userFilter].results": {
        startTime: startTime
      }
    }
  }
  //match the array that contains user data for {user}
  const options = {
    arrayFilters: [{
      "userFilter.user": user
    }]
  }
  await usersCollection.updateOne(query, updateDocument, options)
})