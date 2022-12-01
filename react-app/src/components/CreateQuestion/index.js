import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { EditorState, convertToRaw } from 'draft-js'
import FormEditor from "../FormEditor";
import * as questionActions from '../../store/question'
import convertFromEditorToJson from "../../utils/convertFromEditorToJSON";
import './CreateQuestion.css'

const CreateQuestion = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [titleErrors, setTitleErrors] = useState([]);
  const [bodyErrors, setBodyErrors] = useState([]);
  const [disableButton, setDisableButton] = useState(true);
  const [showTitleTips, setShowTitleTips] = useState(false)
  const [showBodyTips, setShowBodyTips] = useState(false)

  useEffect(() => {
    let bodyLength = editorState.getCurrentContent().getPlainText().length;
    if (title.length >= 15 && title.length <= 150
      && bodyLength >= 30 && bodyLength <= 10000) {
        setDisableButton(false)
      } else {
        setDisableButton(true)
      }
    if (title.length >= 15 && title.length <= 150) {
      handleTitleErrors()
    }
    if (bodyLength >= 30 && bodyLength <= 10000) {
      handleBodyErrors()
    }
  }, [title, editorState])

  // console.log(convertFromEditorToJson(editorState))

  const handleTitleErrors = () => {
    let errors = [];
    if (title.length < 15) errors.push('Title must be at least 15 characters')
    if (title.length > 150) errors.push('Title cannot be more than 150 characters')
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
      dispatch(questionActions.createQuestion(newQuestion))
        .then((question) => history.push(`/questions/${question.id}`))
      setTitle('')
      setEditorState(EditorState.createEmpty())
    }
  }

  const titlePlaceholder = 'e.g. Is there an R function for finding the index of an element in a vector?'
  const bodyPlaceholder = ''

  // console.log('title tips: ', showTitleTips)
  // console.log('body tips: ', showBodyTips)

  if (!user) {
    return (
      <Redirect to="/questions"/>
    )
  }

  return (
    <div id="create-question-container">
      <h2>Ask a Public Question</h2>
      <div id="create-question-form-container">
        <div id="create-question-guidelines-container">
          <h4>Writing a good question</h4>
          <p>You’re ready to ask a programming-related question and this form will help guide you through the process.</p>

            <h5>Steps</h5>
            <ul>
            <li>Summarize your problem in a one-line title</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post it to the site</li>
            </ul>
        </div>
        <div id="form-and-tips-container">
        <form id="create-question-form" onSubmit={handleSubmit}>
          <div className="form-container">
            <label>Title</label>
            <p>Be specific and imagine you’re asking a question to another person.</p>
            <input
              maxLength={150}
              id="title-input"
              value={title}
              placeholder={titlePlaceholder}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => {
                handleTitleErrors()
                setShowTitleTips(false)
              }}
              onFocus={() => setShowTitleTips(true)}
              >
            </input>
              <ul className="list-errors-parent">
                {titleErrors.map(error => (
                  <li className="list-errors" key={error}>{error}</li>
                ))}
              </ul>
          </div>
          <div
            className="form-container"
            onClick={() => setShowBodyTips(true)}
            onBlur={() => {
              handleBodyErrors()
              setShowBodyTips(false)
            }}
            >

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
            <button id="post-question-button" className="ask-question-button" disabled={disableButton}>Post Your Question</button>
            <button id="discard-draft-button" className="ask-question-button" onClick={() => history.push('/questions')}>Discard Draft</button>
          </div>
        </form>
        <div id="tips-container">
        {showTitleTips && (
          <div id="answer-tips-popup" className="question-tips title-tips">
            <div className="question-tips-header">
              <h4>Writing a good title</h4>
            </div>
            <div className="question-tips-content">
              <div className="question-tips-pencil"><i class="fa-solid fa-pencil"></i></div>
              <div className="question-tips-list">
                <p>Your title should summarize the problem</p>
                <p>You might find that you have a better idea of your title after writing out the rest of the question.</p>
              </div>
            </div>
          </div>
        )}
        {showBodyTips && (
          <div id="answer-tips-popup" className="question-tips">
            <div className="question-tips-header">
              <h4>Writing a good body</h4>
            </div>
            <div className="question-tips-content">
              <div className="question-tips-pencil"><i class="fa-solid fa-pencil"></i></div>
              <div className="question-tips-list">
                <p>Explain how you encountered the problem you’re trying to solve, and any difficulties that have prevented you from solving it yourself.</p>
                <p>Show what you’ve tried, tell us what happened, and why it didn’t meet your needs.</p>
                <p>Not all questions benefit from including code, but if your problem is better understood with code you’ve written, you should include a minimal, reproducible example.</p>
                <p>Please make sure to post code and errors as text directly to the question, and format them appropriately.</p>
              </div>
            </div>
          </div>
        )}
        </div>
        </div>
      </div>
    </div>
  )
}

export default CreateQuestion;
