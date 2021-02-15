import {ipcRenderer} from 'electron';

export interface Props {
  questions: {
    type: string;
    question: string;
    choices: string[];
    answer: string;
  }[];
}

const getRand = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min) + min);
}

export const getQuestions = async () => {
  const questions: Props = (await ipcRenderer.invoke('get-questions')).questions;
  return questions.questions;
}

export const getRandQuestions = async () => {
  const questions = await getQuestions();

  let questionArr: {
    type: string;
    index: number
  }[] = []

  //let types = ["mc", "tf", "ftb", "dropdown"];
  let uniqTypes = 0;
  let numQuestions = 5;
  for(let i = 0; i < numQuestions; i++) {
    while(true) {
      let randIndex = getRand(0, questions.length);

      //only add element at randIndex IF:
      //if questionArr does not contain randIndex (question has not already been selected) and
      //if questionArr does not contain the question type at questionArr[randIndex]
      //or if at least 4 different types have already been reached
      if(!questionArr.some((question) => randIndex == question.index) && 
      (uniqTypes >= 4 || !questionArr.some((q) => questions[randIndex].type == q.type))) {
        questionArr.push({
          type: questions[randIndex].type,
          index: randIndex
        });
        uniqTypes++;
        break;
      }
    }
  }
  let randIndex: number[] = []
  const randQuestions = questionArr.map((randQuestion) => {
    randIndex.push(randQuestion.index)
    return questions[randQuestion.index]
  });
  return({questions: randQuestions, indexes: randIndex})
}

export const getInitialVals = ((questions: {}[]) => {
  //generate initial array containing question props
  let initialValues: {[key: string]: string} = {};
  for(let i = 1; i <= questions.length; i++) {
    initialValues[`question${i}`] = ""
  }
  return initialValues
})

export const getUsers = async () => {
  try {
    
    const users: {
      users: [{
        user: string,
        password: string,
        results?: [{
          selection: {},
          questionIndexes: [],
          startTime: number,
          score: number
        }]
      }]
    } = (await ipcRenderer.invoke('get-users')).users;
    return users;
  } catch (err) {
    throw err;
  }
}

export const addUser = async (user: string, password: string) => {
  try {
    await ipcRenderer.invoke('add-user', user, password);
  } catch(err) {
    throw err;
  }
}

export const delUser = async (user: string) => {
  try {
    await ipcRenderer.invoke('del-user', user)
  } catch(err) {
    throw err;
  } 
}

export const changePasswd = async (user: string, newPassword: string) => {
  try {
    await ipcRenderer.invoke('change-passwd', user, newPassword)
  } catch(err) {
    throw err;
  } 
}


export const addResult = async (user: string, result: {}, randQuestionIndexes: number[], startTime: number, score: number) => {
  try {
    await ipcRenderer.invoke('add-result', user, result, randQuestionIndexes, startTime, score);
  } catch(err) {
    throw err;
  }
}

export const delResult = async (user: string, startTime: number) => {
  await ipcRenderer.invoke('del-result', user, startTime)
}