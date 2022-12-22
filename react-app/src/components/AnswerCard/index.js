import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {Editor, convertFromRaw, EditorState} from 'draft-js'

import * as answerActions from '../../store/answer'

import AnswerUserControls from "../AnswerUserControls";
import UserInfoCard from "../UserInfoCard";

import './AnswerCard.css'
import { useDispatch } from 'react-redux';

const AnswerCard = ({answer, currentUser}) => {
  const dispatch = useDispatch()
  const answers = useSelector(state => state.answers)
  // answer = answers.find(stateAnswer => answer.id === stateAnswer.id)
  const [disableUpVote, setDisableUpVote] = useState(false)
  const [disableDownVote, setDisableDownVote] = useState(false)

  let answerContent
  let stateToDisplay
  if (answer.answer) answerContent = convertFromRaw(JSON.parse(answer.answer))
  if (answerContent) stateToDisplay = EditorState.createWithContent(answerContent)

  useEffect(() => {
    if (!currentUser || answer.userId === currentUser?.id) {
      setDisableDownVote(true)
      setDisableUpVote(true)
    } else {
      let userVote;
      console.log('answer votes in useeffect: ', answer.Votes)
      if (answer.Votes) {
        userVote = Object.values(answer?.Votes).find(vote => vote.user_id === currentUser.id)
      }
      if (userVote) {
        if (userVote.vote) {
          setDisableUpVote(true)
          setDisableDownVote(false)
        } else {
          setDisableUpVote(false)
          setDisableDownVote(true)
        }
      } else {
        setDisableDownVote(false)
        setDisableUpVote(false)
      }
    }
  }, [disableDownVote, disableUpVote, answer.totalScore, currentUser])

  // console.log(answer)

  const upVote = () => {
    let votedList = Object.values(answer.Votes).map(vote => vote.user_id)
    if (!votedList.includes(currentUser.id)) {
      dispatch(answerActions.addVoteToAnswer(answer.id, true))
    } else {
      let userVote = Object.values(answer.Votes).find(vote => vote.user_id === currentUser.id)
      dispatch(answerActions.deleteVoteFromAnswer(userVote))
    }
  }

  const downVote = () => {
    console.log('answer in downvote: ', answer)
    let votedList = Object.values(answer.Votes).map(vote => vote.user_id)
    console.log('voted list in downvote: ', votedList)
    if (!votedList.includes(currentUser.id)) {
      console.log('adding downvote to answer')
      dispatch(answerActions.addVoteToAnswer(answer.id, false))
    } else {
      let userVote = Object.values(answer.Votes).find(vote => vote.user_id === currentUser.id)
      console.log('removing downvote: ', userVote)
      dispatch(answerActions.deleteVoteFromAnswer(userVote))
    }
  }

  const showTopPopup = () => {

    // when we mouse over, we want the popup to show in half a second
    // but only if the mouse is over it
    let upvotePopup = document.getElementById(`answer-upvote-popup-${answer.id}`)
    upvotePopup.classList.remove('mouseAway')
    setTimeout(() => {
      if (!upvotePopup.classList.contains('mouseAway')) {
        upvotePopup.classList.remove('hidden')
      }
    }, 300)
  }

  const hideTopPopup = () => {
    // when we mouse away, we want the popup to never show
    let upvotePopup = document.getElementById(`answer-upvote-popup-${answer.id}`)
    upvotePopup.classList.add('mouseAway')
    upvotePopup.classList.add('hidden')
  }

  const showBottomPopup = () => {
    let upvotePopup = document.getElementById(`answer-downvote-popup-${answer.id}`)
    upvotePopup.classList.remove('mouseAway')
    setTimeout(() => {
      if (!upvotePopup.classList.contains('mouseAway')) {
        upvotePopup.classList.remove('hidden')
      }
    }, 300)
  }

  const hideBottomPopup = () => {
    let upvotePopup = document.getElementById(`answer-downvote-popup-${answer.id}`)
    upvotePopup.classList.add('mouseAway')
    upvotePopup.classList.add('hidden')
  }

  return (
    <div className='answer-card-container'>
      <div className="vote-container answer-vote">
        <div onMouseEnter={showTopPopup} onMouseLeave={hideTopPopup} className="answer-vote-hover" id={`answer-upvote-hover-${answer.id}`}>
          <div className='popup-parent'>
            <div id={`answer-upvote-popup-${answer.id}`} className="question-vote hidden">
              <p>This answer is useful.</p>
            </div>
          </div>
          <button
          disabled={disableUpVote}
          onClick={upVote}
          id="upvote"><
            i class="fa-solid fa-caret-up"></i>
          </button>
        </div>
            <h2 id="single-question-score">{answer.totalScore}</h2>
        <div onMouseEnter={showBottomPopup} onMouseLeave={hideBottomPopup} className="answer-vote-hover" id={`answer-downvote-hover-${answer.id}`}>
          <div className='popup-parent'>
            <div id={`answer-downvote-popup-${answer.id}`} className="question-vote hidden">
              <p>This answer is not useful.</p>
          </div>
          </div>
          <button
          disabled={disableDownVote}
          onClick={downVote}
          id="downvote">
            <i class="fa-solid fa-caret-down">
          </i></button>
        </div>
      </div>
    <div className="answer-card-holder">
      <div className='answer-content-container'>

        <Editor
          editorState={stateToDisplay}
          readOnly
        />

        <div className='answercard-bottom-container'>
          <div>
            {currentUser && answer.User.id === currentUser.id && (
              <AnswerUserControls answer={answer}/>
              )}
          </div>
          <div className="answercard-userinfo-holder">
            <UserInfoCard user={answer.User} responseType={"answer"} response={answer}/>
          </div>
        </div>
      </div>
      <div className='answer-bottom-border-div'></div>
    </div>
    </div>
  )
}

export default AnswerCard;
