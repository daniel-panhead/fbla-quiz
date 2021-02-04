import {questions} from '../questions.json';
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

export const getQuestions = () => {
  console.log(`Length: ${questions.length}`);
  let questionArr: {
    type: string;
    index: number
  }[] = []

  //let types = ["mc", "tf", "ftb", "dropdown"];
  let uniqTypes = 0;

  for(let i = 0; i < questions.length; i++) {
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
  const randQuestions = questionArr.map((question) => questions[question.index]);
  return(randQuestions)
}

export const getInitialVals = ((questions: {}[]) => {
  //generate initial array containing question props
  let initialValues: {[key: string]: string} = {};
  for(let i = 1; i <= questions.length; i++) {
    initialValues[`question${i}`] = ""
  }
  return initialValues
})