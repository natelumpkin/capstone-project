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

const removeVote = (vote) => ({
  type: DELETE_VOTE,
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

export const deleteVoteFromAnswer = (vote) => async dispatch => {
  // vote for this function has the form of the original vote object
  const response = await fetch(`/api/answerVotes/${vote.id}`, {
    method: "DELETE"
  })
  if (response.ok) {
    let data = await response.json()
    dispatch(removeVote(vote))
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
      // const voteData = normalizeData(action.answer.Votes)
      // newState[action.answer.id] = voteData
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
    case CLEAR_ANSWERS: {
      const newState = {};
      return newState;
    }
    case ADD_VOTE: {
      const newState = { ...state }
      newState[action.vote.answer_id].Votes[action.vote.id] = action.vote
      if (action.vote.vote) newState[action.vote.answer_id].totalScore += 1
      if (!action.vote.vote) newState[action.vote.answer_id].totalScore -= 1
      return newState
    }
    case DELETE_VOTE: {
      const newState = { ...state }
      delete newState[action.vote.answer_id].Votes[action.vote.id]
      if (action.vote.vote) newState[action.vote.answer_id].totalScore -= 1
      if (!action.vote.vote) newState[action.vote.answer_id].totalScore += 1
      return newState
    }
    default: {
      return state
    }
  }
}

export default answersReducer
