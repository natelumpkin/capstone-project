import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

import * as questionActions from '../../store/question'
import QuestionCard from "../QuestionCard"
import PageChooser from "../PageChooser"
import './TagQuestionsPage.css'

const TagQuestionsPage = () => {

  const { tagId } = useParams();

  console.log('tagId in tagQuestions page: ', tagId)

  const dispatch = useDispatch()
  const allQuestions = useSelector(state => state.questions.allQuestions)
  const numQuestions = useSelector(state => state.questions.numQuestions)
  const currentUser = useSelector(state => state.session.user)
  const [tag, setTag] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect( async () => {
    await dispatch(questionActions.fetchAllQuestions(tagId))
    const response = await fetch(`/api/tags/${tagId}`)
    const data = await response.json()
    await setTag(data)
    setLoaded(true)

  }, [dispatch, tagId])



  const questionsArray = [];
  for (let questionId in allQuestions) {
    let question = allQuestions[questionId]
    questionsArray.unshift(question)
  }
  // let tag;
  // if (questionsArray.length) tag = questionsArray[0].Tags.find(tag => Number(tagId) === tag.id)


  // console.log('tag in tag-questions: ', tag)

  // const numQuestions = questionsArray.length;

  if (!loaded) {
    return null;
  }

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
              <Link to={currentUser ? "/questions/new" : "/login"}>
                <button className="ask-question-button pointer">Ask Question</button>
              </Link>
          </div>
        </div>
        <div>
          {tag && (
          <p className="tag-description">{tag.description}</p>)}
        </div>
        <div id="all-questions-header-lower">
          {numQuestions ? (
          <h4>{numQuestions} {numQuestions !== 1 ? "questions" : "question"}</h4>
          ) : (
            <h4>0 questions</h4>
          )}



        </div>
      </div>
      {questionsArray.map(question => (
        <QuestionCard key={question.id} question={question} currentUser={currentUser}/>
      ))}
    </div>
    <PageChooser location={'tags'} numQuestions={numQuestions}/>
    </div>
  )
}

export default TagQuestionsPage;
