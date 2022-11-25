import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Editor, convertFromRaw, EditorState } from 'draft-js'

import * as questionActions from '../../store/question'

import UserControls from "../UserControls";
import UserInfoCard from "../UserInfoCard";

import getSpecificTimeAgo from "../../utils/getSpecificTimeAgo.js";
import convertToEditorState from "../../utils/convertToEditorState";

const SingleQuestion = () => {
  const dispatch = useDispatch()
  const {questionId} = useParams();
  const [loaded, setLoaded] = useState(false)
  const currentUser = useSelector(state => state.session.user)
  const currentQuestion = useSelector(state => state.questions.singleQuestion)

  useEffect(() => {
    dispatch(questionActions.fetchSingleQuestion(questionId))
    .then(() => setLoaded(true))
  },[dispatch])

  console.log(currentUser)

  if (!currentQuestion || !loaded) {
    return null;
  }

  let bodyContent
  let stateToDisplay
  // console.log(JSON.parse(currentQuestion.body))
  if (currentQuestion.body) bodyContent = convertFromRaw(JSON.parse(currentQuestion.body))
  if (bodyContent) stateToDisplay = EditorState.createWithContent(bodyContent)
  console.log(bodyContent)

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
    </div>
    <div id="question-content-container"></div>
      <div className="vote-container"></div>
      <div id="single-question-content-right">
        <div id="single-question-body">
          {/* <p>{currentQuestion.body}</p> */}
          <Editor
            editorState={stateToDisplay}
            readOnly
          />
        </div>
        <div id="single-question-user-controls-container">
          {currentUser && currentQuestion.User && (currentUser.id === currentQuestion.User.id) && (
            <UserControls question={currentQuestion}/>
          )}
        </div>
        <div id="user-information-holder">
            <UserInfoCard user={currentUser} response={currentQuestion} responseType={'question'}/>
        </div>
      </div>
    <div id="answers-container"></div>
    </div>
  )
}

export default SingleQuestion;
