import { Link } from "react-router-dom";

const QuestionCard = ({question}) => {
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
          <div className="user-data">
            <div>{question.User.username}</div>
            <div>
              <Link to={`questions/${question.id}`}>
                {question.updatedAt}
              </Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard;
