import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FormEditor from "../FormEditor";

const CreateQuestion = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')


  console.log(body)
  // const editor = useRef(null);

  // function focusEditor() {
  //   editor.current.focus();
  // }

  // useEffect(() => {
  //   focusEditor()
  // }, [])

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
        <form>
          <div>
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
          </div>
          <FormEditor value={body} onChange={(e) => setBody(e.target.value)} />
        </form>
      </div>
      <div id="create-question-directions-container"></div>
    </div>
  )
}

export default CreateQuestion;
