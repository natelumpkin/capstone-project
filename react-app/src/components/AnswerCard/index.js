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

  return (
    <div className='answer-card-container'>
      <div className="vote-container answer-vote">
            <button
            disabled={disableUpVote}
            onClick={upVote}
            id="upvote"><
              i class="fa-solid fa-caret-up"></i>
            </button>
            <h2 id="single-question-score">{answer.totalScore}</h2>
            <button
            disabled={disableDownVote}
            onClick={downVote}
            id="downvote">
              <i class="fa-solid fa-caret-down">
            </i></button>
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
