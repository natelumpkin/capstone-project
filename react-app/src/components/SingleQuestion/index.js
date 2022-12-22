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
  const [disableUpVote, setDisableUpVote] = useState(false)
  const [disableDownVote, setDisableDownVote] = useState(false)
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

  useEffect(() => {

    // Track disabling of vote buttons based on:
    // If the current user does not own this question
    // If the user has not voted on this question

    if (!currentUser || currentQuestion.userId === currentUser?.id) {
      setDisableDownVote(true)
      setDisableUpVote(true)
    } else {
      let userVote;
      if (currentQuestion.Votes) {
        userVote = Object.values(currentQuestion?.Votes).find(vote => vote.user_id === currentUser.id)
        // console.log('uservotes in userVote: ', userVote)
      }
      // console.log('disable vote useeffect running')
      if (userVote) {
        if (userVote.vote) {
          // console.log('disabling upvote')
          setDisableUpVote(true)
          setDisableDownVote(false)
        } else {
          // console.log('disabling downvote')
          setDisableUpVote(false)
          setDisableDownVote(true)
        }
      } else {
        setDisableDownVote(false)
        setDisableUpVote(false)
      }
    }


  },[disableUpVote, disableDownVote, currentQuestion, currentUser])

  const upVote = () => {
    // if user hasn't voted on this question yet, add vote
    let votedList = Object.values(currentQuestion.Votes).map(vote => vote.user_id)
    if (!votedList.includes(currentUser.id)) {
      // console.log('adding upvote')
      dispatch(questionActions.addVoteToQuestion(questionId, true))
    } else {
      // delete their vote
      // console.log('deleting downvote')
      let userVote = Object.values(currentQuestion.Votes).find(vote => vote.user_id === currentUser.id)
      dispatch(questionActions.deleteVoteFromQuestion(userVote.id, true))
    }
    // if user has voted, update vote with true
  }

  const downVote = () => {
    // if user hasn't voted on this question yet, add vote
    let votedList = Object.values(currentQuestion.Votes).map(vote => vote.user_id)
    if (!votedList.includes(currentUser.id)) {
      // console.log('adding downvote')
      dispatch(questionActions.addVoteToQuestion(questionId, false))
    } else {
      // delete their vote
      // console.log('deleting upvote')
      let userVote = Object.values(currentQuestion.Votes).find(vote => vote.user_id === currentUser.id)
      dispatch(questionActions.deleteVoteFromQuestion(userVote.id, false))
    }
    // if user has voted, updated vote with true
  }

  const showTopPopup = () => {

    // when we mouse over, we want the popup to show in half a second
    // but only if the mouse is over it
    let upvotePopup = document.getElementById('question-upvote-popup')
    upvotePopup.classList.remove('mouseAway')
    setTimeout(() => {
      if (!upvotePopup.classList.contains('mouseAway')) {
        upvotePopup.classList.remove('hidden')
      }
    }, 500)
    // [visible, hidden]
    // [hidden]
    // [visible]
  }

  const hideTopPopup = () => {
    // when we mouse away, we want the popup to never show
    // console.log('hiding popup!')
    let upvotePopup = document.getElementById('question-upvote-popup')
    upvotePopup.classList.add('mouseAway')
    upvotePopup.classList.add('hidden')
  }

  const showBottomPopup = () => {
    let upvotePopup = document.getElementById('question-downvote-popup')
    upvotePopup.classList.remove('mouseAway')
    setTimeout(() => {
      if (!upvotePopup.classList.contains('mouseAway')) {
        upvotePopup.classList.remove('hidden')
      }
    }, 500)
  }

  const hideBottomPopup = () => {
    let upvotePopup = document.getElementById('question-downvote-popup')
    upvotePopup.classList.add('mouseAway')
    upvotePopup.classList.add('hidden')
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
            <div onMouseEnter={showTopPopup} onMouseLeave={hideTopPopup} id="question-upvote-hover">
              <div className="popup-parent">
                <div id="question-upvote-popup" className="question-vote hidden">
                  <p>This question shows research effort; it is useful and clear.</p>
                </div>
              </div>
            <button disabled={disableUpVote} onClick={upVote} id="upvote"><i class="fa-solid fa-caret-up"></i></button>
            </div>
            <h2 id="single-question-score">{currentQuestion.totalScore}</h2>
            <div onMouseEnter={showBottomPopup} onMouseLeave={hideBottomPopup} id="question-downvote-hover">
              <div className="popup-parent">
                <div id="question-downvote-popup" className="question-vote hidden">
                  <p>This question does not show any research effort; it is unclear or not useful</p>
                </div>
              </div>
            <button disabled={disableDownVote} onClick={downVote} id="downvote"><i class="fa-solid fa-caret-down"></i></button>
            </div>
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
