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

const getOneQuestion = (question) => ({
  type: ONE_QUESTION,
  question
})

const updateQuestion = (updatedQuestion) => ({
  type: EDIT_QUESTION,
  updatedQuestion
})

const removeQuestion = (questionId) => ({
  type: DELETE_QUESTION,
  questionId
})

// Thunks

export const fetchAllQuestions = () => async dispatch => {
  const response = await fetch('/api/questions')
  if (response.ok) {
    const questions = await response.json()
    dispatch(getQuestions(questions))
    return questions
  } else {
    const errors = await response.json()
    return errors
  }
}

export const fetchSingleQuestion = (questionId) => async dispatch => {
  const response = await fetch(`/api/questions/${questionId}`)
  const data = await response.json()
  if (response.ok) {
    dispatch(getOneQuestion(data))
    return data
  }
  throw new Error();
}

export const createQuestion = (questionBody) => async dispatch => {
  const response = await fetch(`/api/questions`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(questionBody)
  })
  const data = await response.json()
  if (response.ok) {
    dispatch(getOneQuestion(data))
  }
  return data
}

export const editQuestion = (questionId, questionBody) => async dispatch => {
  const response = await fetch(`/api/questions/${questionId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(questionBody)
  })
  const data = await response.json()
  if (response.ok) {
    dispatch(updateQuestion(data))
  }
  return data
}

export const deleteQuestion = (questionId) => async dispatch => {
  const response = await fetch(`/api/questions/${questionId}`, {
    method: 'DELETE'
  })
  const data = await response.json()
  if (response.ok) {
    dispatch(removeQuestion(questionId))
  }
  return data
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
      const data = normalizeData(action.questions.Questions)
      newState.allQuestions = data;
      return newState
    }
    case (ONE_QUESTION): {
      const newState = {
        allQuestions: {
          ...state.allQuestions
        },
        singleQuestion: {}
      }
      const data = action.question;
      newState.singleQuestion = data;
      return newState;
    }
    case (EDIT_QUESTION): {
      const newState = {
        allQuestions: {
          ...state.allQuestions
        },
        singleQuestion: {}
      }
      const data = action.updatedQuestion
      newState.singleQuestion = data
      newState.allQuestions[data.id] = data
      delete newState.allQuestions[data.id].body
      return newState;
    }
    case (DELETE_QUESTION): {
      const newState = {
        allQuestions: {
          ...state.allQuestions
        },
        singleQuestion: {}
      }
      delete newState.allQuestions[action.questionId]
      return newState
    }
    default: {
      return state
    }
  }
}

export default questionsReducer
