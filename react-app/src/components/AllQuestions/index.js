import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'

import QuestionCard from "../QuestionCard";
import PageChooser from "../PageChooser";
import FilterChooser from "../FilterChooser";

import * as questionActions from '../../store/question'

import './AllQuestions.css'

const AllQuestions = () => {

  const dispatch = useDispatch()
  const [currSearchParams, setCurrSearchParams] = useState({})
  const { search } = useLocation()

  const useQuery = () => {
    const { search } = useLocation()
    // console.log(search)
    return useMemo(() => new URLSearchParams(search), [search])
  }

  let query = useQuery()


  // console.log("page: ", query.get("page"))

  const allQuestions = useSelector(state => state.questions.allQuestions)
  const numQuestions = useSelector(state => state.questions.numQuestions)
  const currentUser = useSelector(state => state.session.user)

  useEffect(() => {
    // console.log('hello from use effect')
    let searchOptions = {}
    if (query.get("page")) {
      searchOptions.page = query.get("page")
    }
    if (query.get("tab")) {
      searchOptions.order = query.get("tab")
    }
    if (query.get("unanswered")) {
      searchOptions.unanswered = true
    }

    setCurrSearchParams(searchOptions)
    console.log('search options: ', searchOptions)
    // console.log('search state: ', currSearchParams)

    if (Object.keys(searchOptions).length) {
      dispatch(questionActions.fetchFilteredQuestions(searchOptions))
    } else {
      dispatch(questionActions.fetchAllQuestions());
    }

  }, [dispatch, search])

  console.log(query.get('tab'))


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
            <h4 id="num-questions">
              {numQuestions}
              {numQuestions !== 1 ? " questions" : " question"}
              {currSearchParams.order === 'recent' && ' with recent activity'}
              {currSearchParams.unanswered && ' with no upvoted answers'}
              {currSearchParams.order === 'score' && ' ordered by highest score'}</h4>
            )}
            <div className="filter-holder">
              <FilterChooser/>
            </div>
          </div>
        </div>
        {questionsArray.map(question => (
          <QuestionCard key={question.id} question={question} currentUser={currentUser}/>
        ))}
      </div>
      <PageChooser location={'questions'} numQuestions={numQuestions}/>
    </div>
  )
}

export default AllQuestions;
