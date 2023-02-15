import normalizeData from "../utils/normalizeData"

// Cases

const LOAD_QUESTIONS = 'questions/all'
const ONE_QUESTION = 'questions/one'
const EDIT_QUESTION = 'questions/edit'
const ADD_QUESTION = 'questions/create'
const DELETE_QUESTION = 'questions/delete'
const ADD_TAG = 'questions/addTag'
const ADD_VOTE = 'questions/addVote'
const DELETE_VOTE = 'questions/deleteVote'

// Actions

const getQuestions = (questions) => ({
  type: LOAD_QUESTIONS,
  questions
})

const getOneQuestion = (question) => ({
  type: ONE_QUESTION,
  question
})

const addQuestion = (question) => ({
  type: ADD_QUESTION,
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

const addTag = (questionId, tag) => ({
  type: ADD_TAG,
  questionId,
  tag
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

export const fetchAllQuestions = (tagId, searchParams) => async dispatch => {
  let response
  let page
  if (searchParams) {
    page = searchParams.page
  }
  // console.log(tagId)
  if (tagId) {
    if (searchParams) {
      response = await fetch(`/api/tags/${tagId}/questions?page=${page}`)
    } else {
      response = await fetch(`/api/tags/${tagId}/questions`)
    }
    // console.log('fetching tags')
  } else {
    // console.log('fetching all questions')
    response = await fetch('/api/questions')
  }
  if (response.ok) {
    const questions = await response.json()
    dispatch(getQuestions(questions))
    return questions
  } else {
    const errors = await response.json()
    return errors
  }
}

export const fetchFilteredQuestions = (searchParams) => async dispatch => {
  const { page,
    size,
    author,
    score,
    keywords,
    numAnswers,
    unanswered,
    order } = searchParams

  let fetchString = '/api/questions?'
  let searchArray = []

  if (page) searchArray.push(`page=${page}`)
  if (size) searchArray.push(`size=${size}`)
  if (author) searchArray.push(`author=${author}`)
  if (score) searchArray.push(`score=${score}`)
  if (keywords) searchArray.push(`keywords=${keywords}`)
  if (numAnswers) searchArray.push(`num_answers=${numAnswers}`)
  if (unanswered) searchArray.push(`unanswered=true`)
  if (order) searchArray.push(`order=${order}`)

  fetchString += searchArray.join('&')

  console.log(fetchString)

  let response = await fetch(fetchString)
  if (response.ok) {
    const questions = await response.json()
    dispatch(getQuestions(questions))
    // console.log(questions)
    return questions
  } else {
    const errors = await response.json()
    return errors
  }
}

export const fetchSingleQuestion = (questionId) => async dispatch => {
  // console.log(questionId)
  const response = await fetch(`/api/questions/${questionId}`)
  const data = await response.json()
  if (response.ok) {
    dispatch(getOneQuestion(data))
    return data
  }
  // throw new Error();
  else {
    return data;
  }
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
    dispatch(addQuestion(data))
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
    dispatch(updateQuestion(data));
    return data;
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

export const addTagToQuestion = (questionId, tagId) => async dispatch => {
  const response = await fetch(`/api/questions/${questionId}/tags`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      tagId
    })
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(addTag(questionId, data.Tag))
    return data
  } else {
    const errors = await response.json()
    return errors
  }
}

export const removeTagFromQuestion = (questionId, tagId) => async dispatch => {
  const response = await fetch(`/api/questions/${questionId}/tags/${tagId}`, {
    method: 'DELETE'
  })
  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    const errors = await response.json()
    return errors
  }
}

export const addVoteToQuestion = (questionId, vote) => async dispatch => {
  const response = await fetch(`/api/questions/${questionId}/votes`, {
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

export const updateQuestionVote = (voteId, vote) => async dispatch => {
  const response = await fetch(`/api/questionVotes/${voteId}`, {
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

export const deleteVoteFromQuestion = (voteId, vote) => async dispatch => {
  const response = await fetch(`/api/questionVotes/${voteId}`, {
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


const initialState = {
  allQuestions: {},
  singleQuestion: {},
  numQuestions: null
}

const questionsReducer = (state = initialState, action) => {
  // console.log('Hello from questionsReducer')
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
      newState.numQuestions = action.questions.numQuestions;
      return newState
    }
    case (ONE_QUESTION): {
      const newState = {
        allQuestions: {
          ...state.allQuestions
        },
        singleQuestion: {},
        numQuestions: state.numQuestions
      }
      let voteData = normalizeData(action.question.Votes)
      const data = action.question;
      data.Votes = voteData;
      newState.singleQuestion = data;
      return newState;
    }
    case (ADD_QUESTION): {
      const newState = {
        allQuestions: {
          ...state.allQuestions
        },
        singleQuestion: {
          ...state.singleQuestion
        },
        numQuestions: state.numQuestions + 1
      }
      newState.allQuestions[action.question.id] = action.question
      return newState;
    }
    case (EDIT_QUESTION): {
      const newState = {
        allQuestions: {
          ...state.allQuestions
        },
        singleQuestion: {},
        numQuestions: state.numQuestions
      }
      const data = action.updatedQuestion
      data.Votes = normalizeData(action.updatedQuestion.Votes)
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
        singleQuestion: {},
        numQuestions: state.numQuestions - 1
      }
      delete newState.allQuestions[action.questionId]
      return newState
    }
    case (ADD_TAG): {
      const newState = {
        allQuestions: {
          ...state.allQuestions
        },
        singleQuestion: {
          ...state.singleQuestion
        },
        numQuestions: state.numQuestions
      }
      if (newState.allQuestions[action.questionId]) {
        newState.allQuestions[action.questionId].Tags = [
        ...state.allQuestions[action.questionId].Tags, action.tag
      ]
      }
      newState.singleQuestion.Tags = [
        ...state.singleQuestion.Tags, action.tag
      ]
      return newState;
    }
    case (ADD_VOTE): {
      const newState = {
        allQuestions: {
          ...state.allQuestions
        },
        singleQuestion: {
          ...state.singleQuestion
        },
        numQuestions: state.numQuestions
      }
      newState.singleQuestion.Votes = {...state.singleQuestion.Votes}
      newState.singleQuestion.Votes[action.vote.id] = action.vote
      if (action.vote.vote) newState.singleQuestion.totalScore += 1
      if (!action.vote.vote) newState.singleQuestion.totalScore -= 1
      return newState
    }
    case (DELETE_VOTE): {
      const newState = {
        allQuestions: {
          ...state.allQuestions
        },
        singleQuestion: {
          ...state.singleQuestion
        },
        numQuestions: state.numQuestions
      }
      delete newState.singleQuestion.Votes[action.voteId]

      if (action.vote) newState.singleQuestion.totalScore += 1
      if (!action.vote) newState.singleQuestion.totalScore -= 1
      return newState;
    }
    default: {
      return state
    }
  }
}

export default questionsReducer
