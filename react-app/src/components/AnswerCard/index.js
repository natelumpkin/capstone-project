import {Editor, convertFromRaw, EditorState} from 'draft-js'

import AnswerUserControls from "../AnswerUserControls";
import UserInfoCard from "../UserInfoCard";

import './AnswerCard.css'

const AnswerCard = ({answer, currentUser}) => {

  // console.log('answer in AnswerCard: ', answer)
  // console.log('currentUser in AnswerCard: ', currentUser)

  let answerContent
  let stateToDisplay
  if (answer.answer) answerContent = convertFromRaw(JSON.parse(answer.answer))
  if (answerContent) stateToDisplay = EditorState.createWithContent(answerContent)

  return (
    <div className='answer-card-container'>
      <div className="vote-container answer-vote">
            <button
            // disabled={disableUpVote}
            // onClick={upVote}
            id="upvote"><
              i class="fa-solid fa-caret-up"></i>
            </button>
            <h2 id="single-question-score">{answer.totalScore}</h2>
            <button
            // disabled={disableDownVote}
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
