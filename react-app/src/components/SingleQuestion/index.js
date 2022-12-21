import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Editor, convertFromRaw, EditorState } from 'draft-js'

import * as questionActions from '../../store/question'

import UserControls from "../UserControls";
import UserInfoCard from "../UserInfoCard";
import QuestionAnswers from "../QuestionAnswers";
import TagNameCard from "../TagNameCard";

import getSpecificTimeAgo from "../../utils/getSpecificTimeAgo.js";

import './SingleQuestion.css'

const SingleQuestion = () => {
  const dispatch = useDispatch()
  const {questionId} = useParams();
  const [loaded, setLoaded] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const currentUser = useSelector(state => state.session.user)
  const currentQuestion = useSelector(state => state.questions.singleQuestion)

  useEffect(() => {
    dispatch(questionActions.fetchSingleQuestion(questionId))
      .then(() => setLoaded(true))
      .catch(() => {
        setLoaded(false)
        setNotFound(true)
      });
  },[dispatch, questionId])

  // console.log(notFound)
  // console.log(loaded)

  const upVote = () => {
    dispatch(questionActions.addVoteToQuestion(questionId, true))
    .then(dispatch(questionActions.fetchSingleQuestion(questionId)))
  }

  const downVote = () => {

  }





  if ((!loaded) && (notFound)) {
    return (
      <h1>404 Not Found</h1>
      )
    }
  if (!loaded) {
    return null
}
  let bodyContent
  let stateToDisplay
  // console.log(JSON.parse(currentQuestion.body))
  if (currentQuestion.body) bodyContent = convertFromRaw(JSON.parse(currentQuestion.body))
  if (bodyContent) stateToDisplay = EditorState.createWithContent(bodyContent)

  // console.log(currentQuestion.body);


  if (currentQuestion) {
    // console.log('currentQuestion in singleQuestion component: ', currentQuestion)

  return (
    <div id="single-question-top-container">
      <div id="single-question-header">
        <div id="single-question-header-top">
          <div id="single-question-title">
            {/* <Link to={`/questions/${currentQuestion.id}`}> */}
              <h2>{currentQuestion.title}</h2>
              {/* </Link> */}
          </div>
          <div id="single-question-ask-button">
            <Link to={currentUser ? "/questions/new" : "/login"}><button>Ask Question</button></Link>
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
            <button onClick={upVote} id="upvote"><i class="fa-solid fa-caret-up"></i></button>
            <h2 id="single-question-score">{currentQuestion.totalScore}</h2>
            <button onClick={downVote} id="downvote"><i class="fa-solid fa-caret-down"></i></button>
          </div>
          <div id="single-question-content-right">
            <div id="single-question-body">
                {/* <p>{currentQuestion.body}</p> */}
                <Editor
                  editorState={stateToDisplay}
                  readOnly
                />
            </div>
            <div className="tag-container single-question-tags">
            {currentQuestion.Tags.map(tag => (
              <TagNameCard key={tag.id} tag={tag}/>
            ))}
          </div>
            <div id="single-question-bottom-container">
              <div id="single-question-user-controls-container">
                {currentUser && currentQuestion.User && (currentUser.id === currentQuestion.User.id) && (
                  <UserControls question={currentQuestion}/>
                )}
              </div>
              <div id="user-information-holder">
                  <UserInfoCard user={currentQuestion.User} response={currentQuestion} responseType={'question'}/>
              </div>
            </div>
          </div>
        </div>
        <div id="answers-container">
          <QuestionAnswers question={currentQuestion} currentUser={currentUser}/>
        </div>
      </div>
    </div>
  )
          } else {
            return (
              <h1>Hey can't find this question! Are you sure you have the right URL?</h1>
            )
          }
}

export default SingleQuestion;
