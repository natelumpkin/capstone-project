import { useEffect, useState } from 'react';
import {Editor, convertFromRaw, EditorState} from 'draft-js'

import * as answerActions from '../../store/answer'

import AnswerUserControls from "../AnswerUserControls";
import UserInfoCard from "../UserInfoCard";

import './AnswerCard.css'
import { useDispatch } from 'react-redux';

const AnswerCard = ({answer, currentUser}) => {
  const dispatch = useDispatch()
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
      if (answer.Votes) {
        // userVote = Object.values(answer?.Votes)
      }
    }
  })

  return (
    <div className='answer-card-container'>
      <div className="vote-container answer-vote">
            <button
            disabled={disableUpVote}
            // onClick={upVote}
            id="upvote"><
              i class="fa-solid fa-caret-up"></i>
            </button>
            <h2 id="single-question-score">{answer.totalScore}</h2>
            <button
            disabled={disableDownVote}
            // onClick={downVote}
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
