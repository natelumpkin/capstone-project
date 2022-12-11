import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

import * as questionActions from '../../store/question'
import QuestionCard from "../QuestionCard"
import './TagQuestionsPage.css'

const TagQuestionsPage = () => {

  const { tagId } = useParams();

  console.log('tagId in tagQuestions page: ', tagId)

  const dispatch = useDispatch()
  const allQuestions = useSelector(state => state.questions.allQuestions)
  const numQuestions = useSelector(state => state.questions.numQuestions)
  const currentUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(questionActions.fetchAllQuestions(tagId));
  }, [dispatch, tagId])


  const questionsArray = [];
  for (let questionId in allQuestions) {
    let question = allQuestions[questionId]
    questionsArray.unshift(question)
  }

  const tag = questionsArray[0].Tags.find(tag => Number(tagId) === tag.id)
  console.log('tag in tag-questions: ', tag)

  // const numQuestions = questionsArray.length;

  return (
    <div id="content-column-two">
    <div id="all-questions-container">
      <div id="all-questions-header">
        <div id="all-questions-header-upper">
          <div>
            {tag && (
            <h1>Questions tagged [{tag.tag}]</h1>)}
          </div>
          <div>
              <Link to={currentUser ? "questions/new" : "/login"}>
                <button className="ask-question-button pointer">Ask Question</button>
              </Link>
          </div>
        </div>
        <div>
          {tag && (
          <p className="tag-description">{tag.description}</p>)}
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
    </div>
  )
}

export default TagQuestionsPage;
