import { Link } from "react-router-dom";
import { convertFromRaw } from 'draft-js'
import getTimeAgoFromDate from "../../utils/getTimeAgoFromDate";
import UserControls from "../UserControls";


import './QuestionCard.css'

const QuestionCard = ({question, currentUser}) => {

  const timeString = getTimeAgoFromDate(question.createdAt, question.updatedAt)

  let bodyContent
  let plainBody
  if (question.body) bodyContent = convertFromRaw(JSON.parse(question.body))
  if (bodyContent) plainBody = bodyContent.getPlainText()


  return (
    <div className="questioncard-container">
      <div className="metadata-container">
        <div className="num-answers"><p>{question.numAnswers} answers</p></div>
      </div>
      <div className="maindata-container">
        <div className="info-container">
          <Link to={`questions/${question.id}`}>
            <h3>{question.title}</h3>
          </Link>
          <div className="body-container">
          <p>{plainBody}</p>
          </div>
        </div>
        <div className="summary-container">
          <div className="user-controls-container">
            {currentUser && question.User.id === currentUser.id && (
              <UserControls question={question}/>
            )}
          </div>
          <div className="user-data">
            <div className="questioncard-author-name">{question.User.username}</div>
            <div className="questioncard-asked-time">
              <Link to={`questions/${question.id}`}>
                {timeString}
              </Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard;
