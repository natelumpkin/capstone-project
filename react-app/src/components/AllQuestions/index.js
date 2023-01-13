import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'

import QuestionCard from "../QuestionCard";
import PageChooser from "../PageChooser";

import * as questionActions from '../../store/question'

import './AllQuestions.css'

const AllQuestions = () => {

  const dispatch = useDispatch()
  const { search } = useLocation()

  const useQuery = () => {
    const { search } = useLocation()
    // console.log(search)
    return useMemo(() => new URLSearchParams(search), [search])
  }

  let query = useQuery()


  console.log("page: ", query.get("page"))

  const allQuestions = useSelector(state => state.questions.allQuestions)
  const numQuestions = useSelector(state => state.questions.numQuestions)
  const currentUser = useSelector(state => state.session.user)

  useEffect(() => {
    // console.log('hello from use effect')

    if (query.get("page")) {
      dispatch(questionActions.fetchFilteredQuestions({ page: query.get("page")}))
    } else {
      dispatch(questionActions.fetchAllQuestions());
    }

  }, [dispatch, search])


  const questionsArray = [];
  for (let questionId in allQuestions) {
    let question = allQuestions[questionId]
    questionsArray.unshift(question)
  }

  // const numQuestions = questionsArray.length;


  return (
    <div id="content-column-two">
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
          <div id="all-questions-header-lower">
            {numQuestions && (
            <h4>{numQuestions} {numQuestions !== 1 ? "questions" : "question"}</h4>
            )}
          </div>
        </div>
        {questionsArray.map(question => (
          <QuestionCard key={question.id} question={question} currentUser={currentUser}/>
        ))}
      </div>
      <PageChooser numQuestions={numQuestions}/>
    </div>
  )
}

export default AllQuestions;
