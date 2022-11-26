import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { EditorState, convertToRaw } from 'draft-js'
import FormEditor from "../FormEditor";
import * as answerActions from '../../store/answer'


const CreateAnswer = ({questionId}) => {

  const dispatch = useDispatch()
  const history = useHistory()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [answerErrors, setAnswerErrors] = useState([])
  const [disableButton, setDisableButton] = useState(true)

  useEffect(() => {
    let answerLength = editorState.getCurrentContent().getPlainText().length;
    if (answerLength > 30 && answerLength < 10000) {
      setDisableButton(false);
      handleAnswerErrors();
    } else {
      setDisableButton(true)
    }
  },[editorState])

  const handleAnswerErrors = () => {
    let errors = [];
    let answerLength = editorState.getCurrentContent().getPlainText().length;
    if (answerLength < 30) errors.push('Answer must be more than 30 characters')
    if (answerLength > 10000) errors.push('Answer must be less than 10,000 characters')
    setAnswerErrors(errors)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    handleAnswerErrors();

    if (!answerErrors.length) {
      const content = editorState.getCurrentContent()
      const answerToSave = JSON.stringify(convertToRaw(content))

      const newAnswer = {
        answer: answerToSave
      }

      dispatch(answerActions.createNewAnswer(questionId, newAnswer))
        .then(dispatch(answerActions.getAnswersToQuestion(questionId)))
      setEditorState(EditorState.createEmpty())
    }

  }

  return (
    <div>
      <h4>Your Answer</h4>
      <form onSubmit={handleSubmit}>
      <div onBlur={handleAnswerErrors}>
        <FormEditor placeHolder={''} editorState={editorState} setEditorState={setEditorState} onChange={(e) => setEditorState(e.target.value)} />
        <ul>
          {answerErrors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
      <button disabled={disableButton}>Post Your Answer</button>
      </form>
    </div>
  )
}

export default CreateAnswer;
