import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { EditorState, convertToRaw, Editor } from 'draft-js'
import FormEditor from "../FormEditor";
import * as answerActions from '../../store/answer'
import * as questionActions from '../../store/question'
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
    if (answerLength >= 30 && answerLength <= 10000) {
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
    if (answerLength < 30) errors.push('Answer must be at least 30 characters')
    if (answerLength > 10000) errors.push('Answer cannot be more than 10,000 characters')
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
        .then(() => dispatch(answerActions.getAnswersToQuestion(questionId)))
        .then(() => dispatch(questionActions.fetchSingleQuestion(questionId)))
      setEditorState(EditorState.createEmpty())
    }

  }

  const resetFields = (e) => {
    e.preventDefault()
    // console.log('running reset')
    setEditorState(EditorState.createEmpty())
  }

  // console.log(editorState)

  return (
    <div id="create-answers-frame">
    <div id='create-answers-container'>
      <h4>Your Answer</h4>
      <form onSubmit={handleSubmit}>
      <div onBlur={handleAnswerErrors} onFocus={() => setShowTips(true)}>
        <FormEditor placeHolder={''} editorState={editorState} setEditorState={setEditorState} onChange={(e) => setEditorState(e.target.value)} />
      </div>
      <ul className="list-errors-parent">
          {answerErrors.map(error => (
            <li className="list-errors" key={error}>{error}</li>
          ))}
        </ul>
      {showTips && !disableTips && (
        <div id="answer-tips-popup">
          <div id="answer-tips-content">
            <p>Thanks for contributing an answer to CRUD Overgrowth!</p>
            <ul>
              <li>Please be sure to <em>answer the question.</em> Provide details and share your research!</li>
            </ul>
            <p>But <em>avoid...</em></p>
            <ul>
              <li>Asking for help, clarification, or responding to other answers</li>
              <li>Making statements based on opinion; back them up with references or personal experience</li>
            </ul>
          </div>
          <div id="close-tips-box">
            <div id="close-tips-button" onClick={closeTips}>X</div>
          </div>
        </div>
      )}
      <div id="create-question-button-container" className="create-answer-buttons">
        <button id="post-question-button" className="ask-question-button" type="submit" disabled={disableButton}>Post Your Answer</button>
        <button id="discard-draft-button" className="ask-question-button" type="button" onClick={resetFields}>Discard</button>
      </div>
      </form>
    </div>
    </div>
  )
}

export default CreateAnswer;
