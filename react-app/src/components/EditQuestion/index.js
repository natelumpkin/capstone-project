import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import FormEditor from "../FormEditor";
import AddTagCard from "../AddTagCard";
import TagSelectDropdown from "../TagSelectDropdown";

import * as questionActions from '../../store/question'
import * as tagActions from '../../store/tag'


import './EditQuestion.css'

const EditQuestion = () => {

  const {questionId} = useParams();

  const dispatch = useDispatch();
  const history = useHistory()
  const question = useSelector(state => state.questions.singleQuestion)
  const user = useSelector(state => state.session.user)
  const tags = useSelector(state => state.tags)
  const [title, setTitle] = useState('loading' || question.title)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [titleErrors, setTitleErrors] = useState([])
  const [bodyErrors, setBodyErrors] = useState([])
  const [disableButton, setDisableButton] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const [tagSearch, setTagSearch] = useState('')
  const [tagChoice, setTagChoice] = useState('')
  const [tag1, setTag1] = useState()
  const [tag2, setTag2] = useState()
  const [tag3, setTag3] = useState()
  const [tag4, setTag4] = useState()
  const [tag5, setTag5] = useState()
  const [tagDropdown, setTagDropdown] = useState(false)
  const [disableAddTags, setDisableAddTags] = useState(true)
  const [disableTagInput, setDisableTagInput] = useState(false)

  useEffect(() => {
    const body = window.document.body;
    body.classList.add('light-grey')
    return () => {
      body.classList.remove('light-grey')
    }
  },[])

  useEffect(() => {
    if (tagSearch.length <= 0) setDisableAddTags(true)
    let currentTags = [tag1, tag2, tag3, tag4, tag5].filter(tag => tag?.tag !== undefined)
    // console.log('currentTags: ', currentTags)
    if (currentTags.length < 5) setDisableTagInput(false)
    if (tagSearch.length > 0 && currentTags.length < 5) setDisableAddTags(false)
    if (currentTags.length >= 5) {
      setDisableAddTags(true)
      setDisableTagInput(true)
    }
    // console.log(disableAddTags)
  },[tagSearch, tag1, tag2, tag3, tag4, tag5])

  // console.log(question.Tags)

  const updateTags = async () => {
    // 1. compare current tag state to tags already on the question
    // 2. if current tag doesn't exist in tags, add it
    // 3. if tag on question isn't in current tags, remove it
    // return question.id
    let questionId = question.id
    const tagArray = [tag1, tag2, tag3, tag4, tag5]
    // console.log('tagArray: ', tagArray)
    const tagIds = [tag1?.id, tag2?.id, tag3?.id, tag4?.id, tag5?.id]
    const questionTagIds = []
    question.Tags.forEach(tag => {
      questionTagIds.push(tag.id)
    })
    // console.log('questionTagIds: ', questionTagIds)
    // iterate over question's tags
    for (let i = 0; i < question.Tags.length; i++) {
      let tag = question.Tags[i]

      // if that tag isn't in tagIds, remove it
      if (!tagIds.includes(tag.id)) {
        console.log('removing tag')
        await dispatch(questionActions.removeTagFromQuestion(questionId, tag.id))
      }
    }
    // iterate over state tags
    for (let i = 0; i < tagArray.length; i++) {
      // if current state tag is not in questionTags, add it
      let tag = tagArray[i]
      if (tag?.id && !questionTagIds.includes(tag.id)) {
        // if (tag && tag.newTag) {
        //   console.log('creating new tag')
        //   let newTag = await dispatch(tagActions.createNewTag(tag))
        //   dispatch(questionActions.addTagToQuestion(questionId, newTag.id))
        // } else if (tag) {
        //   console.log('adding pre-existing tag')
          await dispatch(questionActions.addTagToQuestion(questionId, tag.id))
        // }
      } else if (tag && tag.newTag) {
        tag = await dispatch(tagActions.createNewTag(tag))
        dispatch(questionActions.addTagToQuestion(questionId, tag.id))
      }
      //
    }
    return questionId;
  }

  useEffect(() => {
    dispatch(questionActions.fetchSingleQuestion(questionId))
      .then(() => setLoaded(true))
    setTitle(question.title || 'loading')

    let bodyContent
    let stateToDisplay
    if (question.body) bodyContent = convertFromRaw(JSON.parse(question.body))
    if (bodyContent) stateToDisplay = EditorState.createWithContent(bodyContent)
    if (stateToDisplay) setEditorState(stateToDisplay)

    if (loaded && question.Tags?.length) {
      setTag1(question.Tags[0])
      setTag2(question.Tags[1])
      setTag3(question.Tags[2])
      setTag4(question.Tags[3])
      setTag5(question.Tags[4])
    }
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

  const handleTitleErrors = () => {
    let errors = [];
    if (title.length < 15) errors.push('Title must be at least 15 characters')
    if (title.length > 100) errors.push('Title cannot be more than 100 characters')
    setTitleErrors(errors)
  }

  const handleBodyErrors = async () => {
    let errors = [];
    let bodyLength = editorState.getCurrentContent().getPlainText().length;
    if (bodyLength < 30) errors.push('Body must be at least 30 characters')
    if (bodyLength > 10000) errors.push('Body cannot be more than 10,000 characters')
    setBodyErrors(errors)
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
      await dispatch(questionActions.editQuestion(question.id, newQuestion))
      await updateTags()
      history.push(`/questions/${question.id}`)
      setTitle('')
      setEditorState(EditorState.createEmpty())
    }
  }

  const searchTags = (searchWord) => {
    // console.log('tagSearch in search function: ', tagSearch)
    dispatch(tagActions.getTags(searchWord))
      .then(() => {
        if (searchWord) setTagDropdown(true)
        if (!searchWord) setTagDropdown(false)
      })
  }

  const addTag = async (newTag) => {
    // look at the existing tags set to this question
    const tagArray = [tag1, tag2, tag3, tag4, tag5]
    // check to see if the tag you want is in state already
    let tagToSave = tags.find(tag => tag.tag === tagChoice)
    if (!tagToSave && newTag.id) {
      // but if you're clicking on a div, we know the tag is in the database
      // and can just make that tagToSave
      tagToSave = newTag
    }
    else if (!tagToSave) {
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
          <div className="form-container">
          <label>Tags</label>
            <p>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</p>
            <div id="tag-input-holder">
              <input
              id="tag-input"
              type="text"
              maxLength={30}
              disabled={disableTagInput}
              value={tagSearch}
              onChange={(e) => {
                setTagSearch(e.target.value)
                searchTags(e.target.value)
              }}
              >
              </input>
              <button
                className="demo session-button"
                type="button"
                id="new-tag-button"
                disabled={disableAddTags}
                onClick={addTag}>Add Tag</button>
            </div>
            {tagDropdown && (
              <TagSelectDropdown selectedTags={[tag1, tag2, tag3, tag4, tag5]} setTagSearch={setTagSearch} setTagChoice={setTagChoice} addTag={addTag} setTagDropdown={setTagDropdown} tags={tags}/>
            )}
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
            <button id="post-question-button" className="ask-question-button" disabled={disableButton}>Post Your Revision</button>
            <button
              id="discard-draft-button"
              className="ask-question-button"
              onClick={() => {
                window.scrollTo(0,0)
                history.push('/questions')
              }}
              >
                Cancel
              </button>
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
