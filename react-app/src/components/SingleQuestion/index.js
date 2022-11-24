import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import * as questionActions from '../../store/question'
import UserControls from "../UserControls";

const SingleQuestion = () => {
  const dispatch = useDispatch()
  const {questionId} = useParams();
  const currentUser = useSelector(state => state.session.user)
  const currentQuestion = useSelector(state => state.questions.singleQuestion)

  useEffect(() => {
    dispatch(questionActions.fetchSingleQuestion(questionId))
  },[dispatch])

  console.log(currentQuestion)

  return (
    <div id="single-question-top-container">
    <div id="single-question-header">
      <div id="single-question-header-top">
        <div id="single-question-title">
          <Link to={`/questions/${currentQuestion.id}`}><h2>{currentQuestion.title}</h2></Link>
        </div>
        <div id="single-question-ask-button">
          <button>Ask Question</button>
        </div>
      </div>
      <div id="single-question-header-bottom">
        <div id="created-time">Asked {currentQuestion.createdAt}</div>
        <div id="modified-time">Modified {currentQuestion.updatedAt}</div>
      </div>
    </div>
    <div id="question-content-container"></div>
    <div id="answers-container"></div>
    </div>
  )
}

export default SingleQuestion;
