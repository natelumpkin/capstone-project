import { useDispatch } from "react-redux"
import * as answerActions from '../../store/answer'
import * as questionActions from '../../store/question'

import './DeleteAnswer.css'

const DeleteAnswer = ({answer, setShowDelete}) => {
  const dispatch = useDispatch()


  const alert = (e) => {
    // console.log(e)
    dispatch(answerActions.deleteAnswer(answer.id))
      // .then(dispatch(questionActions.fetchSingleQuestion(answer.questionId)))
    setShowDelete(false)
  }

  return (
    <div>
      <p>Are you sure you want to delete this answer?</p>
      <form>
        <button type="button" onClick={() => setShowDelete(false)}>Cancel</button>
        <button type="button" onClick={(alert)}>Yes</button>
      </form>
    </div>
  )
}

export default DeleteAnswer;
