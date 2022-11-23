// Cases

const EDIT_ANSWER = 'answers/edit'
const DELETE_ANSWER = 'answers/delete'

// Actions

// Thunks

const initialState = {
  answers: {},
}

const answersReducer = (state = initialState, action) => {
  switch (action.case) {
    default: {
      return state
    }
  }
}

export default answersReducer
