import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as answerActions from '../../store/answer'

import AnswerCard from "../AnswerCard";
import CreateAnswer from "../CreateAnswer";
import './QuestionAnswers.css'

const QuestionAnswers = ({question, currentUser}) => {

  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const answers = useSelector(state => state.answers)

  useEffect(() => {
    dispatch(answerActions.getAnswersToQuestion(question.id))
      .then(setLoaded(true))
  },[dispatch])

  const answersArr = [];
  for (let answerId in answers) {
    answersArr.push(answers[answerId])
  }

  if (!loaded) {
    return null
  }

  // console.log('question in QuestionAnswers: ', question)


  return (
    <div id="answers-container">
      <div id="num-answers-container">
        <h4>{answersArr.length} {answersArr.length === 1 ? "Answer" : "Answers"}</h4>
      </div>
      <div id="answers-card-container">
        {answersArr.map(answer => (
          <AnswerCard answer={answer} currentUser={currentUser}/>
        ))}
      </div>
      {currentUser && (
      <div>
          <CreateAnswer questionId={question.id}/>
      </div>
      )}
    </div>
  )
}

export default QuestionAnswers;
