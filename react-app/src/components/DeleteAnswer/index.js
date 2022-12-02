import { useDispatch } from "react-redux"
import * as answerActions from '../../store/answer'
import * as questionActions from '../../store/question'

import './DeleteAnswer.css'

const DeleteAnswer = ({answer, setShowDelete}) => {
  const dispatch = useDispatch()


  const alert = (e) => {
    // console.log(e)
    dispatch(answerActions.deleteAnswer(answer.id))
       .then(() => dispatch(questionActions.fetchSingleQuestion(answer.questionId)))
    setShowDelete(false)
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

export default DeleteAnswer;
