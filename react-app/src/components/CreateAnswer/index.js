import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { EditorState, convertToRaw } from 'draft-js'
import FormEditor from "../FormEditor";
import * as answerActions from '../../store/answer'
import './CreateAnswer.css'


const CreateAnswer = ({questionId}) => {

  const dispatch = useDispatch()
  const history = useHistory()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [answerErrors, setAnswerErrors] = useState([])
  const [disableButton, setDisableButton] = useState(true)
  const [showTips, setShowTips] = useState(false)
  const [disableTips, setDisableTips] = useState(false)

  // console.log('showTips: ', showTips)
  // console.log('disableTips: ', disableTips)

  useEffect(() => {
    let answerLength = editorState.getCurrentContent().getPlainText().length;
    if (answerLength > 30 && answerLength < 10000) {
      setDisableButton(false);
      handleAnswerErrors();
    } else {
      setDisableButton(true)
    }
  },[editorState])

  const closeTips = () => {
    setShowTips(false)
    setDisableTips(true)
  }

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
      <div onBlur={handleAnswerErrors} onFocus={() => setShowTips(true)}>
        <FormEditor placeHolder={''} editorState={editorState} setEditorState={setEditorState} onChange={(e) => setEditorState(e.target.value)} />
      </div>
      <ul className="answer-errors">
          {answerErrors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      {showTips && !disableTips && (
        <div>
          <button onClick={closeTips}>X</button>
          <p>Thanks for contributing an answer to CRUD Overgrowth!</p>
          <ul>
            <li>Please be sure to answer the question! Provide details and share your research!</li>
          </ul>
          <p>But avoid...</p>
          <ul>
            <li>Asking for help, clarification, or responding to other answers</li>
            <li>Making statements based on opinion; back them up with references or personal experience</li>
          </ul>
        </div>
      )}
      <button disabled={disableButton}>Post Your Answer</button>
      </form>
    </div>
  )
}

export default CreateAnswer;
