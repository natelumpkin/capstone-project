import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { EditorState, convertToRaw } from 'draft-js'
import FormEditor from "../FormEditor";
import * as questionActions from '../../store/question'

const CreateQuestion = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('')
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [titleErrors, setTitleErrors] = useState([])
  const [bodyErrors, setBodyErrors] = useState([])


  console.log(editorState.getCurrentContent().getPlainText().length)

  const handleTitleErrors = () => {
    let errors = [];
    if (title.length < 15) errors.push('Title must be more than 15 characters')
    if (title.length > 150) errors.push('Title must be less than 150 characters')
    setTitleErrors(errors)
  }

  const handleBodyErrors = () => {
    let errors = [];
    let bodyLength = editorState.getCurrentContent().getPlainText().length;
    if (bodyLength < 30) errors.push('Body must be more than 30 characters')
    if (bodyLength > 10000) errors.push('Body must be less than 10,000 characters')
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
      // dispatch(questionActions.createQuestion(newQuestion))
      //   .then((res) => console.log(res))
      // alert('Question submitted')
      setTitle('')
      setEditorState(EditorState.createEmpty())
    }


  }

  return (
    <div id="create-question-container">
      <h2>Ask a Public Question</h2>
      <div id="create-question-form-container">
        <div id="create-question-guidelines-container">
          <h4>Writing a Good Question</h4>
          <p>You’re ready to ask a programming-related question and this form will help guide you through the process.</p>
          <ul>
            Steps
            <li>Summarize your problem in a one-line title</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post it to the site</li>
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} onBlur={handleTitleErrors}></input>
              <ul>
                {titleErrors.map(error => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
          </div>
          <FormEditor placeHolder={'Type here'} editorState={editorState} setEditorState={setEditorState} onChange={(e) => setEditorState(e.target.value)} />
            <ul>
              {bodyErrors.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          <button>Submit Question</button>
        </form>
      </div>
      <div id="create-question-directions-container"></div>
    </div>
  )
}

export default CreateQuestion;
