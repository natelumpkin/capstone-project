import normalizeData from "../utils/normalizeData"

// Cases

const LOAD_QUESTIONS = 'questions/all'
const ONE_QUESTION = 'questions/one'
const EDIT_QUESTION = 'questions/edit'
const ADD_QUESTION = 'questions/create'
const DELETE_QUESTION = 'questions/delete'
const LOAD_ANSWERS = 'questions/answers'
const ADD_ANSWER = 'questions/answers/create'

// Actions

const getQuestions = (questions) => ({
  type: LOAD_QUESTIONS,
  questions
})

// Thunks

export const fetchAllQuestions = () => async dispatch => {
  const response = await fetch('/api/questions')
  console.log('Fetching questions')
  if (response.ok) {
    const questions = await response.json()
    dispatch(getQuestions(questions))
    console.log('questions: ', questions)
    return questions
  } else {
    const errors = await response.json()
    console.log('errors: ', errors)
    return errors
  }
}


const initialState = {
  allQuestions: {},
  singleQuestion: {}
}

const questionsReducer = (state = initialState, action) => {
  console.log('Hello from questionsReducer')
  switch (action.type) {
    case (LOAD_QUESTIONS): {
      const newState = {
        allQuestions: {},
        singleQuestion: {
          ...state.singleQuestion,
          User: {
            ...state.singleQuestion.User
          }
        }
      }
      console.log(action.questions)
      const data = normalizeData(action.questions.Questions)
      newState.allQuestions = data;
      return newState
    }
    default: {
      return state
    }
  }
}

export default questionsReducer
