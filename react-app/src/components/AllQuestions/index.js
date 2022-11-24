import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import QuestionCard from "../QuestionCard";
import * as questionActions from '../../store/question'

const AllQuestions = () => {

  const dispatch = useDispatch()
  const allQuestions = useSelector(state => state.questions.allQuestions)

  useEffect(() => {
    dispatch(questionActions.fetchAllQuestions());
  }, [dispatch])


  const questionsArray = [];
  for (let questionId in allQuestions) {
    let question = allQuestions[questionId]
    questionsArray.push(question)
  }


  return (
    <div id="all-questions-container">
      <div id="all-questions-header">
        <div id="all-questions-header-upper">
          <div>
            <h1>All Questions</h1>
          </div>
          <div>
            <Link to="/questions/ask">
              <button>Ask Question</button>
            </Link>
          </div>
        </div>
        <div id="all-questions-header-lower"></div>
      </div>
      {questionsArray.map(question => (
        <QuestionCard question={question}/>
      ))}
    </div>
  )
}

export default AllQuestions;
