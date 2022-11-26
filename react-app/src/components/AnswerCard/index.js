
import AnswerUserControls from "../AnswerUserControls";
import UserInfoCard from "../UserInfoCard";

const AnswerCard = ({answer, currentUser}) => {

  console.log('answer in AnswerCard: ', answer)
  console.log('currentUser in AnswerCard: ', currentUser)

  return (
    <div>
      <div>
      <p>{answer.answer}</p>
      </div>
      <div>
        {answer.User.id === currentUser.id && (
          <AnswerUserControls answer={answer}/>
        )}
      </div>
      <div>
        <UserInfoCard user={currentUser} responseType={"answer"} response={answer}/>
      </div>
    </div>
  )
}

export default AnswerCard;
