const QuestionCard = ({question}) => {
  return (
    <div>
      <div className="metadata-container">
        <div className="numAnswers"><p>{question.numAnswers} answers</p></div>
      </div>
      <div className="maindata-container">
        <div className="info-container">
          <h3>{question.title}</h3>
          <p>{question.body}</p>
        </div>
        <div className="summary-container">
          <div className="user-data">
            <div>{question.User.username}</div>
            <div>{question.updatedAt}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard;
