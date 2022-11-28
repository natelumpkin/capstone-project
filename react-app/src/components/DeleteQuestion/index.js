import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import * as questionActions from '../../store/question'

import './DeleteQuestion.css'

const DeleteQuestion = ({question, setShowDelete}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const alert = (e) => {
    // console.log(e)
    dispatch(questionActions.deleteQuestion(question.id))
    setShowDelete(false)
    history.push('/questions')
  }

  return (
    <div className="delete-modal">
      <h2>crudovergrowth.com says</h2>
      <p>Delete this post?</p>
      <div className="delete-button-container">
        <button id="cancel-delete" type="button" onClick={() => setShowDelete(false)}>Cancel</button>
        <button id="confirm-delete" type="button" onClick={(alert)}>OK</button>
      </div>
    </div>
  )
}

export default DeleteQuestion;
