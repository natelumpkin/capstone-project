import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import QuestionCard from "../QuestionCard";
import * as questionActions from '../../store/question'
import './AllQuestions.css'

const AllQuestions = () => {

  const dispatch = useDispatch()
  const allQuestions = useSelector(state => state.questions.allQuestions)
  const currentUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(questionActions.fetchAllQuestions());
  }, [dispatch])


  const questionsArray = [];
  for (let questionId in allQuestions) {
    let question = allQuestions[questionId]
    questionsArray.unshift(question)
  }


  return (
    <div id="content-column">
    <div id="all-questions-container">
      <div id="all-questions-header">
        <div id="all-questions-header-upper">
          <div>
            <h1>All Questions</h1>
          </div>
          <div>
              <Link to={currentUser ? "questions/new" : "/login"}>
                <button className="ask-question-button pointer">Ask Question</button>
              </Link>
          </div>
        </div>
        <div id="all-questions-header-lower"></div>
      </div>
      {questionsArray.map(question => (
        <QuestionCard key={question.id} question={question} currentUser={currentUser}/>
      ))}
    </div>
    </div>
  )
}

export default AllQuestions;
