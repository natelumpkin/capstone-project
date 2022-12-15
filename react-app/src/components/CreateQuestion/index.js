import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { EditorState, convertToRaw } from 'draft-js'
import FormEditor from "../FormEditor";
import AddTagCard from "../AddTagCard";
import * as questionActions from '../../store/question'
import * as tagActions from '../../store/tag'
import convertFromEditorToJson from "../../utils/convertFromEditorToJSON";
import './CreateQuestion.css'

const CreateQuestion = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const tags = useSelector(state => state.tags)
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [titleErrors, setTitleErrors] = useState([]);
  const [bodyErrors, setBodyErrors] = useState([]);
  const [disableButton, setDisableButton] = useState(true);
  const [showTitleTips, setShowTitleTips] = useState(false)
  const [showBodyTips, setShowBodyTips] = useState(false)
  const [tagSearch, setTagSearch] = useState('')
  const [tagChoice, setTagChoice] = useState('')
  const [tag1, setTag1] = useState()
  const [tag2, setTag2] = useState()
  const [tag3, setTag3] = useState()
  const [tag4, setTag4] = useState()
  const [tag5, setTag5] = useState()
  const [tagDropdown, setTagDropdown] = useState(false)

  // save the tag object to state
  // display the tagCard to the user, displaying its name, with a button to remove
  // when remove button is clicked, setstate to undefined
  // on submit, for each state that is defined, addTagToQuestion with its id


  // console.log(tagChoice)

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

  // console.log(convertFromEditorToJson(editorState))

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

  let addTags = async (question) => {
    let questionId = question.id
    const tagArray = [tag1, tag2, tag3, tag4, tag5]
    for (let i = 0; i < tagArray.length; i++) {
      let tag = tagArray[i]
      if (tag && tag.newTag) {
        await dispatch(tagActions.createNewTag(tag))
        dispatch(questionActions.addTagToQuestion(questionId, tag.id))
      } else if (tag) {
        await dispatch(questionActions.addTagToQuestion(questionId, tag.id))
      }
    }
    return question.id
  }

  const handleSubmit = async (e) => {
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
      const question = await dispatch(questionActions.createQuestion(newQuestion))
      const questionId = await addTags(question)
      history.push(`/questions/${questionId}`)
      setTitle('')
      setEditorState(EditorState.createEmpty())
    }
  }

  console.log('tagSearch on render: ', tagSearch)

  const searchTags = () => {
    console.log('tagSearch in search function: ', tagSearch)
    dispatch(tagActions.getTags(tagSearch))
      .then(() => setTagDropdown(true))
  }


  const addTag = async () => {
    // look at the existing tags set to this question
    const tagArray = [tag1, tag2, tag3, tag4, tag5]
    // check to see if the tag you want is in state already
    let tagToSave = tags.find(tag => tag.tag === tagChoice)
    if (!tagToSave) {
    // if it's not, then
    // check to see if that exact tag is in the database
      let response = await fetch(`/api/tags?exactTag=${tagSearch}`)
      if (response.ok) {
        let data = await response.json()
        // set tagToSave to that tag in database
        tagToSave = data
      }
      //
       else {
        // otherwise, construct a NEW tag from your input in the searchbar,
        // but don't add it to the database yet
        tagToSave = {
          tag: tagSearch.toLowerCase(),
          description: '',
          newTag: true
        }
      }
    }
    // check to see if you already have this tag on the question, and refuse to add if so
    for (let i = 0; i < tagArray.length; i++) {
      let tag = tagArray[i]
      if (tag?.tag === tagToSave.tag) {
        console.log('You already have this tag, sorry')
        return
      }
    }
    // go through all the current adds, and set the tag to the first state that's unoccupied
    if (!tag1) {
      setTag1(tagToSave)
    } else if (!tag2) {
      setTag2(tagToSave)
    } else if (!tag3) {
      setTag3(tagToSave)
    } else if (!tag4) {
      setTag4(tagToSave)
    } else if (!tag5) {
      setTag5(tagToSave)
    }
    setTagSearch('')
    setTagChoice('')
    // ta da!
  }

  const titlePlaceholder = 'e.g. Is there an R function for finding the index of an element in a vector?'
  // const bodyPlaceholder = ''

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
              maxLength={100}
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
            // onClick={() => setShowBodyTips(true)}
            onBlur={() => {
              handleBodyErrors()
              setShowBodyTips(false)
            }}
            >

            <label>Body</label>
            <p>The body of your question contains your problem details and results. Minimum 30 characters.</p>
            <FormEditor
              placeHolder={''}
              editorState={editorState}
              setEditorState={setEditorState}
              setShowBodyTips={setShowBodyTips}
              onChange={(e) => setEditorState(e.target.value)} />
              <ul className="list-errors-parent">
                {bodyErrors.map(error => (
                  <li className="list-errors" key={error}>{error}</li>
                ))}
              </ul>
          </div>
          <div className="form-container">
            <input
            type="text"
            value={tagSearch}
            onChange={(e) => {
              setTagSearch(e.target.value)
              // console.log(tagSearch)
              // console.log(e.target.value)
              // if (tagSearch === e.target.value) searchTags()
            }}
            >
            </input>
            <button
              type="button"
              onClick={() => {
                searchTags()
              }}
            >
              Search Tags
            </button>
            {tagDropdown && (
              <select id="tag-chooser" value={tagChoice} onChange={(e) => setTagChoice(e.target.value)} name="tag-choices">
                    <option value="">Add up to 5 tags</option>
                    {tags.map(tag => (
                      <option key={tag.id}>{tag.tag}</option>
                    ))}
              </select>
            )}
            {/* {tagDropdown && (
              <div>
                    {tags.map(tag => (
                      <div
                        onClick={() => {
                          setTagChoice(tag)
                          addTag()
                          setTagSearch('')
                          setTagDropdown(false)
                        }}
                        key={tag.id}>
                          {tag.tag}
                      </div>
                    ))}
              </div>
            )} */}
            <button type="button" onClick={addTag}>Add Tag</button>
            <div id="tag-display">
              {tag1 && (
                <AddTagCard tag={tag1} setTag={setTag1}/>
              )}
              {tag2 && (
                <AddTagCard tag={tag2} setTag={setTag2}/>
              )}
              {tag3 && (
                <AddTagCard tag={tag3} setTag={setTag3}/>
              )}
              {tag4 && (
                <AddTagCard tag={tag4} setTag={setTag4}/>
              )}
              {tag5 && (
                <AddTagCard tag={tag5} setTag={setTag5}/>
              )}
            </div>
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
              <div className="question-tips-pencil"><i className="fa-solid fa-pencil"></i></div>
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
              <div className="question-tips-pencil"><i className="fa-solid fa-pencil"></i></div>
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
