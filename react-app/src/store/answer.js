// Cases

import normalizeData from "../utils/normalizeData"

const ONE_ANSWER = 'answers/one'
const LOAD_ANSWERS = 'answers/load'
const ADD_ANSWER = 'answers/create'
const EDIT_ANSWER = 'answers/edit'
const DELETE_ANSWER = 'answers/delete'
const CLEAR_ANSWERS = 'answers/clear'
const ADD_VOTE = 'answers/addVote'
const DELETE_VOTE = 'answers/deleteVote'

// Actions

const addOneAnswer = (answer) => ({
  type: ONE_ANSWER,
  answer
})

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

export const clearAnswers = () => ({
  type: CLEAR_ANSWERS
})

const addVote = (vote) => ({
  type: ADD_VOTE,
  vote
})

const removeVote = (voteId, vote) => ({
  type: DELETE_VOTE,
  voteId,
  vote
})

// Thunks

export const getOneAnswer = (answerId) => async dispatch => {
  // console.log(answerId)
  const response = await fetch(`/api/answers/${answerId}`)
  if (response.ok) {
    const data = await response.json()
    dispatch(addOneAnswer(data))
  }
  else {
    const errors = await response.json()
    return errors;
  }
}

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

export const addVoteToAnswer = (answerId, vote) => async dispatch => {
  const response = await fetch(`/api/answers/${answerId}/votes`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      vote
    })
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(addVote(data))
    return data
  } else {
    const errors = await response.json()
    return errors
  }
}

export const updateAnswerVote = (voteId, vote) => async dispatch => {
  const response = await fetch(`/api/answerVotes/${voteId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      vote
    })
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(addVote(data))
    return data
  } else {
    const errors = await response.json()
    return errors
  }
}

export const deleteVoteFromAnswer = (voteId, vote) => async dispatch => {
  const response = await fetch(`/api/answerVotes/${voteId}`, {
    method: "DELETE"
  })
  if (response.ok) {
    let data = await response.json()
    dispatch(removeVote(voteId, vote))
    return data
  } else {
    let errors = await response.json()
    return errors
  }
}

const initialState = {}

const answersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ONE_ANSWER: {
      const newState = { ...state}
      newState[action.answer.id] = action.answer
      const voteData = normalizeData(action.answer.Votes)
      newState[action.answer.id] = voteData
      return newState
    }
    case LOAD_ANSWERS: {
      const answerData = normalizeData(action.answers.Answers)
      for (let answerId in answerData) {
        const voteData = normalizeData(answerData[answerId].Votes)
        answerData[answerId].Votes = voteData
      }
      const newState = answerData;
      return newState;
    }
    case ADD_ANSWER: {
      const answer = action.answer;
      const newState = { ...state }
      newState[answer.id] = answer;
      newState[answer.id].Votes = {}
      return newState;
    }
    case EDIT_ANSWER: {
      const answer = action.answer;
      const newState = { ...state }
      newState[answer.id] = answer;
      newState[answer.id].Votes = {...state[answer.id].Votes}
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
    case CLEAR_ANSWERS: {
      const newState = {};
      return newState;
    }
  }
}

export default answersReducer
