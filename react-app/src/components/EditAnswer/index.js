import { useParams, useHistory, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Editor, convertFromRaw, convertToRaw, EditorState } from 'draft-js'

import UserControls from "../UserControls";
import UserInfoCard from "../UserInfoCard";
import FormEditor from "../FormEditor";

import * as questionActions from '../../store/question'
import * as answerActions from '../../store/answer'

import getSpecificTimeAgo from "../../utils/getSpecificTimeAgo";

// This will be in the interface
// The question will be displayed at the top, like in single question
// The edit form will be displayed at the bottom, with data prepopulated

const EditAnswer = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {answerId} = useParams();
  const [loaded, setLoaded] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [answerErrors, setAnswerErrors] = useState([])
  const [disableButton, setDisableButton] = useState(true)

  const currentUser = useSelector(state => state.session.user)
  const currentQuestion = useSelector(state => state.questions.singleQuestion)
  const currentAnswer = useSelector(state => state.answers[answerId])

  // console.log(window.screenY)

  let questionId;
  if (currentAnswer) questionId = currentAnswer.questionId

  useEffect(() => {
    dispatch(questionActions.fetchSingleQuestion(questionId))
      .then(() => answerActions.getAnswersToQuestion(questionId))
      .then(() => setLoaded(true))
      .catch(() => {
        setLoaded(false)
        setNotFound(true)
      });

    let bodyContent
    let stateToDisplay
    if (currentAnswer && currentAnswer.answer) bodyContent = convertFromRaw(JSON.parse(currentAnswer.answer))
    if (bodyContent) stateToDisplay = EditorState.createWithContent(bodyContent)
    if (stateToDisplay) setEditorState(stateToDisplay)

    window.scrollTo(0, document.body.scrollHeight)
  },[dispatch, loaded])

  // useEffect(() => {
  //   console.log('Hello from use effect')
  //   window.scrollTo(0, document.body.scrollHeight)
  // },[])

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

      dispatch(answerActions.updateAnswer(answerId, newAnswer))
        .then(dispatch(answerActions.getAnswersToQuestion(questionId)))
        .then(history.push(`/questions/${questionId}`))
      setEditorState(EditorState.createEmpty())
    }
  }

  if ((!loaded) && (notFound)) {
    return (
      <h1>404 Not Found</h1>
      )
  }
  if (!loaded) {
    return null
  }

  let questionContent
  let questionStateToDisplay
  // console.log(JSON.parse(currentQuestion.body))
  if (currentQuestion.body) questionContent = convertFromRaw(JSON.parse(currentQuestion.body))
  if (questionContent) questionStateToDisplay = EditorState.createWithContent(questionContent)

  const goBack = () => {
    setEditorState(EditorState.createEmpty())
    history.push(`/questions/${questionId}`)
  }

  if (!currentUser || (currentUser?.id !== currentAnswer?.userId)) {
    return <Redirect to='/questions'/>
  }


  return (
    <div id="single-question-top-container">
      <div id="single-question-header">
        <div id="single-question-header-top">
          <div id="single-question-title">
            <Link to={`/questions/${currentQuestion.id}`}><h2>{currentQuestion.title}</h2></Link>
          </div>
          <div id="single-question-ask-button">
            <Link to='/questions/new'><button>Ask Question</button></Link>
          </div>
        </div>
        <div id="single-question-header-bottom">
          <div id="created-time">Asked {getSpecificTimeAgo(currentQuestion.createdAt)}</div>
          <div id="modified-time">Modified {getSpecificTimeAgo(currentQuestion.updatedAt)}</div>
        </div>
        <div id="header-bottom-border-div"></div>
      </div>
      <div id="content-column">
        <div id="question-content-container">
          <div className="vote-container">

          </div>
          <div id="single-question-content-right">
            <div id="single-question-body">
              {/* <p>{currentQuestion.body}</p> */}
              <Editor
                editorState={questionStateToDisplay}
                readOnly
              />
            </div>
              <div id="single-question-bottom-container">            <div id="single-question-user-controls-container">
                {/* {currentUser && currentQuestion.User && (currentUser.id === currentQuestion.User.id) && (
                  <UserControls question={currentQuestion}/>
                )} */}
              </div>
              <div id="user-information-holder">
                  <UserInfoCard user={currentQuestion.User} response={currentQuestion} responseType={'question'}/>
              </div>
            </div>
            </div>
          </div>
            <div id="create-answers-frame">
              <div id="create-answers-container">
              <h4>Edit Your Answer</h4>
              <form onSubmit={handleSubmit}>
                <div onBlur={handleAnswerErrors}>
                  <FormEditor placeHolder={''} editorState={editorState} setEditorState={setEditorState} onChange={(e) => setEditorState(e.target.value)} />
                </div>
                <ul className="list-errors-parent">
                    {answerErrors.map(error => (
                      <li className="list-errors" key={error}>{error}</li>
                    ))}
                </ul>
                <div id="create-question-button-container" className="create-answer-buttons">
                <button id="post-question-button" className="ask-question-button" type="submit" disabled={disableButton}>Save Edits</button>
                <button id="discard-draft-button" className="ask-question-button" type="button" onClick={goBack}>Cancel</button>
                </div>
              </form>
            </div>
            </div>
        </div>
    </div>
  )
}

export default EditAnswer;
