import { Link } from "react-router-dom";
import { convertFromRaw } from 'draft-js'
import getTimeAgoFromDate from "../../utils/getTimeAgoFromDate";
import UserControls from "../UserControls";
import TagNameCard from "../TagNameCard";


import './QuestionCard.css'

const QuestionCard = ({question, currentUser}) => {

  const timeString = getTimeAgoFromDate(question.createdAt, question.updatedAt)

  let bodyContent
  let plainBody
  if (question.body) bodyContent = convertFromRaw(JSON.parse(question.body))
  if (bodyContent) plainBody = bodyContent.getPlainText()

  console.log(question.Tags)

  return (
    <div className="questioncard-container">
      <div className="metadata-container">
        <div className="num-answers"><p>{question.numAnswers} {question.numAnswers === 1 ? "answer" : "answers"}</p></div>
      </div>
      <div className="maindata-container">
        <div className="info-container">
          <Link to={`questions/${question.id}`}>
            {question.title}
          </Link>
          <div className="body-container">
          <p>{plainBody}</p>
          </div>
        </div>
        <div className="summary-container">
          <div className="tag-container">
            {question.Tags.map(tag => (
              <TagNameCard key={tag.id} tag={tag}/>
            ))}
          </div>
          <div className="second-line-summary-container">
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
    </div>
  )
}

export default QuestionCard;
