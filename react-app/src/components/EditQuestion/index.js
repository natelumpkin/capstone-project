import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import FormEditor from "../FormEditor";
import * as questionActions from '../../store/question'

import './EditQuestion.css'

const EditQuestion = () => {

  const {questionId} = useParams();

  const dispatch = useDispatch();
  const history = useHistory()
  const question = useSelector(state => state.questions.singleQuestion)
  const user = useSelector(state => state.session.user)
  const [title, setTitle] = useState('loading' || question.title)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [titleErrors, setTitleErrors] = useState([])
  const [bodyErrors, setBodyErrors] = useState([])
  const [disableButton, setDisableButton] = useState(true)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    dispatch(questionActions.fetchSingleQuestion(questionId))
      .then(() => setLoaded(true))
    setTitle(question.title || 'loading')

    let bodyContent
    let stateToDisplay
    if (question.body) bodyContent = convertFromRaw(JSON.parse(question.body))
    if (bodyContent) stateToDisplay = EditorState.createWithContent(bodyContent)
    if (stateToDisplay) setEditorState(stateToDisplay)
  }, [dispatch, loaded])

  useEffect(() => {
    let bodyLength = editorState.getCurrentContent().getPlainText().length;
    if (title.length >= 15 && title.length <= 100
      && bodyLength >= 30 && bodyLength <= 10000) {
        setDisableButton(false)
      } else {
        setDisableButton(true)
      }
    if (title.length >= 15 && title.length <= 100) {
      handleTitleErrors()
    }
    if (bodyLength >= 30 && bodyLength <= 10000) {
      handleBodyErrors()
    }
  }, [title, editorState])

  // useEffect(() => {
  //     let bodyContent;
  //     let stateToDisplay;
  //     if (question.title) setTitle(question.title)
  //   // if (question.body) bodyContent = convertFromRaw(JSON.parse(question.body))
  //   // if (bodyContent) stateToDisplay = EditorState.createWithContent(bodyContent)
  //   // if (stateToDisplay) setEditorState(stateToDisplay)
  // }, [])

  // console.log("title var: ", title)
  // console.log("loaded var: ", loaded)


  // console.log(editorState.getCurrentContent().getPlainText().length)

  const handleTitleErrors = () => {
    let errors = [];
    if (title.length < 15) errors.push('Title must be at least 15 characters')
    if (title.length > 100) errors.push('Title cannot be more than 100 characters')
    setTitleErrors(errors)
  }

  const handleBodyErrors = () => {
    let errors = [];
    let bodyLength = editorState.getCurrentContent().getPlainText().length;
    if (bodyLength < 30) errors.push('Body must be at least 30 characters')
    if (bodyLength > 10000) errors.push('Body cannot be more than 10,000 characters')
    setBodyErrors(errors)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    handleBodyErrors()
    handleTitleErrors()

    if (!bodyErrors.length && !titleErrors.length) {
      const content = editorState.getCurrentContent()
      const bodyToSave = JSON.stringify(convertToRaw(content))

      const newQuestion = {
        title: title,
        body: bodyToSave
      }
      dispatch(questionActions.editQuestion(question.id, newQuestion))
        .then((question) => history.push(`/questions/${question.id}`))
      setTitle('')
      setEditorState(EditorState.createEmpty())
    }
  }

  const titlePlaceholder = 'e.g. Is there an R function for finding the index of an element in a vector?'
  const bodyPlaceholder = ''

  if (loaded && (!user || user.id !== question.User.id)) {
    return (
      <Redirect to="/questions"/>
    )
  }

  // if (user.id !== question.User.id) {
  //   return (
  //     <h1>Unauthorized</h1>
  //   )
  // }

  // console.log(user.id !== question.User.id)

  if (loaded) {
    // console.log('Rendering')
  return (
    <div id="create-question-container">
      <h2>Edit Your Question</h2>
      <div id="create-question-form-container">

        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <label>Title</label>
            <p>Be specific and imagine you’re asking a question to another person.</p>
            <input
              maxLength={100}
              id="title-input"
              value={title}
              placeholder={titlePlaceholder}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleErrors}></input>
              <ul className="list-errors-parent">
                {titleErrors.map(error => (
                  <li className="list-errors" key={error}>{error}</li>
                ))}
              </ul>
          </div>
          <div className="form-container" onBlur={handleBodyErrors}>
            <label>Body</label>
            <p>The body of your question contains your problem details and results. Minimum 30 characters.</p>
            <FormEditor placeHolder={''} editorState={editorState} setEditorState={setEditorState} onChange={(e) => setEditorState(e.target.value)} />
              <ul className="list-errors-parent">
                {bodyErrors.map(error => (
                  <li className="list-errors" key={error}>{error}</li>
                ))}
              </ul>
          </div>
          <div id="create-question-button-container">
            <button id="post-question-button" className="ask-question-button" disabled={disableButton}>Post Your Revision</button>
            <button id="discard-draft-button" className="ask-question-button" onClick={() => history.push('/questions')}>Cancel</button>
          </div>
        </form>
      </div>
      <div id="create-question-directions-container"></div>
    </div>
  )
                } else {
                  return null
                }
}

export default EditQuestion
