import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { EditorState, convertToRaw } from 'draft-js'

import FormEditor from "../FormEditor";
import AddTagCard from "../AddTagCard";
import TagNameCard from "../TagNameCard";

import * as questionActions from '../../store/question'
import * as tagActions from '../../store/tag'

import convertFromEditorToJson from "../../utils/convertFromEditorToJSON";

import './CreateQuestion.css'
import TagSelectDropdown from "../TagSelectDropdown";

const CreateQuestion = () => {


  // Table of Contents :)

  // Hooks
  // Error Handling Use Effect
  // Error Handling Functions
  // addTags function for Submit
  // handleSubmit
  // searchTags function
  // addTag function for selecting tags
  // Auth protection redirect
  // Render return

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

  useEffect(() => {
    const body = window.document.body;
    body.classList.add('light-grey')
    return () => {
      body.classList.remove('light-grey')
    }
  },[])

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
        tag = await dispatch(tagActions.createNewTag(tag))
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

  // console.log('tagSearch on render: ', tagSearch)

  const searchTags = (searchWord) => {
    // console.log('tagSearch in search function: ', tagSearch)
    dispatch(tagActions.getTags(searchWord))
      .then(() => {
        if (searchWord) setTagDropdown(true)
        if (!searchWord) setTagDropdown(false)
      })
  }

  const searchForTag = async (searchTerm) => {
    let response = await fetch(`/api/tags?exactTag=${tagSearch}`)
    if (response.ok) {
      let data = await response.json()
      return data;
    } else {
      return false;
    }
  }


  const addTag = async (newTag) => {
    console.log('tagChoice: ', tagChoice)
    // create a list of the tags attached to this question
    const tagArray = [tag1, tag2, tag3, tag4, tag5]
    console.log('tagArray: ', tagArray)
    // check to see if the tag you want is attached to this question
    let tagToSave = tags.find(tag => tag.tag === tagChoice)
    // if it's not in attached to this question
    if (!tagToSave && newTag.id) {
      // but if you're clicking on a div, we know the tag is in the database
      // and can just make that tagToSave
      tagToSave = newTag
    } else if (!tagToSave) {
    // otherwise lets check to see if the exact contents of the searchbar
    // matches a tag in the database
      let response = await fetch(`/api/tags?exactTag=${tagSearch}`)
      if (response.ok) {
        // if we get a good response
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
      // console.log('tag in array: ', tag?.tag)
      // console.log('tag to save: ', tagToSave.tag)
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
    // console.log('resetting inputs')
    setTagSearch('')
    setTagChoice('')
    setTagDropdown(false)
    // ta da!
  }

  const titlePlaceholder = 'e.g. Is there an R function for finding the index of an element in a vector?'
  // const bodyPlaceholder = ''

  // let stateTags = [tag1, tag2, tag3, tag4, tag5]
  // console.log(stateTags)

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
            <label>Tags</label>
            <p>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</p>
            <div id="tag-input-holder">
              <input
              id="tag-input"
              type="text"
              maxLength={30}
              value={tagSearch}
              onChange={(e) => {
                setTagSearch(e.target.value)
                searchTags(e.target.value)
              }}
              >

              </input>
              <button
                type="button"
                id="new-tag-button"
                disabled={!tagSearch.length}
                onClick={addTag}>Add Tag</button>
            </div>
            {/* <button
              type="button"
              onClick={() => {
                searchTags()
              }}
            >
              Search Tags
            </button> */}
            {/* {tagDropdown && (
              <select id="tag-chooser" value={tagChoice} onChange={(e) => setTagChoice(e.target.value)} name="tag-choices">
                    <option value="">Add up to 5 tags</option>
                    {tags.map(tag => (
                      <option key={tag.id}>{tag.tag}</option>
                    ))}
              </select>
            )} */}

            {tagDropdown && (
              <TagSelectDropdown selectedTags={[tag1, tag2, tag3, tag4, tag5]} setTagSearch={setTagSearch} setTagChoice={setTagChoice} addTag={addTag} setTagDropdown={setTagDropdown} tags={tags}/>
            )}
            {/* {tagDropdown && (
              <div>
                    {tags.map(tag => (
                      <div
                        onClick={() => {
                          addTag(tag)
                          // setTagSearch('')
                          // setTagChoice('')
                          setTagDropdown(false)
                        }}
                        key={tag.id}>
                          {tag.tag}
                      </div>
                    ))}
              </div>
            )} */}
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
