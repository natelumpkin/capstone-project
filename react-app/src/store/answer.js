// Cases

import normalizeData from "../utils/normalizeData"

const LOAD_ANSWERS = 'answers/load'
const ADD_ANSWER = 'answers/create'
const EDIT_ANSWER = 'answers/edit'
const DELETE_ANSWER = 'answers/delete'

// Actions

const loadAnswers = (answers) => ({
  type: LOAD_ANSWERS,
  answers
})

const addAnswer = (answer) => ({
  type: ADD_ANSWER,
  answer
})

const editAnswer = (answer) => ({
  type: EDIT_ANSWER,
  answer
})

const removeAnswer = (answerId) => ({
  type: DELETE_ANSWER,
  answerId
})

// Thunks

export const getAnswersToQuestion = (questionId) => async dispatch => {
  const response = await fetch(`/api/questions/${questionId}/answers`)
  const data = await response.json()
  if (response.ok) {
    dispatch(loadAnswers(data))
  }
  return data;
}

export const createNewAnswer = (questionId, answerBody) => async dispatch => {
  const response = await fetch(`/api/questions/${questionId}/answers`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(answerBody)
  })
  const data = await response.json()
  if (response.ok) {
    dispatch(addAnswer(data))
  }
  return data
}

export const updateAnswer = (answerId, answerBody) => async dispatch => {
  const response = await fetch(`/api/answers/${answerId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(answerBody)
  })
  const data = await response.json()
  if (response.ok) {
    dispatch(editAnswer(data))
  }
  return data
}

export const deleteAnswer = (answerId) => async dispatch => {
  const response = await fetch(`/api/answers/${answerId}`, {
    method: 'DELETE'
  })
  const data = await response.json()
  if (response.ok) {
    dispatch(removeAnswer(answerId))
  }
  return data;
}

const initialState = {}

const answersReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ANSWERS: {
      const data = normalizeData(action.answers.Answers)
      const newState = data;
      return newState;
    }
    case ADD_ANSWER: {
      const answer = action.answer;
      const newState = { ...state }
      newState[answer.id] = answer;
      return newState;
    }
    case EDIT_ANSWER: {
      const answer = action.answer;
      const newState = { ...state }
      newState[answer.id] = answer;
      return newState;
    }
    case DELETE_ANSWER: {
      const newState = { ...state }
      delete newState[action.answerId]
      return newState;
    }
    default: {
      return state
    }
  }
}

export default answersReducer
