import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import * as questionActions from '../../store/question'

const DeleteQuestion = ({question, setShowDelete}) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const alert = (e) => {
    console.log(e)
    dispatch(questionActions.deleteQuestion(question.id))
    setShowDelete(false)
    history.push('/questions')
  }

  return (
    <dialog open>
      <p>Are you sure you want to delete this question?</p>
      <form>
        <button type="button" onClick={() => setShowDelete(false)}>Cancel</button>
        <button type="button" onClick={(alert)}>Yes</button>
      </form>
    </dialog>
  )
}

export default DeleteQuestion;
