import { Link } from "react-router-dom";
import getTimeAgoFromDate from "../../utils/getTimeAgoFromDate";
import UserControls from "../UserControls";

const QuestionCard = ({question, currentUser}) => {

  const timeString = getTimeAgoFromDate(question.createdAt, question.updatedAt)

  return (
    <div>
      <div className="metadata-container">
        <div className="numAnswers"><p>{question.numAnswers} answers</p></div>
      </div>
      <div className="maindata-container">
        <div className="info-container">
          <Link to={`questions/${question.id}`}>
            <h3>{question.title}</h3>
          </Link>
          <p>{question.body}</p>
        </div>
        <div className="summary-container">
          <div className="user-controls-container">
            {question.User.id === currentUser.id && (
              <UserControls/>
            )}
          </div>
          <div className="user-data">
            <div>{question.User.username}</div>
            <div>
              <Link to={`questions/${question.id}`}>
                asked {timeString}
              </Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard;
