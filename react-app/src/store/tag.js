import normalizeData from "../utils/normalizeData";

// ACTION TYPES

const LOAD_TAGS = 'tags/load'
const CLEAR_TAGS = 'tags/clear'

// ACTION CREATORS

const addTags = (tags) => ({
  type: LOAD_TAGS,
  tags
})

export const clearTags = () => ({
  type: CLEAR_TAGS
})

// THUNKS

export const getTags = (searchParam) => async dispatch => {
    let response
  if (searchParam) {
    response = await fetch(`/api/tags?tag=${searchParam}`)
  } else {
    response = await fetch('/api/tags')
  }
  if (response.ok) {
    const data = await response.json()
    dispatch(addTags(data))
  }
}

export const createNewTag = (tagName) => async dispatch => {
  const response = await fetch('/api/tags/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      tag: tagName
    })
  })

  const data = await response.json()
  return data
}

const initialState = []

const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case (LOAD_TAGS): {
      const tags = action.tags;
      const newState = tags.Tags;
      return newState;
    }
    case (CLEAR_TAGS): {
      const newState = [];
      return newState;
    }
    default:
      return state
  }
}

export default tagReducer;
